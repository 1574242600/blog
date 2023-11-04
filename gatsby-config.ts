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
        }
    ]
}

export default config
