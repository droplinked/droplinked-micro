import Text from 'components/ui/Text'
import React from 'react'

export interface BlogTitleProps {
    title: string
    isFeatured?: boolean
}

/**
 * BlogTitle - Renders the blog post title with responsive sizing
 * @returns Styled responsive title component
 */
const BlogTitle: React.FC<BlogTitleProps> = ({ title, isFeatured }) => {
    // Responsive title classes based on featured status and screen size
    const titleClasses = isFeatured
        ? 'text-xl sm:text-2xl md:text-[28px] font-bold line-clamp-2 overflow-hidden'
        : 'text-base sm:text-lg font-bold line-clamp-1 sm:line-clamp-2 overflow-hidden'

    return (
        <Text className={titleClasses}>
            {title}
        </Text>
    )
}

export default BlogTitle
