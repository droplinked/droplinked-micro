import Text from 'components/ui/Text'
import useThemeInfo from 'hooks/useThemeInfo'
import { cn } from 'lib/utils/cn'

interface ProductPriceProps {
    price: string // changed from number to string
    className?: string
    abbreviation?: string
}

const ProductPrice = ({ price, className, abbreviation }: ProductPriceProps) => {
    const { isDarkTheme } = useThemeInfo()

    const textStyles = 'text-base md:text-[18px]'
    const secondaryTextColor = isDarkTheme ? '#7B7B7B' : '#B1B1B1'

    return (
        <Text className={cn('font-medium', textStyles, className)}>
            {price}
            <span className={cn(`text-[${secondaryTextColor}]`, 'font-normal')}>
                {" "} {abbreviation}
            </span>
        </Text>
    )
}

export default ProductPrice