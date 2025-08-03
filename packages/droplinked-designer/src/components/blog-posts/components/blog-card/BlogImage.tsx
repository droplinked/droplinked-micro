import React from 'react'
import { BlogCardDirection } from '../../utils/types'

export interface BlogImageProps {
    image: string
    title: string
    isFeatured?: boolean
    direction: BlogCardDirection
}

/**
 * BlogImage - Renders the blog post image with responsive sizing
 * @returns Image component with proper styling based on layout direction and featured status
 */
const BlogImage: React.FC<BlogImageProps> = ({ image, title, isFeatured, direction }) => {
    // Responsive height classes based on layout and featured status
    const imageHeightClasses = isFeatured
        ? 'h-[196px] sm:h-[280px] md:h-[320px] lg:h-[356px] xl:h-[472px]' // Featured image heights
        : direction === "row"
            ? 'md:h-full h-[220px]' // Row layout image heights
            : 'h-[220px]' // Column layout image height

    const widthClasses = direction === 'row' ? 'w-full md:w-1/2' : 'w-full'

    return (
        <div
            data-testid="blog-image-wrapper"
            className={`${widthClasses} ${imageHeightClasses} overflow-hidden`}
        >
            <img
                src={image}
                alt={title}
                className={`w-full h-full object-cover ${isFeatured ? 'rounded-t-lg' : ''}`}
            />
        </div>
    )
}

export default BlogImage
