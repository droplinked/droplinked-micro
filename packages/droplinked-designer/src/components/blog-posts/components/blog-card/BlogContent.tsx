import React from 'react'
import { BlogCardDirection } from '../../utils/types'
import { getThemeColors } from '../../utils/theme-constants'
import BlogCardHeader from './BlogCardHeader'
import BlogTitle from './BlogTitle'
import BlogSummary from './BlogSummary'
import BlogTagList from './BlogTagList'

interface BlogContentProps {
    category: string
    updatedAt: Date
    title: string
    summary: string
    tags: string[]
    isFeatured?: boolean
    direction: BlogCardDirection
    isDarkTheme: boolean
    visibleTagsCount: number
}

/**
 * BlogContent - Renders the content section of the blog card
 * @returns Content section of the blog card
 */
const BlogContent: React.FC<BlogContentProps> = ({
    category,
    updatedAt,
    title,
    summary,
    tags,
    isFeatured,
    direction,
    isDarkTheme,
    visibleTagsCount
}) => {
    const { secondaryText: summaryColor } = getThemeColors(isDarkTheme)
    const contentClasses = direction === 'row'
        ? 'md:w-1/2 md:pl-6 w-full'
        : 'w-full'

    return (
        <div className={`${contentClasses} flex-1 flex flex-col gap-2 p-4`}>
            <BlogCardHeader
                category={category}
                updatedAt={updatedAt}
                isDarkTheme={isDarkTheme}
            />
            <BlogTitle
                title={title}
                isFeatured={isFeatured}
            />
            <BlogSummary
                summary={summary}
                isFeatured={isFeatured}
                summaryColor={summaryColor}
            />
            <BlogTagList
                tags={tags}
                visibleTagsCount={visibleTagsCount}
                isDarkTheme={isDarkTheme}
                direction={direction}
            />
        </div>
    )
}

export default BlogContent
