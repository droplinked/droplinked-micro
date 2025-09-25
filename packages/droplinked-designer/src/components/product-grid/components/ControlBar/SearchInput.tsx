import PLPIcons from "assets/icons/PLP/PLPIcons"
import useThemeInfo from "hooks/useThemeInfo"

function SearchInput() {
    const { isDarkTheme } = useThemeInfo()

    return (
        <div className={`flex items-center gap-2 lg:w-[312px] border border-shop-borderColor rounded-lg py-[6px] pl-3 pr-2`}>
            <PLPIcons.Search className={`shrink-0 ${isDarkTheme ? "[&>path]:stroke-white" : ""}`} />

            <input
                type="text"
                placeholder="Search"
                className={`flex-1 bg-transparent text-sm focus:outline-none font-shopfont ${isDarkTheme ? "text-white dark-placeholder" : "text-black light-placeholder"}`}

            />

            <button className="shrink-0">
                <PLPIcons.SearchInputIcon
                    className={`${isDarkTheme ? "[&>path]:fill-[#292929]" : ""}`}
                />
            </button>
        </div>
    )
}

export default SearchInput 