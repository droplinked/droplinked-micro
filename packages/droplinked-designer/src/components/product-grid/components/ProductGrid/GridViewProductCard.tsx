import { Skeleton } from "components/ui/skeleton"
import { useState } from "react"
import ProductTitle from "./ProductTitle"
import ProductImageSlider from "./Slider/ProductImageSlider"
import { IHomePageProduct } from "components/product-grid/interface/interface"
import useThemeInfo from "hooks/useThemeInfo"
import ProductPrice from "components/products/ProductPrice"

interface Props {
    product: IHomePageProduct
}

export default function GridViewProductCard({ product }: Props) {
    const { title, lowestSkuPrice, _id, slug } = product
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="w-full h-full flex flex-col select-none group"
        >
            <ProductImageSlider product={product} isHovered={isHovered} />
            <ProductTitle title={title} className="mt-3" />
            <ProductPrice abbreviation="USD" price={`$${lowestSkuPrice}`} className="mt-2" />
        </div>
    )
}

export function GridViewProductCardSkeleton() {
    const { isDarkTheme } = useThemeInfo()
    const skeletonBackground = isDarkTheme ? 'bg-gray-700' : 'bg-gray-300'

    return (
        <>
            {Array.from({ length: 6 }).map((_, index) => (
                <div key={index}>
                    <Skeleton className={`rounded-lg aspect-square ${skeletonBackground}`} />
                    <Skeleton className={`h-10 md:h-12 mt-3 ${skeletonBackground}`} />
                    <Skeleton className={`h-6 mt-2 ${skeletonBackground}`} />
                </div>
            ))}
        </>
    )
}