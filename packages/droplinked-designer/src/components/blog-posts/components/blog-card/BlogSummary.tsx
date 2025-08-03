import Text from 'components/ui/Text'
import React from 'react'

export interface BlogSummaryProps {
    summary: string
    isFeatured?: boolean
    summaryColor: string
}

/**
 * BlogSummary - Renders the blog post summary with responsive text handling
 * @returns Styled responsive summary component
 */
const BlogSummary: React.FC<BlogSummaryProps> = ({ summary, isFeatured, summaryColor }) => {
    // Adjust line clamp based on featured status and screen size
    const lineClampClass = isFeatured
        ? 'line-clamp-2 sm:line-clamp-3'  // Featured posts show more text 
        : 'line-clamp-1 sm:line-clamp-2'  // Regular posts show less text

    // Text size based on featured status
    const textSizeClass = isFeatured
        ? 'text-sm md:text-base'
        : 'text-xs md:text-sm'

    return (
        <Text
            className={`${textSizeClass} ${lineClampClass} overflow-hidden`}
            style={{ color: summaryColor }}
        >
            {summary}
        </Text>
    )
}

export default BlogSummary
