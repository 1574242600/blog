import * as React from 'react'

const Link: React.FC<LinkProps> = ({ href, children }) => {
    return (
        <a
            className='hover:text-blue-500'
            href={href}
            target='_blank'
            rel='noreferrer'
        >
            {children}
        </a>
    )
}

export interface LinkProps {
    href: string
    children: React.ReactNode
}

export default Link
