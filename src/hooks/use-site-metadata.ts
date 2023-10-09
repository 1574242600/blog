import { useStaticQuery, graphql } from 'gatsby'
import { DeepNonNullable } from 'ts-essentials'

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
                        description
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

export type SiteMetadata = DeepNonNullable<Queries.SiteMetaDataQuery>['site']['siteMetadata']
