/**
 * Shared theme constants for blog components
 * This centralizes theme-related values to avoid duplication
 */

export const getThemeColors = (isDarkTheme: boolean) => ({
    secondaryText: isDarkTheme ? '#7B7B7B' : '#B1B1B1',
    dotColor: isDarkTheme ? '#292929' : '#DEDEDE',
    chipBackground: isDarkTheme ? '#1C1C1C' : '#F9F9F9',
    chipBorder: isDarkTheme ? '#292929' : '#F2f2f2',
    chipText: isDarkTheme ? '#fff' : '#000',
    tableOfContentBorderColor: isDarkTheme ? "#141414" : "#F2F2F2"
})