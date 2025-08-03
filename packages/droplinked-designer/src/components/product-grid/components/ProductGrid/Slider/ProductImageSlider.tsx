import PLPIcons from "assets/icons/PLP/PLPIcons"
import { IHomePageProduct } from "components/product-grid/interface/interface"
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from "keen-slider/react"
import { useState } from "react"
import IconContainer from "./IconContainer"
import SliderArrow from "./SliderArrow"
import SliderDots from "./SliderDots"

interface Props {
    product: IHomePageProduct
    isHovered: boolean
}

export default function ProductImageSlider({ product, isHovered }: Props) {
    const { media, title } = product
    const [currentIndex, setCurrentIndex] = useState(0)
    const sliderImages = media.sort((_, b) => (b.isMain === "true" ? 1 : -1)).slice(0, 3)

    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        loop: true,
        slides: { perView: 1 },
        mode: "snap",
        slideChanged: (sliderInstance) => setCurrentIndex(sliderInstance.track.details.rel)
    })

    if (sliderImages.length === 1) return (
        <div className="relative overflow-hidden rounded-lg aspect-square">
            <img
                src={sliderImages[0].thumbnail}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-[1.04]"
            />
            <ProductIcons product={product} />
        </div>
    )

    return (
        <div className="relative overflow-hidden rounded-lg">
            <div ref={sliderRef} className="keen-slider w-full h-full">
                {sliderImages.map((image, index) => (
                    <div key={index} className="keen-slider__slide w-full h-full aspect-square flex items-center justify-center">
                        <img
                            src={image.thumbnail}
                            alt={`${title}-${index}`}
                            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-[1.04]"
                        />
                    </div>
                ))}
            </div>

            <ProductIcons product={product} />
            <SliderArrow direction="left" isVisible={isHovered} onArrowClick={() => instanceRef.current?.prev()} />
            <SliderArrow direction="right" isVisible={isHovered} onArrowClick={() => instanceRef.current?.next()} />
            <SliderDots
                imagesLength={sliderImages.length}
                isVisible={isHovered}
                onDotClick={(index) => instanceRef.current?.moveToIdx(index)}
                currentIndex={currentIndex}
            />
        </div>
    )
}

function ProductIcons({ product }: { product: IHomePageProduct }) {
    const { discountRuleset, gatedRuleset } = product

    return (
        <div className="absolute top-2 left-2 flex items-center gap-2">
            {discountRuleset && <IconContainer><PLPIcons.Discount /></IconContainer>}
            {gatedRuleset && <IconContainer><PLPIcons.Gated /></IconContainer>}
        </div>
    )
}