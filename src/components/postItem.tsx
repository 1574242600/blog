import * as React from 'react'
import PostHeader from './postHeader'
import { Link } from 'gatsby'
import Divider from './divider'

const PostItem: React.FC<PostItemProps> = ({ data }) => {
    const { fields, excerpt } = data
    const widthClass = ' xl:w-3xl lg:w-2xl md:w-xl w-xl'

    return (
        <div className='w-full mt-8 flex flex-row justify-center'>
            <div className={'p-6 bg-gray-100 shadow ' + widthClass}>
                <PostHeader data={data} />
                <Divider />
                <div className='heti h-40 pl-8 pt-4 overflow-auto no-scrollbar' dangerouslySetInnerHTML={{ __html: excerpt }} />
                <Link
                    className='block text-center mt-4'
                    to={fields.slug}
                >
                    <div className='inline-block w-18 h-8 p-2 text-sm font-bold font-mono shadow text-gray-100 bg-sky-400'>阅读更多</div>
                </Link>
            </div>
        </div>
    )
}

export interface PostItemProps {
    data: {
        timeToRead: number
        excerpt: string
        frontmatter: {
            update?: string
            title: string
            tags?: string[]
            date: string
        }
        fields: {
            slug: string
        }
    }
}

export default PostItem