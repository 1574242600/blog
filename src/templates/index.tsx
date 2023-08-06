import * as React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import { graphql, navigate } from 'gatsby'
import { useSiteMetadata } from '@hooks/use-site-metadata'
import PostItem from '@components/postItem'
import { Pagination } from '@components/pagination'

const IndexPage: React.FC<PageProps<IndexPageData, IndexPageContext>> = ({ data, pageContext }) => {
    const { edges } = data.allMarkdownRemark
    return (
        <div className='w-full'>
            <div className='mt-8 space-y-8'>
                {
                    edges.map(({ node }) => {
                        return <PostItem key={node.fields.slug} data={node} />
                    })
                }
            </div>
            <div className='mb-4 mt-12 '>
                <Pagination
                    totalPage={pageContext.numberOfPages}
                    currentPage={pageContext.humanPageNumber}
                    lengthLimit={10}
                    onPageChange={(page) => {
                        void navigate(page === 1 ? '/' : `/page/${page}`)
                        setTimeout(() => {
                            document.getElementById('body')?.scrollTo({
                                top: 0,
                                behavior: 'smooth'
                            })
                        }, 100)
                    }}
                />
            </div>
        </div>
    )
}

export default IndexPage

export const Head: HeadFC = () => {
    const { title, description } = useSiteMetadata()

    return (
        <>
            <title>{title}</title>
            <meta name="description" content={description} />
        </>
    )
}

export const query = graphql`
query IndexQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      skip: $skip
      limit: $limit
      sort: {frontmatter: {date: DESC}}
    ) {
        edges {
            node {
                timeToRead
                excerpt(format: HTML)
                frontmatter {
                    update
                    title
                    tags
                    date
                }
                fields {
                    slug
                }
            }
        }
    }
}
`

export interface IndexPageContext {
    numberOfPages: number
    humanPageNumber: number
    previousPagePath: string
    nextPagePath: string
}

export interface IndexPageData {
    allMarkdownRemark: {
        edges: Array<{
            node: {
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
        }>
    }
}
