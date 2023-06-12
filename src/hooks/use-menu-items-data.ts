import { useStaticQuery, graphql } from 'gatsby'

export const useMenuItemsData = (): MenuItemData[] => {
    const { allMenuJson: { nodes } } = useStaticQuery(
        graphql`
            query MenuItemsData {
                allMenuJson {
                    nodes {
                        name
                        path
                    }
                }
            }
        `
    )

    return nodes
}

export interface MenuItemData {
    name: string
    path: string
}
