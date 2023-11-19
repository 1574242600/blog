import * as React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import { graphql, Link } from 'gatsby'
import { useSiteMetadata } from '@hooks/use-site-metadata'
import { DeepNonNullable, DeepWritable, Head as ArrayHead } from 'ts-essentials'
import Box from '@components/box'

const ArchivesPage: React.FC<PageProps<ArchivesPageData>> = ({ data }) => {
    const widthClass = 'xl:w-3xl lg:w-2xl md:w-xl w-full'
    const byYear = toByYear(data)
    const yearIndex = Object.keys(byYear).reverse()

    return (
        <div className={'w-full flex flex-row justify-center lg:mt-8'}>
            <Box className={widthClass}>
                <div className='p-4'>
                    <ul>
                        {
                            yearIndex.map((year) => (
                                <li key={ year }>
                                    <h3 className='text-2xl font-bold font-mono text-gray-600'>{ year }</h3>
                                    <ul className='list-disc ml-8'>
                                        { byYear[year].map((node) => {
                                            const { id, frontmatter: { title, date }, fields: { slug } } = node
                                            return (
                                                <li key={ id } className='mt-1 space-x-2 border-b-2 border-dashed border-gray-300 hover:text-blue-500'>
                                                    <time dateTime={ date }>{ dateToString(new Date(date)) }</time>
                                                    <Link to={ slug }>{ title }</Link>
                                                </li>
                                            )
                                        }) }
                                    </ul>
                                </li>)
                            )
                        }
                    </ul>
                </div>
            </Box>
        </div>
    )
}

export default ArchivesPage

export const Head: HeadFC<ArchivesPageData> = (data) => {
    const { title: siteTitle } = useSiteMetadata()

    return (
        <>
            <title>归档{' | '}{siteTitle}</title>
            <meta name="description" content={''} />
        </>
    )
}

type ByYear = Record<string, Array<ArrayHead<ArchivesPageData['allMarkdownRemark']['edges']>['node']>>

const toByYear = (data: ArchivesPageData): ByYear =>
    data.allMarkdownRemark.edges.reduce<DeepWritable<ByYear>>((result, { node }) => {
        const date = new Date(node.frontmatter.date)
        const year = date.getFullYear()

        if (result[year] === undefined) result[year] = []
        result[year].push(node)

        return result
    }, {})

function dateToString (date: Date): string {
    return `${date.getMonth() + 1}-${date.getDate()}`
}

export const query = graphql`
query ArchivesQuery {
  allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "/(?<!about)\\.md$/"}}
    sort: {frontmatter: {date: DESC}}
  ) {
    edges {
      node {
        id
        frontmatter {
          title
          date
        }
        fields {
          slug
        }
      }
    }
  }
}
`

export type ArchivesPageData = DeepNonNullable<Queries.ArchivesQueryQuery>
