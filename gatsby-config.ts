import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
    siteMetadata: {
        title: 'Nworm',
        siteUrl: 'https://nworm.icu'
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
