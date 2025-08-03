import { AccordionContent, AccordionItem, AccordionTrigger } from 'components/ui/accordion'
import Text from 'components/ui/Text'
import useThemeInfo from 'hooks/useThemeInfo'
import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
    title: string
}

function FilterGroup({ title, children }: Props) {
    const { isDarkTheme } = useThemeInfo()

    return (
        <AccordionItem value={title} className="border-b-0">
            <AccordionTrigger
                chevronClassName={isDarkTheme ? "[&>path]:stroke-white" : ""}
                className="flex items-center rounded px-3 py-2 text-sm font-normal hover:no-underline bg-shop-foreground"
            >
                <Text>{title}</Text>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col mt-4 gap-4 px-3 py-0">
                {children}
            </AccordionContent>
        </AccordionItem>
    )
}

export default FilterGroup