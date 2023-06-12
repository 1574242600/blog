import { useStaticQuery, graphql } from 'gatsby'

export const useSiteMetadata = (): SiteMetadata => {
    const { site } = useStaticQuery(
        graphql`
            query SiteMetaData {
                site {
                    siteMetadata {
                        title
                        siteUrl
                    }
                }
            }
        `
    )

    return site.siteMetadata
}

export interface SiteMetadata {
    title: string
    siteUrl: string
}
