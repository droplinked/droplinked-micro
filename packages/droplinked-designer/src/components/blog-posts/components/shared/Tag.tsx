import React from 'react'
import { getThemeColors } from '../../utils/theme-constants'
import Text from 'components/ui/Text'

export interface TagProps {
    tag: string
    isDarkTheme: boolean
    variant?: 'chip' | 'pill'
    className?: string
}

/**
 * Tag - A reusable tag component for use across blog components
 * @returns A styled tag component
 */
const Tag: React.FC<TagProps> = ({
    tag,
    isDarkTheme,
    variant = 'pill',
    className = ''
}) => {
    const { chipBackground, chipBorder, chipText } = getThemeColors(isDarkTheme)

    // Styles based on variant
    const variantClasses = variant === 'pill'
        ? 'rounded-full px-3 py-1 text-xs'
        : 'rounded-[4px] w-max px-3 py-1 text-xs'

    return (
        <Text
            className={`${variantClasses} select-none ${className}`}
            style={{
                backgroundColor: chipBackground,
                border: `1px solid ${chipBorder}`,
                color: chipText
            }}
        >
            {tag}
        </Text>
    )
}

export default Tag