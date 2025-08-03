import PLPIcons from "assets/icons/PLP/PLPIcons"
import useProductQueryStore from "lib/stores/productQueryStore/productQueryStore"
import { useEffect, useRef, useState } from "react"
import FilterBottomSheetTrigger from "./FilterBottomSheetTrigger"
import MobileButton from "./MobileButton"
import MobileSearchInputTrigger from "./MobileSearchInputTrigger"
import SearchInput from "./SearchInput"
import SortBottomSheetTrigger from "./SortBottomSheetTrigger"
import useThemeInfo from "hooks/useThemeInfo"
import { ContentAreaProps } from "../ContentArea"

export default function MobileControlBar({ isSearchBarVisible, isSortVisible, isFilterVisible }: ContentAreaProps) {
    const [isSearchVisible, setIsSearchVisible] = useState(false)
    const searchContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node))
                setIsSearchVisible(false)
        }

        if (isSearchVisible) document.addEventListener("mousedown", handleClickOutside)
        else document.removeEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isSearchVisible])

    return (
        <>
            {isSearchVisible
                ? <div className="md:hidden" ref={searchContainerRef}><SearchInput /></div>
                :
                <div className="flex justify-between md:hidden">
                    <div className="flex gap-2">
                        {isFilterVisible && <FilterBottomSheetTrigger />}
                        {isSearchBarVisible && <MobileSearchInputTrigger onClick={() => setIsSearchVisible(true)} />}
                    </div>
                    <div className="flex gap-2">
                        <ViewToggleButton />
                        {isSortVisible && <SortBottomSheetTrigger />}
                    </div>
                </div>
            }
        </>
    )
}

function ViewToggleButton() {
    const { isDarkTheme } = useThemeInfo()
    const { viewMode, setViewMode } = useProductQueryStore((state) => ({
        viewMode: state.viewMode,
        setViewMode: state.setViewMode
    }))

    const isGridView = viewMode === "grid"
    const iconClass = isDarkTheme ? "[&_path]:stroke-white" : ""

    return (
        <MobileButton onClick={() => setViewMode(isGridView ? "list" : "grid")}>
            {isGridView
                ? <PLPIcons.ListView className={iconClass} />
                : <PLPIcons.GridView className={iconClass} />
            }
        </MobileButton>
    )
}