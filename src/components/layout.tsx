import * as React from 'react'
import { navigate } from 'gatsby'
import { useSiteMetadata } from '@hooks/use-site-metadata'
import { useMenuItemsData, MenuItemData } from '@hooks/use-menu-items-data'
import Sidebar from './sidebar'
import Background from './background'
import Divider from './divider'
import { Menu, Item } from './menu'
import Footer from './footer'
import Contacts from './contacts'
import Svg from './svg'

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const siteMetadata = useSiteMetadata()
    const menuItemsData = useMenuItemsData()

    const { title, contacts } = siteMetadata
    const path = location.pathname
    const defaultActiveKey = (path.at(-1) === '/' ? path.slice(0, -1) : path) || '/'

    return (
        <div>
            <Background />
            <div className='max-w-6xl mx-auto h-screen overflow-hidden'>
                <Sidebar defaultOpenOnMobile={false}>
                    <div className='flex justify-center flex-col h-36 p-1 bg-green-400'>
                        <div className='text-center text-4xl first-line:font-mono font-black text-gray-600'>{title}</div>
                    </div>
                    <Divider />
                    <Menu
                        defaultActiveKey={defaultActiveKey}
                        onItemActiveChange={key => {
                            void navigate(key)
                        }}
                    >
                        {renderItems(menuItemsData)}
                    </Menu>
                    <div className='absolute bottom-0 w-full'>
                        <Contacts contacts={contacts} />
                        <Divider />
                        <Footer siteMetadata={siteMetadata} />
                    </div>
                </Sidebar>
                <div className='lg:ml-80 h-full overflow-auto'>{children}</div>
            </div>
        </div>
    )
}

const renderItems = (menu: MenuItemData[]): Array<ReturnType<typeof Item>> => {
    return menu.map(({ name, path, svgId }) => {
        return (
            <Item key={path}>
                <div className='w-3/4 ml-2'>
                    <Svg id={svgId} className='w-5 h-5 mr-4 inline-block'/>
                    {name}
                </div>
            </Item>
        )
    })
}

export interface LayoutProps {
    children: React.ReactNode
}

export default Layout
