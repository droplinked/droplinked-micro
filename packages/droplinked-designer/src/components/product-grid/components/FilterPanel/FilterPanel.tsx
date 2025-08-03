import PLPIcons from "assets/icons/PLP/PLPIcons"
import FilterPanelBody from "./FilterPanelBody"
import useThemeInfo from "hooks/useThemeInfo"
import Text from "components/ui/Text"

export default function FilterPanel() {

    return (
        <aside className={`sticky top-8 w-[264px] shrink-0 border rounded-lg border-shop-borderColor hidden lg:block`}>
            <FilterPanelHeader />
            <FilterPanelBody className="p-2 pb-4" />
        </aside>
    )
}

function FilterPanelHeader() {
    const { isDarkTheme } = useThemeInfo()

    const iconClass = isDarkTheme ? "[&>path]:stroke-white" : ""

    return (
        <div className={`flex items-center justify-between gap-6 p-4 border-b border-shop-borderColor`}>
            <Text className="text-sm font-bold">Filters</Text>
            <button>
                <PLPIcons.ResetFilters className={iconClass} />
            </button>
        </div>
    )
}