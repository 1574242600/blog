import * as React from 'react'
import { useState } from 'react'

const Menu: React.FC<MenuProps> = ({
    children,
    defaultActiveKey,
    onItemActiveChange
}) => {
    const [activeKey, setActiveKey] = useState(defaultActiveKey)

    const items = React.Children.map(children, child => {
        return React.cloneElement(child, {
            active: child.key === activeKey,
            onClick: () => {
                setActiveKey(child.key)
                onItemActiveChange?.(child.key)
            }
        })
    })

    return <ul className='list-none list-inside w-full'>{items}</ul>
}

const Item: React.FC<ItemProps> = (props) => {
    const { children, onClick, active = false } = props

    const activeClass = ' border-r-4 border-green-500 bg-green-100'
    const textClass = ' font-mono font-medium text-md text-center text-gray-600 hover:text-green-500'

    return (
        <li
            onClick={onClick}
            className={
                'h-10 leading-10 pl-2 cursor-pointer hover:bg-gray-50' +
                textClass +
                (active ? activeClass : '')
            }
        >
            {children}
        </li>
    )
}

export interface ItemProps {
    children: React.ReactNode
    onClick?: () => void
    active?: boolean
}

export interface MenuProps {
    children: any // todo
    defaultActiveKey: string
    onItemActiveChange?: (key: string) => void
}

export {
    Menu,
    Item
}
