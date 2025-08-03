import PLPIcons from 'assets/icons/PLP/PLPIcons'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from 'components/ui/sheet'
import Text from 'components/ui/Text'
import useThemeInfo from 'hooks/useThemeInfo'
import FilterPanelBody from '../FilterPanel/FilterPanelBody'

function FilterBottomSheetTrigger() {
    const { isDarkTheme, shopDesign: { textColorParagraphs } } = useThemeInfo()

    return (
        <Sheet>
            <SheetTrigger className={`flex items-center justify-center gap-[6px] w-10 h-10 md:h-auto md:w-auto md:px-[14px] md:py-[10px] lg:hidden border rounded-lg border-[${textColorParagraphs}]`}>
                <PLPIcons.Filter className={`shrink-0 ${isDarkTheme ? "[&>path]:stroke-white" : ""}`} />
                <Text as="span" className="hidden md:block text-sm font-medium">Filters</Text>
            </SheetTrigger>

            <SheetContent
                side="bottom"
                className={`flex flex-col max-h-[70vh] p-0 rounded-t-[16px] border-b border-[${textColorParagraphs}] bg-${isDarkTheme ? "black" : "white"}`}
                closeButtonClassName={`top-4 right-4 md:top-6 md:right-9 ${isDarkTheme ? "[&>svg>path]:stroke-white" : ""}`}
            >
                <SheetHeader className={`flex items-start p-4 md:px-9 md:py-6 border-b border-[${textColorParagraphs}]`}>
                    <Text className="text-sm font-bold">Filters</Text>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto">
                    <FilterPanelBody className={`p-4 pb-9 md:p-9`} />
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default FilterBottomSheetTrigger