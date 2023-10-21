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
                    当前您的网络似乎无法访问 Disqus，请尝试更换网络环境。
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
function test (shortname: string): Promise<boolean> {
    const p1 = fetch(`https://${shortname}.disqus.com/embed.js`, {
        method: 'HEAD'
    })
        .then(r => r.status === 200)
        .catch(() => false)

    const p2 = new Promise<boolean>((resolve) => setTimeout(() => resolve(false), 5000))

    const result = Promise.race([p1, p2])

    return result
}
