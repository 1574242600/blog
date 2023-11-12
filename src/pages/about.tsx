import * as React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import { graphql } from 'gatsby'
import { useSiteMetadata } from '@hooks/use-site-metadata'
import { DeepNonNullable } from 'ts-essentials'
import Divider from '@components/divider'
import Box from '@components/box'
import Disqus from '@components/comment/disqus'

const AboutPage: React.FC<PageProps<AboutPageData>> = ({ data }) => {
    const { comment } = useSiteMetadata()
    const { html, frontmatter, fields: { slug } } = data.markdownRemark
    const widthClass = ' xl:w-3xl lg:w-2xl md:w-xl w-full'

    return (
        <div className={'w-full flex flex-row justify-center lg:mt-8'}>
            <div className={widthClass}>
                <Box>
                    <div className='p-6'>
                        <div className='mb-4'>
                            <div className='text-2xl font-bold font-mono text-center text-gray-600'>{frontmatter.title}</div>
                        </div>
                        <Divider />
                        <div className='heti m-auto pt-4 !max-w-2xl' dangerouslySetInnerHTML={{ __html: html }} />
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
    )
}

export default AboutPage

export const Head: HeadFC<AboutPageData> = (data) => {
    const { title: siteTitle } = useSiteMetadata()
    const { excerpt } = data.data.markdownRemark

    // todo The Open Graph protocol
    return (
        <>
            <title> 关于 {' | '}{siteTitle}</title>
            <meta name="description" content={excerpt} />
        </>
    )
}

export const query = graphql`
    query AboutQuery {
        markdownRemark(fields: {slug: {eq: "/post/about/"}}) {
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

export type AboutPageData = DeepNonNullable<Queries.AboutQueryQuery>
