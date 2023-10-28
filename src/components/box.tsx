import * as React from 'react'

const Box: React.FC<BoxProps> = ({ className = '', children }) => {
    return (
        <div className={'bg-gray-100 shadow ' + className}>{children}</div>
    )
}

export interface BoxProps {
    className?: string
    children: React.ReactNode
}

export default Box
