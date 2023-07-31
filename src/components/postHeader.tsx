import * as React from 'react'
import { Link } from 'gatsby'

const PostHeader: React.FC<PostHeaderProps> = ({ data }) => {
    const {
        timeToRead,
        frontmatter
    } = data

    const dateStr = dateToString(new Date(frontmatter.date))
    const updateStr = frontmatter.update ? dateToString(new Date(frontmatter.update)) : ''

    return (
        <div className='mb-4'>
            <div className='text-3xl font-bold font-mono text-center text-gray-700'>{data.frontmatter.title}</div>
            <div className='mt-2 text-xs text-center font-bold space-x-4 text-gray-500'>
                <span>发表于: {dateStr}</span>
                <span>更新于: {updateStr}</span>
                <span>预计阅读时长: {timeToRead} 分钟</span>
                <span>标签: {frontmatter.tags ? renderTagLinks(frontmatter.tags) : 'null'}</span>
            </div>
        </div>
    )
}

function dateToString (time: Date): string {
    const y = time.getFullYear()
    const m = time.getMonth() + 1
    const d = time.getDate()
    return `${y}-${m}-${d}`
}

function renderTagLinks (tags: string[]): React.ReactNode {
    return tags.map(
        (tag, index) => (
            <React.Fragment key={ tag }>
                <Link className='hover:text-sky-400' to={`/tag/${tag}`}>{ tag }</Link>
                { tags[index + 1] === undefined ? '' : ', ' }
            </React.Fragment>
        )
    )
}

export interface PostHeaderProps {
    data: {
        timeToRead: number
        frontmatter: {
            update?: string
            title: string
            tags?: string[]
            date: string
        }
    }
}

export default PostHeader
