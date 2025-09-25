interface Props {
    imagesLength: number
    isVisible: boolean
    currentIndex: number
    onDotClick: (index: number) => void
}

function SliderDots({ imagesLength, isVisible, currentIndex, onDotClick }: Props) {
    return (
        <div
            className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-in-out ${isVisible ? 'bottom-2' : 'bottom-[-40px]'}`}
            style={{ width: "fit-content" }}
            onClick={(e) => e.preventDefault()}
        >
            <ul className="flex gap-1 rounded-[20px] bg-[rgba(255,255,255,0.75)] p-1">
                {Array.from({ length: imagesLength }).map((_, index) => (
                    <li
                        key={index}
                        className={`shrink-0 h-1 w-1 rounded-full cursor-pointer transition-all duration-300 ease-in-out ${currentIndex === index ? 'w-4 rounded-3xl bg-black' : 'bg-[#878787]'}`}
                        onClick={() => onDotClick(index)}
                    />
                ))}
            </ul>
        </div>
    )
}

export default SliderDots