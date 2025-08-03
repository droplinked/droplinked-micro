/**
 * Formats a date for blog display using a consistent format
 * @param date Date to format
 * @returns Formatted date string (e.g., "Apr 28, 2023")
 */
export const formatBlogDate = (date: Date | string): string => {
    const dateObj = date instanceof Date ? date : new Date(date)

    return dateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    })
}