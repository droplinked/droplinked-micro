import React from 'react'
import Tag from '../shared/Tag'

export interface BlogTagProps {
    tag: string
    isDarkTheme: boolean
}

/**
 * BlogTag - Uses the shared Tag component with consistent styling
 */
const BlogTag: React.FC<BlogTagProps> = ({ tag, isDarkTheme }) => {
    return <Tag tag={tag} isDarkTheme={isDarkTheme} variant="pill" />
}

export default BlogTag
