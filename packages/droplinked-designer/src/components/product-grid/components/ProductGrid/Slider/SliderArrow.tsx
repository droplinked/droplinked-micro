import PLPIcons from "assets/icons/PLP/PLPIcons"
import IconContainer from "./IconContainer"

interface Props {
    direction: "left" | "right"
    isVisible: boolean
    onArrowClick: () => void
}

function SliderArrow({ direction, isVisible, onArrowClick }: Props) {
    const handleClick = (event: React.MouseEvent) => {
        event.preventDefault()
        onArrowClick()
    }

    const arrowPosition = direction === "left" ? "left-[-40px]" : "right-[-40px]"
    const arrowTranslate = direction === "left" ? "left-[8px]" : "right-[8px]"
    const rotateDirection = direction === "left" ? "rotate-90" : "-rotate-90"

    return (
        <IconContainer
            className={`absolute top-1/2 ${arrowPosition} transform -translate-y-1/2 ${rotateDirection} rounded-full cursor-pointer transition-all duration-500 ease-in-out ${isVisible ? arrowTranslate : ""} [&_svg]:w-4 [&_svg]:h-4`}
            onClick={handleClick}
        >
            <PLPIcons.BlackChevronDown />
        </IconContainer>
    )
}

export default SliderArrow