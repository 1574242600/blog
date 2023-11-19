import * as React from 'react'
import { DiscussionEmbed } from 'disqus-react'

const Disqus: React.FC<DisqusProps> = (props) => {
    const { shortname, title, identifier, url } = props
    const { useState, useEffect } = React
    const [isReachable, setIsReachable] = useState<boolean | null>(null)

    useEffect(() => {
        void test(shortname)
            .then((result) => setIsReachable(result))
    }, [])

    return (
        <div>
            { isReachable === null &&
                <div className='animate-pulse font-medium text-gray-600'>
                    正在检查您的网络环境能否访问 Disqus
                </div>
            }

            { isReachable === false &&
                <div className='font-medium text-gray-600'>
                    我们检测到您的网络似乎无法访问 Disqus，请尝试更换网络环境。
                    <span
                        className='ml-4 text-sky-600 hover:text-sky-700 cursor-pointer'
                        onClick={() => setIsReachable(true)}
                    >强制加载</span>
                </div>
            }

            { isReachable === true &&
                 <DiscussionEmbed
                     shortname={shortname}
                     config={
                         {
                             url,
                             identifier,
                             title
                         }
                     }
                 />
            }
        </div>
    )
}

export interface DisqusProps {
    url: string
    shortname: string
    identifier: string
    title: string
}

export default Disqus

// eslint-disable-next-line @typescript-eslint/promise-function-async
async function test (shortname: string): Promise<boolean> {
    // only cloudflare
    const loc = await fetch('/cdn-cgi/trace')
        // eslint-disable-next-line @typescript-eslint/promise-function-async
        .then(r => r.text())
        .then(t => t.match(/loc=(.*)/))
        .then(arr => arr ? arr[1] : 'CN')
        .catch(() => 'CN')

    return loc !== 'CN'
}
