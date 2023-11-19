import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
    siteMetadata: {
        title: 'Nworm',
        author: 'Nworm',
        siteUrl: 'https://nworm.icu',
        since: '2019-06-21T11:30:00.000Z',
        description: '一条咸鱼',
        contacts: [
            { name: 'email', id: 'admin@nworm.icu', url: 'mailto:{id}' },
            { name: 'github', id: '1574242600', url: '//github.com/{id}' },
            { name: 'telegram', id: 'nworm1574', url: '//t.me/{id}' }
        ],
        comment: { type: 'disqus', id: 'nworm' }
    },
    graphqlTypegen: true,
    plugins: [
        'gatsby-plugin-postcss',
        'gatsby-plugin-tsconfig-paths',
        'gatsby-plugin-image',
        'gatsby-plugin-sharp',
        'gatsby-transformer-sharp',
        'gatsby-plugin-sitemap',
        'gatsby-transformer-json',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: './src/data/posts/'
            }
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: './src/data/'
            }
        },
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    {
                        resolve: 'gatsby-remark-autolink-headers'
                    },
                    'gatsby-remark-prismjs'
                ],
                excerpt_separator: '<!--more-->'
            }
        },
        {
            resolve: 'gatsby-plugin-feed',
            options: {
                query: `
                    {
                        site {
                            siteMetadata {
                                title
                                description
                                siteUrl
                            }
                        }
                    }
                `,
                feeds: [
                    {
                        /// @ts-expect-error
                        serialize: ({ query: { site, allMarkdownRemark } }) => {
                            /// @ts-expect-error
                            return allMarkdownRemark.edges.map(edge => {
                                return Object.assign({}, edge.node.frontmatter, {
                                    description: edge.node.excerpt,
                                    date: edge.node.frontmatter.date,
                                    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                                    url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                                    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                                    guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                                    custom_elements: [{ 'content:encoded': edge.node.html }]
                                })
                            })
                        },
                        query: `
                            {
                                allMarkdownRemark(
                                    sort: {frontmatter: {date: DESC}}
                                    filter: {fileAbsolutePath: {regex: "/(?<!about)\\\\.md$/"}}
                                ) {
                                    edges {
                                        node {
                                            excerpt
                                            html
                                            fields { 
                                                slug 
                                            }
                                            frontmatter {
                                                title
                                                date
                                            }
                                        }
                                    }
                                }
                            }
                        `,
                        output: '/rss.xml',
                        title: 'Nworm',
                        match: '^/post/',
                        language: 'zh-CN'
                    }
                ]
            }
        }
    ]
}

export default config
