import * as React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import { graphql } from 'gatsby'
import { useSiteMetadata } from '@hooks/use-site-metadata'
import { DeepNonNullable } from 'ts-essentials'
import Divider from '@components/divider'
import PostHeader from '@components/postHeader'
import Link from '@components/link'
import Box from '@components/box'
import Disqus from '@components/comment/disqus'

// todo 文章目录，图片优化
const PostPage: React.FC<PageProps<PostPageData>> = ({ data }) => {
    const { author, siteUrl, comment } = useSiteMetadata()
    const { html, frontmatter, fields: { slug } } = data.markdownRemark
    const widthClass = ' xl:w-3xl lg:w-2xl md:w-xl w-full'

    return (
        <div className=''>
            <div className={'w-full flex flex-row justify-center lg:mt-8'}>
                <div className={widthClass}>
                    <Box>
                        <div className='p-6'>
                            <PostHeader data={data.markdownRemark} />
                            <Divider />
                            <div className='heti m-auto pt-4 !max-w-2xl' dangerouslySetInnerHTML={{ __html: html }} />
                        </div>
                        <div className='bg-sky-300 mt-8 p-2 text-xs font-medium text-gray-600'>
                            <div>作者：{frontmatter.author || author}</div>
                            <div>本文链接：<Link href={siteUrl + slug}>{siteUrl + slug}</Link></div>
                            <div>许可协议：<Link href='https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans'>CC BY-NC-SA 4.0 Deed</Link></div>
                        </div>
                    </Box>
                    <Box className='mt-8 mb-8'>
                        <div className='p-2'>
                            { comment.type === 'disqus' &&
                                <Disqus
                                    title={frontmatter.title}
                                    identifier={slug}
                                    url={window.location.href}
                                    shortname={comment.id}
                                />
                            }
                        </div>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default PostPage

export const Head: HeadFC<PostPageData> = (data) => {
    const { title: siteTitle } = useSiteMetadata()
    const { frontmatter, excerpt } = data.data.markdownRemark
    const { title: postTitle } = frontmatter

    // todo The Open Graph protocol
    return (
        <>
            <title>{postTitle}{' | '}{siteTitle}</title>
            <meta name="description" content={excerpt} />
        </>
    )
}

export const query = graphql`
    query PostQuery($id: String!) {
        markdownRemark(id: {eq: $id}) {
            frontmatter {
                date
                author
                tags
                title
                update
            }
            fields {
                slug
            }
            timeToRead
            excerpt(format: PLAIN)
            html
        }
    }
`

export type PostPageData = DeepNonNullable<Queries.PostQueryQuery>
