import { useEffect, useState } from 'react'
import { throttle } from 'throttle-debounce'

export const useSwipe = (
    handlers: SwipeEventHandlers,
    settings: SwipeSettings = { timeDiff: 100, throttleDelay: 50 }
): void => {
    const { onSwipeStart, onSwipeEnd, onSwipe } = handlers

    const [isSwipeStart, setIsSwipeStart] = useState(false)
    const [isSwipeEnd, setIsSwipeEnd] = useState(false)
    const [XYT, setXYT] = useState<XYT>({
        x: 0,
        y: 0,
        time: 0
    })
    const [startXYT, setStartXYT] = useState<XYT>({
        x: 0,
        y: 0,
        time: 0
    })
    const [lastXYT, setLastXYT] = useState<XYT | null>(null)

    useEffect(() => {
        const hanleTouchStartBinded = hanleTouchStart.bind(
            null,
            setStartXYT,
            setXYT
        )
        const hanleTouchEndBinded = hanleTouchEnd.bind(null, setIsSwipeEnd)
        const hanleTouchMoveBinded = throttle(
            settings.throttleDelay,
            hanleTouchMove.bind(null, setXYT)
        )

        addEventListener('touchstart', hanleTouchStartBinded)
        addEventListener('touchmove', hanleTouchMoveBinded)
        addEventListener('touchend', hanleTouchEndBinded)

        return () => {
            removeEventListener('touchstart', hanleTouchStartBinded)
            removeEventListener('touchend', hanleTouchEndBinded)
            removeEventListener('touchmove', hanleTouchMoveBinded)
        }
    }, [])

    useEffect(() => {
        const timeDiff = XYT.time - startXYT.time
        const swipeEvnet = toSwipeEvent(XYT, startXYT)

        if (timeDiff > settings.timeDiff) {
            if (!isSwipeStart) {
                if (Math.abs(swipeEvnet.offset.x) > 30 || Math.abs(swipeEvnet.offset.y) > 30) setIsSwipeStart(true)
                return
            }

            if (lastXYT != null) { // 中途滑动方向改变判断
                const lastSwipeEvnet = toSwipeEvent(lastXYT, startXYT)
                if (lastSwipeEvnet.direction === 4) swipeEvnet.offset.x - lastSwipeEvnet.offset.x > 0 && setStartXYT(XYT)
                if (lastSwipeEvnet.direction === 6) swipeEvnet.offset.x - lastSwipeEvnet.offset.x < 0 && setStartXYT(XYT)
                if (lastSwipeEvnet.direction === 8) swipeEvnet.offset.y - lastSwipeEvnet.offset.y < 0 && setStartXYT(XYT)
                if (lastSwipeEvnet.direction === 2) swipeEvnet.offset.y - lastSwipeEvnet.offset.y > 0 && setStartXYT(XYT)
            }

            onSwipe?.(toSwipeEvent(XYT, startXYT))
            setLastXYT(XYT)
        }
    }, [XYT])

    useEffect(() => {
        onSwipeStart?.(toSwipeEvent(XYT, startXYT))
    }, [isSwipeStart])

    useEffect(() => {
        if (!isSwipeStart) return

        onSwipeEnd?.(toSwipeEvent(XYT, startXYT))
        setIsSwipeEnd(false)
        setIsSwipeStart(false)
        setLastXYT(null)
    }, [isSwipeEnd])
}

function hanleTouchStart (
    setStartXYT: React.Dispatch<React.SetStateAction<XYT>>,
    setXYT: React.Dispatch<React.SetStateAction<XYT>>,
    event: TouchEvent
): void {
    const tmp = toXYT(event)
    setStartXYT(tmp)
    setXYT(tmp)
}

function hanleTouchEnd (
    setIsSwipeEnd: React.Dispatch<React.SetStateAction<boolean>>
): void {
    setIsSwipeEnd(true)
}

function hanleTouchMove (
    setXYT: React.Dispatch<React.SetStateAction<XYT>>,
    event: TouchEvent
): void {
    setXYT(toXYT(event))
}

function toXYT (event: TouchEvent): XYT {
    return {
        x: event.touches[0].pageX,
        y: event.touches[0].pageY,
        time: new Date().getTime()
    }
}

function toSwipeEvent (XYT: XYT, startXYT: XYT): SwipeEvnet {
    function getDirection (
        xOffest: number,
        yOffest: number
    ): SwipeEvnet['direction'] {
        const diff = Math.abs(xOffest) - Math.abs(yOffest)

        if (diff < 0) return yOffest > 0 ? 2 : 8
        if (diff > 0) return xOffest > 0 ? 6 : 4

        return null
    }

    const xOffest = XYT.x - startXYT.x
    const yOffest = XYT.y - startXYT.y

    return {
        direction: getDirection(xOffest, yOffest),
        offset: {
            x: xOffest,
            y: yOffest
        },
        XYT,
        startXYT
    }
}

interface XYT {
    x: number
    y: number
    time: number
}

export interface SwipeEventHandlers {
    onSwipeStart?: (event: SwipeEvnet) => void
    onSwipeEnd?: (event: SwipeEvnet) => void
    onSwipe?: (event: SwipeEvnet) => void
}

export interface SwipeSettings {
    timeDiff: number
    throttleDelay: number
}

export interface SwipeEvnet {
    direction: 4 | 8 | 6 | 2 | null // number pad
    offset: {
        x: number
        y: number
    }
    XYT: XYT
    startXYT: XYT
}
