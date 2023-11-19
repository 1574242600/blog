import * as React from 'react'
import { SiteMetadata } from '@hooks/use-site-metadata'
import Link from './link'

const Footer: React.FC<FooterProps> = ({ siteMetadata }) => {
    const { title, author, since } = siteMetadata

    const textClass = ' text-xs text-center font-medium text-gray-400'
    return (
        <div className={'w-full p-1 bg-gray-100' + textClass}>
            <Since since={since}/>
            <div>© { (new Date()).getFullYear() } { title }. {'Powered by'} <Link href={'//www.gatsbyjs.com/'}>gatsby</Link></div>
            <div>
                <span>Made with by { author }.</span>
            </div>
            <div className='flex flex-row justify-center'>
                <span className='basis-10'>
                    <Link href={'/sitemap-index.xml'} >SiteMap</Link>
                </span>
                <span className='basis-10'>
                    <Link href={'/rss.xml'}>RSS</Link>
                </span>
            </div>
        </div>
    )
}

const Since: React.FC<{ since: string }> = ({ since }) => {
    function toStr (birthDay: Date, today: Date): string {
        const timeold = (today.getTime() - birthDay.getTime())
        const msPerDay = 24 * 60 * 60 * 1000
        const eDaysold = timeold / msPerDay
        const daysold = Math.floor(eDaysold)
        const eHrsold = (eDaysold - daysold) * 24
        const hrsold = Math.floor(eHrsold)
        const eMinsold = (eHrsold - hrsold) * 60
        const minsold = Math.floor((eHrsold - hrsold) * 60)
        const seconds = Math.floor((eMinsold - minsold) * 60)
        return (`${daysold}天${hrsold}小时${minsold}分${seconds}秒`)
    }

    const { useState, useEffect } = React
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const id = setInterval(() => {
            setTime(new Date())
        }, 1000)

        return () => clearInterval(id)
    }, [])

    return (
        <div>
            <span>{'博客已存活: '}</span>{toStr(new Date(since), time)}
        </div>
    )
}

export interface FooterProps {
    siteMetadata: SiteMetadata
}

export default Footer
