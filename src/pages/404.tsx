import * as React from 'react'
import { Link, HeadFC, PageProps } from 'gatsby'

const NotFoundPage: React.FC<PageProps> = () => {
    return (
        <div className='h-screen w-full flex flex-col justify-center'>
            <div className='text-center'>
                <h1 className='mb-4 text-9xl font-bold font-mono text-center text-gray-600'>404</h1>
                <Link className='text-gray-700 hover:text-blue-500' to='/'>返回主页</Link>
            </div>
        </div>
    )
}

export default NotFoundPage

export const Head: HeadFC = () => <title>Not found</title>
