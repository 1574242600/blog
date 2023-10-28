import * as React from 'react'
import { useSwipe } from '@hooks/use-swipe'

const Sidebar: React.FC<SidebarProps> = ({ children, defaultOpenOnMobile = false }) => {
    const { useState, useEffect } = React
    const [xOffset, setXOffset] = useState(defaultOpenOnMobile ? 0 : -256)
    const [isOpen, setIsOpen] = useState(defaultOpenOnMobile)

    useSwipe(
        {
            onSwipe: event => {
                const { firstDirection } = event
                if (firstDirection === 4 || firstDirection === 6) {
                    if (firstDirection === 4 && xOffset === -256) return
                    if (firstDirection === 6 && xOffset === 0) return

                    let offset = event.offset.cX - (firstDirection === 6 ? 256 : 0)
                    if (offset > 0) offset = 0
                    if (offset < -256) offset = -256

                    setXOffset(offset)
                }
            },
            onSwipeEnd: () => {
                if (isOpen) {
                    xOffset < -10 ? setXOffset(-256) : setXOffset(0)
                } else {
                    xOffset < -246 ? setXOffset(-256) : setXOffset(0)
                }
            }
        },
        {
            timeDiff: 10,
            throttleDelay: 20
        }
    )

    useEffect(() => {
        if (xOffset === 0 || xOffset === -256) setIsOpen(xOffset === 0)
    }, [xOffset])

    const lgClass = ' lg:absolute lg:!left-auto'
    const lgMClass = ' lg-m:fixed lg-m:z-10'
    const transition = (xOffset === 0 || xOffset === -256) ? 'all 0.5s' : ''

    return (
        <div>
            <div
                className={
                    'h-full w-64' + lgClass + lgMClass + ' bg-gray-100 shadow'
                }
                style={{
                    left: xOffset,
                    transition
                }}
            >
                {children}
            </div>

            <div
                className='lg:hidden fixed h-full w-full bg-black'
                style={{
                    zIndex: xOffset !== -256 ? 1 : -1,
                    opacity: (Math.abs(xOffset + 256) / 512).toFixed(2),
                    transition
                }}
                onClick={() => setXOffset(-256)}
            ></div>
        </div>
    )
}

export interface SidebarProps {
    children: React.ReactNode
    defaultOpenOnMobile?: boolean
}

export default Sidebar
