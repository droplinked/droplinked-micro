import { IShopCurrency } from "lib/stores/app/interfaces";
import { currencyConvertion } from "./app/helpers";

/**
 * Formats a price according to the currency's formatting rules.
 * @param amount The amount in the smallest unit (e.g., cents)
 * @param currency The Currency object with formatting information
 * @param options Additional formatting options
 */
export const formatPrice = (
    amount: number,
    currency: IShopCurrency,
    options: {
        showCurrency?: boolean;
        showAbbreviation?: boolean;
        roundToWhole?: boolean;
    } = { showCurrency: true, showAbbreviation: false, roundToWhole: false }
): string => {
    // Set default values for missing format properties
    const formatDefaults = {
        decimalPlaces: currency.abbreviation === 'JPY' ? 0 : 2,
        thousandsSeparator: ',',
        decimalSeparator: '.',
        symbolPosition: 'before' as 'before' | 'after',
        spaceBetweenAmountAndSymbol: false,
        locale: 'en-US'
    };

    // Merge defaults with provided currency properties
    const format = {
        ...formatDefaults,
        ...currency
    };

    // Round to whole numbers if specified (useful for some displays)
    const decimalDigits = options.roundToWhole ? 0 : format.decimalPlaces;

    // Format using Intl.NumberFormat for best locale support
    const numberFormatter = new Intl.NumberFormat(format.locale, {
        minimumFractionDigits: decimalDigits,
        maximumFractionDigits: decimalDigits,
    });


    const value = +currencyConvertion(amount, currency.conversionRateToUSD, false)

    let formattedValue = numberFormatter.format(value);

    // Add the currency symbol if requested
    if (options.showCurrency && currency.symbol) {
        const space = format.spaceBetweenAmountAndSymbol ? ' ' : '';

        if (format.symbolPosition === 'before') {
            formattedValue = `${currency.symbol}${space}${formattedValue}`;
        } else {
            formattedValue = `${formattedValue}${space}${currency.symbol}`;
        }
    }

    return `${formattedValue} ${options.showAbbreviation ? currency.abbreviation : ""}`;
};