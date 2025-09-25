import { Button } from 'components/ui/button'
import useProductQueryStore from 'lib/stores/productQueryStore/productQueryStore'
import GridViewProductCard, { GridViewProductCardSkeleton } from './GridViewProductCard'
import ListViewProductCard, { ListViewProductCardSkeleton } from './ListViewProductCard'
import ProductGridLayout from './ProductGridLayout'
import { IHomePageProduct } from 'components/product-grid/interface/interface'
import useIsMobile from 'hooks/useIsMobile'
import useProducts from 'components/product-grid/hooks/useProducts'
import Text from 'components/ui/Text'

function ProductGrid() {
    const { isLoading, data, hasNextPage, fetchNextPage, isFetchingNextPage } = useProducts()
    // Adjusted for mocked useProducts: staticProducts = { data: { products: [...] } }
    const products: IHomePageProduct[] = data?.pages.flatMap(page => page?.data?.products || []) || []
    const viewMode = useProductQueryStore(s => s.viewMode)
    const isMobile = useIsMobile()

    const renderSkeletons = () => {
        return viewMode === 'list'
            ? <ListViewProductCardSkeleton />
            : <GridViewProductCardSkeleton />
    }

    if (isLoading) return (
        <ProductGridLayout>
            {renderSkeletons()}
        </ProductGridLayout>
    )

    if (products.length === 0) return (
        <ProductGridLayout>
            <Text as="p" className="col-span-full text-center">
                No products available. Please try again later.
            </Text>
        </ProductGridLayout>
    )

    return (
        <div>
            <ProductGridLayout>
                {products.map(product => (
                    isMobile && viewMode === 'list'
                        ? <ListViewProductCard key={product._id} product={product} />
                        : <GridViewProductCard key={product._id} product={product} />
                ))}

                {isFetchingNextPage && renderSkeletons()}
            </ProductGridLayout>

            {hasNextPage && (
                <div className="flex justify-center mt-14 lg:mt-20">
                    <Button variant="secondary" onClick={() => fetchNextPage()}>
                        Show More
                    </Button>
                </div>
            )}
        </div>
    )
}

export default ProductGrid