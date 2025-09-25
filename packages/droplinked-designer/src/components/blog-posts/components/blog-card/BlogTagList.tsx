import React from 'react'
import BlogTag from './BlogTag'
import ExtraTagsIndicator from './ExtraTagsIndicator'
import { BlogCardDirection } from '../../utils/types'

export interface BlogTagListProps {
    tags: string[]
    visibleTagsCount: number
    isDarkTheme: boolean
    direction: BlogCardDirection
}

/**
 * BlogTagList - Renders the list of tags with a "more" indicator if needed
 * @returns List of tag chips
 */
const BlogTagList: React.FC<BlogTagListProps> = ({ tags, visibleTagsCount, isDarkTheme, direction }) => {
    if (!tags || tags.length === 0) return null

    const displayTags = tags.slice(0, visibleTagsCount)
    const extraTagsCount = tags.length > visibleTagsCount ? tags.length - visibleTagsCount : 0

    return (
        <div className="flex flex-wrap gap-2 mt-auto">
            {displayTags.map((tag, index) => (
                <BlogTag key={index} tag={tag} isDarkTheme={isDarkTheme} />
            ))}
            <ExtraTagsIndicator
                count={extraTagsCount}
                isDarkTheme={isDarkTheme}
                direction={direction}
            />
        </div>
    )
}

export default BlogTagList
