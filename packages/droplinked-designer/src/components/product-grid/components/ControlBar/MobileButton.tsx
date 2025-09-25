import useThemeInfo from "hooks/useThemeInfo"
import { PropsWithChildren } from "react"

interface Props extends PropsWithChildren {
    onClick: () => void
}

function MobileButton({ onClick, children }: Props) {
    const { shopDesign: { textColorParagraphs } } = useThemeInfo()

    return (
        <button
            onClick={onClick}
            className={`flex items-center justify-center w-10 h-10 border rounded-lg border-[${textColorParagraphs}]`}
        >
            {children}
        </button>
    )
}

export default MobileButton