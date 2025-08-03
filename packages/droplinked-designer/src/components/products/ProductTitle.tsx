import Text from "components/ui/Text"
import { cn } from "lib/utils/cn"

function ProductTitle({ title, className }: { title: string, className?: string }) {
    return (
        <Text
            as="h3"
            className={cn("text-sm md:text-base font-normal line-clamp-2", className)}
        >
            {title}
        </Text>
    )
}

export default ProductTitle