import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { throttle } from 'throttle-debounce'

export const useSwipe = (
    handlers: SwipeEventHandlers,
    settings: SwipeSettings = { timeDiff: 100, throttleDelay: 50 }
): void => {
    const { onSwipeStart, onSwipeEnd, onSwipe } = handlers

    const [swipeState, _] = useState<SwipeState>({
        isSwipeEnd: false,
        isSwipeStart: false,
        firstDirection: null,
        XYT: {
            pX: 0,
            pY: 0,
            cX: 0,
            cY: 0,
            time: 0
        },
        startXYT: {
            pX: 0,
            pY: 0,
            cX: 0,
            cY: 0,
            time: 0
        },
        lastXYT: null
    })

    const setSwipeState = (lastSwipeState: Partial<SwipeState>): void => {
        _((swipeState) => {
            // console.log('<---------------------------------')
            // console.log(lastSwipeState)
            // console.log(swipeState)
            // console.log('--------------------------------->')
            return Object.assign({}, swipeState, lastSwipeState)
        })
    }

    useEffect(() => {
        const hanleTouchStartBinded = hanleTouchStart.bind(
            null,
            setSwipeState
        )
        const hanleTouchEndBinded = hanleTouchEnd.bind(null, _)
        const hanleTouchMoveBinded = throttle(
            settings.throttleDelay,
            hanleTouchMove.bind(null, setSwipeState)
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
        const { XYT, startXYT, lastXYT, isSwipeStart, firstDirection } = swipeState
        const timeDiff = XYT.time - startXYT.time
        const swipeEvnet = toSwipeEvent(XYT, startXYT, firstDirection)

        if (timeDiff > settings.timeDiff || lastXYT != null) {
            if (!isSwipeStart) {
                if (Math.abs(swipeEvnet.offset.cX) > 20 || Math.abs(swipeEvnet.offset.cY) > 20) setSwipeState({ isSwipeStart: true })
                return
            }

            /*
            if (lastXYT != null) { // 中途滑动方向改变判断
                const lastSwipeEvnet = toSwipeEvent(lastXYT, startXYT)
                if (lastSwipeEvnet.direction === 4) swipeEvnet.offset.cX - lastSwipeEvnet.offset.cX > 0 && setStartXYT(XYT)
                if (lastSwipeEvnet.direction === 6) swipeEvnet.offset.cX - lastSwipeEvnet.offset.cX < 0 && setStartXYT(XYT)
                if (lastSwipeEvnet.direction === 8) swipeEvnet.offset.cY - lastSwipeEvnet.offset.cY < 0 && setStartXYT(XYT)
                if (lastSwipeEvnet.direction === 2) swipeEvnet.offset.cY - lastSwipeEvnet.offset.cY > 0 && setStartXYT(XYT)
            } */

            onSwipe?.(toSwipeEvent(XYT, startXYT, firstDirection))
            setSwipeState({
                lastXYT: XYT
            })
        }
    }, [swipeState.XYT])

    useEffect(() => {
        if (!swipeState.isSwipeStart) return

        const { XYT, startXYT } = swipeState
        const event = toSwipeEvent(XYT, startXYT, null)

        setSwipeState({
            firstDirection: event.direction
        })

        onSwipeStart?.(event)
    }, [swipeState.isSwipeStart])

    useEffect(() => {
        if (!swipeState.isSwipeStart) return

        const { XYT, startXYT, firstDirection } = swipeState

        setTimeout(() => {
            setSwipeState({
                isSwipeStart: false,
                isSwipeEnd: false,
                lastXYT: null,
                firstDirection: null
            })

            onSwipeEnd?.(toSwipeEvent(XYT, startXYT, firstDirection))
        }, 100)
    }, [swipeState.isSwipeEnd])
}

function hanleTouchStart (
    setSwipeState: (lastSwipeState: Partial<SwipeState>) => void,
    event: TouchEvent
): void {
    const tmp = toXYT(event)
    setSwipeState({
        startXYT: tmp,
        XYT: tmp
    })
}

function hanleTouchEnd (
    setSwipeState: Dispatch<SetStateAction<SwipeState>>
): void {
    setSwipeState((swipeState) => {
        return {
            ...swipeState,
            isSwipeEnd: swipeState.isSwipeStart
        }
    })
}

function hanleTouchMove (
    setSwipeState: (lastSwipeState: Partial<SwipeState>) => void,
    event: TouchEvent
): void {
    setSwipeState({
        XYT: toXYT(event)
    })
}

function toXYT (event: TouchEvent): XYT {
    return {
        pX: event.touches[0].pageX,
        pY: event.touches[0].pageY,
        cX: event.touches[0].clientX,
        cY: event.touches[0].clientY,
        time: new Date().getTime()
    }
}

function toSwipeEvent (XYT: XYT, startXYT: XYT, firstDirection: SwipeDirection): SwipeEvnet {
    function getDirection (
        xOffest: number,
        yOffest: number
    ): SwipeEvnet['direction'] {
        const diff = Math.abs(xOffest) - Math.abs(yOffest)

        if (diff < 0) return yOffest > 0 ? 2 : 8
        if (diff > 0) return xOffest > 0 ? 6 : 4

        return null
    }

    const pXOffest = XYT.pX - startXYT.pX
    const pYOffest = XYT.pY - startXYT.pY
    const cXOffest = XYT.cX - startXYT.cX
    const cYOffest = XYT.cY - startXYT.cY

    return {
        firstDirection,
        direction: getDirection(pXOffest, pYOffest),
        offset: {
            pX: pXOffest,
            pY: pYOffest,
            cX: cXOffest,
            cY: cYOffest
        },
        XYT,
        startXYT
    }
}

interface SwipeState {
    isSwipeStart: boolean
    isSwipeEnd: boolean
    firstDirection: SwipeDirection
    XYT: XYT
    startXYT: XYT
    lastXYT: XYT | null
}

interface XYT {
    pX: number
    pY: number
    cX: number
    cY: number
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
    firstDirection: SwipeDirection
    direction: SwipeDirection
    offset: Omit<XYT, 'time'>
    XYT: XYT
    startXYT: XYT
}

export type SwipeDirection = 4 | 8 | 6 | 2 | null // number pad
