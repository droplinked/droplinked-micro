import useIsMobile from 'hooks/useIsMobile'
import useProductQueryStore from 'lib/stores/productQueryStore/productQueryStore'
import { PropsWithChildren } from 'react'

function ProductGridLayout({ children }: PropsWithChildren) {
    const isMobile = useIsMobile()
    const viewMode = useProductQueryStore(s => s.viewMode)

    // Dynamic grid classes based on mobile status and view mode
    const gridClasses = isMobile
        ? viewMode === 'grid'
            ? 'grid grid-cols-2 gap-x-4 gap-y-6'  // Mobile grid view with 2 columns, base gaps
            : 'grid grid-cols-1 gap-y-6'  // Mobile list view with 1 column, base gaps
        : `grid 
            grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4 
            xl:grid-cols-4 
            xl-plus:grid-cols-5 
            gap-x-4 gap-y-6 
            lg:gap-x-4 lg:gap-y-9 
            xl:gap-x-6 xl:gap-y-9`  // Gaps adjusted for specific screen sizes

    return (
        <div className={gridClasses}>
            {children}
        </div>
    )
}

export default ProductGridLayout