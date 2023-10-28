import { useStaticQuery, graphql } from 'gatsby'
import { DeepNonNullable } from 'ts-essentials'

export const useMenuItemsData = (): MenuItemData => {
    const { allMenuJson: { nodes } } = useStaticQuery(
        graphql`
            query MenuItemsData {
                allMenuJson {
                    nodes {
                        name
                        path
                        svgId
                    }
                }
            }
        `
    )

    return nodes
}

export type MenuItemData = DeepNonNullable<Queries.MenuItemsDataQuery>['allMenuJson']['nodes']
