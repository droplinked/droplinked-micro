import PLPIcons from "assets/icons/PLP/PLPIcons"
import MobileButton from "./MobileButton"
import useThemeInfo from "hooks/useThemeInfo"

function MobileSearchInputTrigger({ onClick }: { onClick: () => void }) {
    const { isDarkTheme } = useThemeInfo()
    const iconClass = isDarkTheme ? "[&>path]:stroke-white" : ""

    return (
        <MobileButton onClick={onClick}>
            <PLPIcons.Search className={iconClass} />
        </MobileButton>
    )
}

export default MobileSearchInputTrigger