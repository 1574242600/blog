import type { GatsbyNode, CreatePagesArgs } from 'gatsby'
import { createFilePath } from 'gatsby-source-filesystem'
// @ts-expect-error
import { paginate } from 'gatsby-awesome-pagination'
import { DeepNonNullable } from 'ts-essentials'
import path from 'path'

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({ actions }) => {
    actions.setWebpackConfig({
        devtool: process.env.develop ? 'source-map' : false
    })
}

export const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, getNode, actions }) => {
    const { createNodeField } = actions

    if (node.internal.type === 'MarkdownRemark') {
        createNodeField({
            node,
            name: 'slug',
            value: '/post' + createFilePath({ node, getNode })
        })
    }
}

export const createPages: GatsbyNode['createPages'] = async ({ actions, graphql }) => {
    const { createPage } = actions
    const posts = await getPosts(graphql)

    paginate({
        createPage,
        items: posts,
        component: path.resolve('./src/templates/index.tsx'),
        itemsPerPage: 5,
        pathPrefix: ({ pageNumber }: { pageNumber: number }) => pageNumber === 0 ? '/' : '/page'
    })

    posts.forEach(({ node }) => {
        if (node.fields.slug === '/post/about/') return
        createPage({
            path: node.fields.slug,
            component: path.resolve('./src/templates/post.tsx'),
            context: { id: node.id }
        })
    })
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getPosts = async (graphql: CreatePagesArgs['graphql']) => {
    const { data } = await graphql<DeepNonNullable<Queries.PostsQueryQuery>>(`
        query PostsQuery {
            allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
                edges {
                    node {
                        id
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `)

    return data?.allMarkdownRemark.edges ?? []
}
