import PLPIcons from 'assets/icons/PLP/PLPIcons'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from 'components/ui/sheet'
import useThemeInfo from 'hooks/useThemeInfo'
import Text from 'components/ui/Text'

function SortBottomSheetTrigger() {
    const { isDarkTheme } = useThemeInfo()

    return (
        <Sheet>
            <SheetTrigger className={`flex items-center justify-center w-10 h-10 border rounded-lg lg:hidden border-shop-textColor`}>
                <PLPIcons.Sort className={`shrink-0 ${isDarkTheme ? "[&_path]:stroke-white" : ""}`} />
            </SheetTrigger>

            <SheetContent
                side="bottom"
                className={`p-0 max-h-full border-b rounded-t-[16px] bg-${isDarkTheme ? "black" : "white"} border-shop-textColor`}
                closeButtonClassName={`top-4 right-4 md:top-6 md:right-9 ${isDarkTheme ? "[&>svg>path]:stroke-white" : ""}`}
            >
                <SheetHeader className={`flex items-start p-4 text-left md:px-9 md:py-6 border-b border-shop-textColor`}>
                    <Text className='text-sm font-bold'>Sort</Text>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export default SortBottomSheetTrigger