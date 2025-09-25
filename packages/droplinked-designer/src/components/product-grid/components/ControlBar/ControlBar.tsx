import { ContentAreaProps } from "../ContentArea"
import DesktopControlBar from "./DesktopControlBar"
import MobileControlBar from "./MobileControlBar"

function ControlBar({ isSearchBarVisible, isSortVisible, isFilterVisible }: ContentAreaProps) {
    return (
        <>
            <DesktopControlBar isSearchBarVisible={isSearchBarVisible} isSortVisible={isSortVisible} isFilterVisible={isFilterVisible} />
            <MobileControlBar isSearchBarVisible={isSearchBarVisible} isSortVisible={isSortVisible} isFilterVisible={isFilterVisible} />
        </>
    )
}

export default ControlBar