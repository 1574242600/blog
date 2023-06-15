import { useStaticQuery, graphql } from 'gatsby'

export const useSiteMetadata = (): SiteMetadata => {
    const { site } = useStaticQuery(
        graphql`
            query SiteMetaData {
                site {
                    siteMetadata {
                        title
                        author
                        siteUrl
                        since
                        contacts {
                            name
                            id
                            url
                        }
                        comment {
                            type
                            id
                        }
                    }
                }
            }
        `
    )

    return site.siteMetadata
}

export interface SiteMetadata {
    title: string
    author: string
    siteUrl: string
    since: string
    contacts: Array<{
        name: string
        id: string
        url: string
    }>
    comment: Array<{
        type: string
        id: string
    }>
}
