import React from 'react'
import { getThemeColors } from '../../utils/theme-constants'
import { formatBlogDate } from '../../utils/date-formatter'
import Text from 'components/ui/Text'

export interface BlogCardHeaderProps {
    category: string
    updatedAt: Date
    isDarkTheme: boolean
}

/**
 * BlogCardHeader - Renders the category and date information
 * @returns Header section with category and date
 */
const BlogCardHeader: React.FC<BlogCardHeaderProps> = ({ category, updatedAt, isDarkTheme }) => {
    const { secondaryText: dateColor, dotColor } = getThemeColors(isDarkTheme)
    const formattedDate = formatBlogDate(updatedAt)

    return (
        <div className="flex items-center text-sm text-gray-600">
            {category && (
                <div className="flex items-center min-w-0 flex-shrink overflow-hidden">
                    <Text className="font-medium text-system-link truncate">{category}</Text>
                    <div className="mx-2 w-1 h-1 rounded-full flex-shrink-0" style={{ background: dotColor }} />
                </div>
            )}
            <Text className="whitespace-nowrap flex-shrink-0" style={{ color: dateColor }}>{formattedDate}</Text>
        </div>
    )
}

export default BlogCardHeader
