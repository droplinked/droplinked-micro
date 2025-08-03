import { Text, TextProps } from '@chakra-ui/react'
import useThemeInfo from 'hooks/useThemeInfo'
import useAppStore from 'lib/stores/app/appStore'
import { formatPrice } from 'lib/utils/formatPrice'

/**
 * Interface for price-related components that extends TextProps
 * @property {string | number} price - The price value to display
 */
interface PriceProps extends TextProps {
    price: string | number
}

/**
 * Base typography component that applies consistent font family and color styling
 * @param {TextProps} props - Text component props from Chakra UI
 * @returns Typography component with consistent styling based on shop design
 */
export default function AppTypography(props: TextProps) {
    const { shopDesign: { fontfamily, textColorParagraphs } } = useThemeInfo()

    return (
        <Text
            fontFamily={fontfamily}
            color={textColorParagraphs || "#FFF"}
            {...props}
        >
            {props.children}
        </Text>
    )
}

/**
 * Displays price with currency formatting based on shop's currency settings
 * @param {PriceProps} props - Price props including the price value and TextProps
 * @returns Formatted price text with appropriate currency symbol
 */
AppTypography.Price = function Price({ price, ...props }: PriceProps) {
    const { states: { shop: { currency } } } = useAppStore();

    return (
        <AppTypography {...props}>
            {
                currency?.conversionRateToUSD
                    ? formatPrice(+price, currency)
                    : `$${price} USD`
            }
        </AppTypography>
    )
}

/**
 * Displays price in custom token format when token-based pricing is enabled
 * @param {PriceProps} props - Price props including the price value and TextProps
 * @returns Formatted price text with token currency or null if token pricing is disabled
 */
AppTypography.CustomTokenPrice = function CustomTokenPrice({ price, ...props }: PriceProps) {
    const { states: { shop: { tokenBasedPricing } } } = useAppStore()
    const { token, tokenSign, hasTokenBasedPricing, unit } = tokenBasedPricing;

    // Inline pricing logic
    const priceSign = hasTokenBasedPricing ? tokenSign : "$";
    const priceUnit = hasTokenBasedPricing ? unit : 1;
    const currency = hasTokenBasedPricing ? token : "USD";
    const calculatedPrice = +price * priceUnit;
    const precised =
        !isNaN(calculatedPrice) && calculatedPrice >= 1
            ? calculatedPrice.toFixed(2)
            : calculatedPrice.toPrecision(calculatedPrice > 0.001 ? 3 : 6);

    const pricingResult = { calculated_price: precised, price_sign: priceSign, currency };

    return hasTokenBasedPricing ? (
        <AppTypography {...props}>
            {`${pricingResult.calculated_price} ${pricingResult.currency}`}
        </AppTypography>
    ) : null;
};
