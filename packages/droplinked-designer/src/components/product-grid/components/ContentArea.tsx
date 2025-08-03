import ControlBar from "./ControlBar/ControlBar"
import ProductGrid from "./ProductGrid/ProductGrid"

export interface ContentAreaProps {
    isSearchBarVisible: boolean
    isSortVisible: boolean
    isFilterVisible?: boolean
}

function ContentArea({ isSearchBarVisible, isSortVisible, isFilterVisible }: ContentAreaProps) {
    return (
        <main className='flex flex-1 flex-col gap-4 md:gap-6 xl:gap-9'>
            <ControlBar isSearchBarVisible={isSearchBarVisible} isSortVisible={isSortVisible} isFilterVisible={isFilterVisible} />
            <ProductGrid />
        </main>
    )
}

export default ContentArea