import * as React from 'react'
import type { LastArrayElement } from 'type-fest'
import { SiteMetadata } from '@hooks/use-site-metadata'
import Svg from './svg'
import Link from './link'

const Contacts: React.FC<ContactsProps> = ({ contacts }) => {
    return (
        <div className='flex justify-center space-x-4 h-8 w-full'>
            {
                contacts.map((contact) => {
                    return <Contact key={contact.name} {...contact} />
                })
            }
        </div>
    )
}

const Contact: React.FC<LastArrayElement<ContactsProps['contacts']>> = ({ name, id, url }) => {
    const href = url.replace(/\{id\}/, id)
    const svgClass = 'text-2xl text-gray-600 hover:text-sky-400'

    return (
        <div title={name}>
            <Link href={href} >
                <Svg id={name} className={svgClass} />
            </Link>
        </div>
    )
}

export interface ContactsProps {
    contacts: SiteMetadata['contacts']
}

export default Contacts
