import { isDarkColor } from 'lib/utils/app/helpers'
import { createUsePuck } from 'puck-editor'

const usePuck = createUsePuck()

function useThemeInfo() {
    const shopDesign = usePuck((s) => s.appState.data.shopDefaultData.shopDesign)

    const isDarkTheme = isDarkColor(shopDesign.backgroundBody)

    return { isDarkTheme, shopDesign }
}

export default useThemeInfo
