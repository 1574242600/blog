import * as React from 'react'

export const Pagination: React.FC<PaginationProps> = ({
    totalPage,
    currentPage,
    lengthLimit,
    onPageChange
}) => {
    return (
        <div className='flex flex-row space-x-2 justify-center'>
            {currentPage - 1 > 0 && <PageNumber text='<' onClick={() => onPageChange(currentPage - 1)} />}
            {renderPageNumber(totalPage, lengthLimit, currentPage, onPageChange)}
            {currentPage + 1 <= totalPage && <PageNumber text='>' onClick={() => onPageChange(currentPage + 1)} />}
        </div>
    )
}

const PageNumber: React.FC<PageNumberProps> = ({ page = 0, text, isActived = false, className = '', onClick = () => {} }) => {
    const activeClass = isActived ? ' border-green-400 text-green-500' : ''
    const hoverClass = ' hover:border-green-400 hover:text-green-500'

    return (
        <div
            className={'h-8 w-8 pt-1 border border-gray-300 text-gray-600 text-center cursor-pointer' + hoverClass + activeClass + className}
            onClick={() => onClick(page)}
        >
            { text ?? page}
        </div>
    )
}

const renderPageNumber = (
    total: number,
    lengthLimit: number,
    currentPage: number,
    onClick: (page: number) => void
): React.ReactNode => {
    const items = []

    for (let i = 0; i < Math.floor(lengthLimit / 2); i++) {
        if (currentPage - i > 0) {
            const page = currentPage - i
            items.unshift(<PageNumber page={page} isActived={currentPage === page} onClick={() => onClick(page)} />)
        }
    }

    for (let i = 0; items.length < lengthLimit; i++) {
        if (currentPage + i < total) {
            const page = currentPage + i + 1
            if (items.length === lengthLimit - 1) {
                items.push(<PageNumber text='...' className='!cursor-default' />)
                break
            }

            items.push(<PageNumber page={page} onClick={() => onClick(page)} />)
        } else break
    }

    return items
}

export default Pagination

export interface PaginationProps {
    totalPage: number
    currentPage: number
    lengthLimit: number
    onPageChange: (page: number) => void
}

interface PageNumberProps {
    page?: number
    isActived?: boolean
    text?: string
    className?: string
    onClick?: (page: number) => void
}
