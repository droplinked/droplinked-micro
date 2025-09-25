import useThemeInfo from 'hooks/useThemeInfo'
import BlogContent from './BlogContent'
import BlogImage from './BlogImage'
import useResponsiveTags from 'components/blog-posts/hooks/useResponsiveTags'
import { BlogDisplayProps } from 'components/blog-posts/utils/types'

/**
 * BlogCard - Displays a single blog post card with image, title, summary and tags
 * @returns A styled blog card component
 */
export default function BlogCard(props: BlogDisplayProps) {
    const { shopDesign: { foreground }, isDarkTheme } = useThemeInfo()

    // Using our custom hook for responsive tag handling
    const visibleTagsCount = useResponsiveTags()

    const { image, category, updatedAt, title, summary, tags, isFeatured, direction, slug } = props

    // Card height based on direction and featured status
    const cardHeight = direction === 'column'
        ? isFeatured
            ? 'h-auto' // Featured cards need auto height to accommodate larger images
            : 'h-auto md:h-[450px]' // Responsive height for regular column cards
        : '' // Row cards use the defined heights in the flex container

    return (
        <div
            className={`overflow-hidden rounded-lg ${cardHeight}`}
            style={{
                backgroundColor: (direction === "row" || isFeatured) ? foreground : "transparent",
                border: (direction === "row" || isFeatured) ? "unset" : `1px solid ${foreground}`,
            }}
        >
            <div className={`flex h-full flex-col ${direction === 'row' && 'md:flex-row h-auto md:h-[186px] lg:h-[226px]'}`}>
                <BlogImage
                    image={image}
                    title={title}
                    isFeatured={isFeatured}
                    direction={direction}
                />
                <BlogContent
                    category={category}
                    updatedAt={updatedAt}
                    title={title}
                    summary={summary}
                    tags={tags}
                    isFeatured={isFeatured}
                    direction={direction}
                    isDarkTheme={isDarkTheme}
                    visibleTagsCount={visibleTagsCount}
                />
            </div>
        </div>
    )
}
