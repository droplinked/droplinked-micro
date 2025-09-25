import { Accordion } from "components/ui/accordion"
import { cn } from "lib/utils/cn"
import FilterGroup from "./FilterGroup"

interface FilterPanelBodyProps {
    className?: string
}

export default function FilterPanelBody({ className }: FilterPanelBodyProps) {
    return (
        <Accordion type="multiple" className={cn("flex flex-col gap-6", className)}>
            <FilterGroup title="Type" />
            <FilterGroup title="Collection" />
            <FilterGroup title="Price" />
        </Accordion>
    )
}