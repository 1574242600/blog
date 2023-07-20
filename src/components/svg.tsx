import * as React from 'react'

export const Svg: React.FC<SvgProps> = ({ id, className = '' }) => {
    const { useEffect, useState } = React
    const [svg, setSvg] = useState<string | null>(null)

    useEffect(() => {
        const path = `/svg/${id}.svg`
        fetch(path)
            // eslint-disable-next-line @typescript-eslint/promise-function-async
            .then(res => res.text())
            .then(text => setSvg(text))
            .catch(err => console.error(err))
    }, [])

    return (
        <>
            { svg &&
                <svg className={className} dangerouslySetInnerHTML={{ __html: svg }} />
            }
        </>
    )
}

export interface SvgProps {
    id: string
    className?: string
}

export default Svg
