import * as React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import { graphql } from 'gatsby'
import { shuffle } from 'lodash'
import { useSiteMetadata } from '@hooks/use-site-metadata'
import { DeepNonNullable } from 'ts-essentials'
import Box from '@components/box'
import FriendCard from '@components/friendCard'

const FriendsPage: React.FC<PageProps<FriendsPageData>> = ({ data }) => {
    const widthClass = ' xl:w-3xl lg:w-2xl md:w-xl w-full'
    const nodes = shuffle(data.allFriendsJson.edges.map((edge) => edge.node))

    return (
        <div className={'w-full flex flex-row justify-center lg:mt-8'}>
            <Box className={widthClass}>
                <div className='grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 p-4'>
                    {
                        nodes.map((node, i) => (
                            <div key={i} className=''>
                                <FriendCard
                                    data={node}
                                    className='w-44 h-44'
                                />
                            </div>
                        ))
                    }
                </div>
            </Box>
        </div>
    )
}

export default FriendsPage

export const Head: HeadFC<FriendsPageData> = (data) => {
    const { title: siteTitle } = useSiteMetadata()
    const nodes = shuffle(data.data.allFriendsJson.edges)
        .slice(0, 5)
        .map(edge => edge.node)
        .map(node => `${node.name} (${node.description})`)

    return (
        <>
            <title>友人{' | '}{siteTitle}</title>
            <meta name="description" content={nodes.join(' | ')} />
        </>
    )
}

export const query = graphql`
    query FriendsQuery {
        allFriendsJson {
            edges {
                node {
                    name
                    description
                    avatar
                    url
                }
            }
        }
    }
`

export type FriendsPageData = DeepNonNullable<Queries.FriendsQueryQuery>
