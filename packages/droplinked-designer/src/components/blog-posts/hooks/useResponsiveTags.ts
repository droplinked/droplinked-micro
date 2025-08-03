import { useState, useEffect } from 'react'

/**
 * A custom hook to handle responsive tag visibility based on screen size
 * @returns The current number of visible tags based on screen width
 */
export default function useResponsiveTags() {
    const [visibleTagsCount, setVisibleTagsCount] = useState(4)

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth
            if (width < 1024) { // laptop sm and mobile
                setVisibleTagsCount(1)
            }
            else if (width < 1280) { // laptop
                setVisibleTagsCount(2)
            } else { // desktop
                setVisibleTagsCount(3)
            }
        }

        // Set initial value and add event listener
        handleResize()
        window.addEventListener('resize', handleResize)

        // Clean up
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return visibleTagsCount
}