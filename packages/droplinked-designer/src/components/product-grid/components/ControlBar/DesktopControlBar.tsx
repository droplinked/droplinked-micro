import { ContentAreaProps } from "../ContentArea"
import FilterBottomSheetTrigger from "./FilterBottomSheetTrigger"
import SearchInput from "./SearchInput"
import SortDropdown from "./SortDropdown"

function DesktopControlBar({ isSearchBarVisible, isSortVisible, isFilterVisible }: ContentAreaProps) {
    return (
        <div className='hidden md:flex justify-between'>
            <div className='flex gap-4'>
                {isFilterVisible && <FilterBottomSheetTrigger />}
                {isSearchBarVisible && <SearchInput />}
            </div>
            {isSortVisible && <SortDropdown />}
        </div>
    )
}

export default DesktopControlBar