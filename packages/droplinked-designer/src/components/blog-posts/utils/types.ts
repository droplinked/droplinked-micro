/**
 * Shared type definitions for blog components
 */

export interface BlogDisplayProps {
    image: string
    category: string
    updatedAt: Date
    title: string
    summary: string
    tags: string[]
    slug: string
    isFeatured?: boolean
    direction: 'row' | 'column'
}

export type BlogCardDirection = 'row' | 'column'