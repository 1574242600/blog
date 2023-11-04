import * as React from 'react'
import Link from './link'

const FriendCard: React.FC<FriendCardProps> = ({ className = '', data }) => {
    const { name, url, avatar, description } = data

    return (
        <div className={'p-4 text-center hover:bg-gray-200 ' + className}>
            <Link href={url}>
                <img className='m-auto' src={avatar} alt='avatar' width={100} height={100} />
                <div className='mt-4 text-sm font-medium text-gray-800 truncate' title={name}>{name}</div>
                <div className='text-xs font-medium text-gray-500 truncate' title={description}>{description}</div>
            </Link>
        </div>
    )
}

export interface FriendCardProps {
    data: {
        name: string
        url: string
        avatar: string
        description: string
    }
    className?: string
}

export default FriendCard
