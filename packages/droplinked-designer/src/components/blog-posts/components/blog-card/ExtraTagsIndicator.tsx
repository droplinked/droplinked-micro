import React from 'react'
import { BlogCardDirection } from '../../utils/types'
import Tag from '../shared/Tag'

export interface ExtraTagsIndicatorProps {
    count: number
    isDarkTheme: boolean
    direction: BlogCardDirection
}

/**
 * ExtraTagsIndicator - Shows how many additional tags exist beyond what's displayed
 * @returns A styled indicator for additional tags or null if no extra tags
 */
const ExtraTagsIndicator: React.FC<ExtraTagsIndicatorProps> = ({ count, isDarkTheme, direction }) => {
    if (count <= 0) return null

    return (
        <Tag
            tag={`+${count}`}
            isDarkTheme={isDarkTheme}
            className={direction === "row" ? "hidden sm:inline-block" : ""}
        />
    )
}

export default ExtraTagsIndicator
