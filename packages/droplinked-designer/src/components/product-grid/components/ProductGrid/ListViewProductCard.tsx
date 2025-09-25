import PLPIcons from "assets/icons/PLP/PLPIcons"
import { Skeleton } from "components/ui/skeleton"
import ProductTitle from "./ProductTitle"
import { IHomePageProduct } from "components/product-grid/interface/interface"
import useThemeInfo from "hooks/useThemeInfo"
import ProductPrice from "components/products/ProductPrice"

export default function ListViewProductCard({ product }: { product: IHomePageProduct }) {
    const { media, title, lowestSkuPrice, discountRuleset, gatedRuleset, slug, _id } = product
    const { isDarkTheme } = useThemeInfo()
    const iconClass = isDarkTheme ? "[&_path]:stroke-white" : ""
    const imageURL = (media.find(m => m.isMain === "true") ?? media[0]).thumbnail

    return (
        <ProductCardBase
            image={<img src={imageURL} alt={title} className="w-[70px] h-[70px] object-cover rounded-lg shrink-0" />}
            title={<ProductTitle title={title} />}
            price={<ProductPrice abbreviation="USD" price={`$${lowestSkuPrice}`} />}
            icons={
                <>
                    {discountRuleset && <PLPIcons.Discount className={iconClass} />}
                    {gatedRuleset && <PLPIcons.Gated className={iconClass} />}
                </>
            }
        />
    )
}

export function ListViewProductCardSkeleton() {
    const { isDarkTheme } = useThemeInfo()
    const skeletonBackground = isDarkTheme ? 'bg-gray-700' : 'bg-gray-300'

    return (
        <>
            {Array.from({ length: 6 }).map((_, index) => (
                <ProductCardBase
                    key={index}
                    image={<Skeleton className={`w-[70px] h-[70px] rounded-lg shrink-0 ${skeletonBackground}`} />}
                    title={<Skeleton className={`h-10 w-1/2 ${skeletonBackground}`} />}
                    price={<Skeleton className={`h-6 w-1/4 ${skeletonBackground}`} />}
                    icons={
                        <>
                            <Skeleton className={`w-5 h-5 rounded-full ${skeletonBackground}`} />
                            <Skeleton className={`w-5 h-5 rounded-full ${skeletonBackground}`} />
                        </>
                    }
                />
            ))}
        </>
    )
}

function ProductCardBase({ image, title, price, icons }: { image: React.ReactNode, title: React.ReactNode, price: React.ReactNode, icons: React.ReactNode }) {
    return (
        <div className="flex items-start gap-4">
            {/* Product Image */}
            {image}

            {/* Product Details */}
            <div className="flex-1 flex flex-col gap-[6px]">
                {title}

                <div className="flex justify-between items-center gap-4">
                    {price}

                    {/* Icons */}
                    <div className="flex items-center gap-2">
                        {icons}
                    </div>
                </div>
            </div>
        </div>
    )
}