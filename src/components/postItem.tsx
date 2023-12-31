import * as React from 'react'
import PostHeader from './postHeader'
import { Link } from 'gatsby'
import { DeepReadonly } from 'ts-essentials'
import Divider from './divider'
import Box from './box'

const PostItem: React.FC<DeepReadonly<PostItemProps>> = ({ data }) => {
    const { fields, excerpt } = data
    const widthClass = ' xl:w-3xl lg:w-2xl md:w-xl w-full'
    const buttonClass = 'inline-block w-18 h-8 p-2 text-sm font-bold font-mono shadow text-gray-100 bg-sky-400 hover:bg-sky-500'

    return (
        <Box className={'p-6 ' + widthClass}>
            <PostHeader data={data} />
            <Divider />
            <div className='heti m-auto pt-4 pl-2 !max-w-2xl' dangerouslySetInnerHTML={{ __html: excerpt }} />
            <Divider />
            <Link
                className='block text-center mt-4'
                to={fields.slug}
            >
                <div className={buttonClass}>阅读更多</div>
            </Link>
        </Box>
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
