import * as React from 'react'
import { navigate } from 'gatsby'
import { useSiteMetadata } from '@hooks/use-site-metadata'
import { useMenuItemsData, MenuItemData } from '@hooks/use-menu-items-data'
import Sidebar from './sidebar'
import Avatar from './avatar'
import Background from './background'
import { Menu, Item } from './menu'
import Footer from './footer'

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const siteMetadata = useSiteMetadata()
    const menuItemsData = useMenuItemsData()

    const { title } = siteMetadata
    const path = location.pathname
    const defaultActiveKey = (path.at(-1) === '/' ? path.slice(0, -1) : path) || '/'

    return (
        <div>
            <Background />
            <div className='max-w-5xl mx-auto'>
                <Sidebar defaultOpenOnMobile={false}>
                    <div className='pt-2 bg-gradient-to-r from-green-400 to-green-500'>
                        <Avatar alt={title} />
                        <div className='font-mono font-medium text-xl text-center p-3 text-slate-700'>
                            {title}
                        </div>
                    </div>
                    <div className='h-px w-full bg-gray-200 '></div>
                    <Menu
                        defaultActiveKey={defaultActiveKey}
                        onItemActiveChange={key => {
                            void navigate(key)
                        }}
                    >
                        {renderItems(menuItemsData)}
                    </Menu>
                    <div className='absolute bottom-0 w-full '>
                        <Footer siteMetadata={siteMetadata} />
                    </div>
                </Sidebar>
                <div className='lg:ml-80'>{children}</div>
            </div>
        </div>
    )
}

const renderItems = (menu: MenuItemData[]): Array<ReturnType<typeof Item>> => {
    return menu.map(({ name, path }) => {
        return <Item key={path}>{name}</Item>
    })
}

export interface LayoutProps {
    children: React.ReactNode
}

export default Layout
