import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
    siteMetadata: {
        title: 'Nworm',
        author: 'Nworm',
        siteUrl: 'https://nworm.icu',
        since: '2019-06-21T11:30:00.000Z',
        contacts: [
            { name: 'github', id: '1574242600', url: 'github.com/{id}' },
            { name: 'telegram', id: 'nworm1574', url: 't.me/{id}' },
            { name: 'qq', id: '1574242600', url: '' }

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
                path: './src/data/'
            }
        }
    ]
}

export default config
