import * as React from 'react'

const Divider: React.FC<DividerProps> = ({ className = '' }) => {
    return (
        <div className={'h-px w-full bg-gray-200 ' + className}></div>
    )
}

export interface DividerProps {
    className?: string
}

export default Divider
