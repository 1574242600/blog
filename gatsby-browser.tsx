import * as React from 'react'
import { WrapRootElementBrowserArgs } from 'gatsby'
import Layout from './src/components/layout'
import './src/styles/global.css'
import './src/styles/heti.css'
import './src/styles/primjs-theme-darcula.css'
import './src/styles/prismjs-other.css'

export const wrapRootElement = ({
    element
}: WrapRootElementBrowserArgs): React.ReactNode => (
    <React.StrictMode>
        <Layout>{element}</Layout>
    </React.StrictMode>
)
