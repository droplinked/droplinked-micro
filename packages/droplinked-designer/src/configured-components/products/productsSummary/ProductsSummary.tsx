import AppContainer from 'components/legacy-components/container/AppContainer'
import ProductImageSlider from '../../../components/products/ProductImageSlider'
import ProductPrice from '../../../components/products/ProductPrice'
import ProductTitle from '../../../components/products/ProductTitle'
import Text from 'components/ui/Text'
import ProductsSummaryLayout from 'components/products/ProductSummaryLayout'

const mockProducts = [
    {
        id: 1,
        image: "https://upload-file-droplinked.s3.amazonaws.com/0ed05f030f8b156daea6d727ac028ce3a95a3edd87526683d7847c68501b2093_or.png",
        title: "Wireless Headphones",
        price: "$59.99",
        abbreviation: "USD"
    },
    {
        id: 2,
        image: "https://upload-file-droplinked.s3.amazonaws.com/5d1f101c24c897d244560ef8ba22723f92676e4120586d50816f38a175494adf_or.webp",
        title: "Smart Fitness Watch",
        price: "$129.00",
        abbreviation: "USD"
    },
    {
        id: 3,
        image: "https://upload-file-droplinked.s3.amazonaws.com/87a2cf04f523242e9237ccec4897948f8b9739d2ebcdbf0827c9494d66e5c6ac_or.png",
        title: "Portable Speaker",
        price: "$39.95",
        abbreviation: "USD"
    },
    {
        id: 4,
        image: "https://upload-file-droplinked.s3.amazonaws.com/bf513688b9567cbfc060b3d43d1b33c3fa15aeaf952863482748c88fef9ceb59_or.jpeg",
        title: "Eco-Friendly Water Bottle",
        price: "$24.50",
        abbreviation: "USD"
    },
    {
        id: 5,
        image: "https://upload-file-droplinked.s3.amazonaws.com/0ed05f030f8b156daea6d727ac028ce3a95a3edd87526683d7847c68501b2093_or.png",
        title: "Wireless Headphones",
        price: "$59.99",
        abbreviation: "USD"
    },
    {
        id: 6,
        image: "https://upload-file-droplinked.s3.amazonaws.com/5d1f101c24c897d244560ef8ba22723f92676e4120586d50816f38a175494adf_or.webp",
        title: "Smart Fitness Watch",
        price: "$129.00",
        abbreviation: "USD"
    }
]

export default function ProductsSummary({ title }: { title?: string }) {
    return (
        <AppContainer props={{ margin: "auto", paddingBlock: { base: 6, md: "48px" }, flexDirection: "column", gap: 6 }}>
            <Text className='text-xl font-bold'>{title}</Text>
            <ProductsSummaryLayout>
                {mockProducts.map(product => (
                    <div className="w-full h-full flex flex-col select-none group">
                        <div key={product.id} className="flex flex-col group">
                            <ProductImageSlider image={product.image} />
                            <ProductTitle title={product.title} className='mt-3' />
                            <ProductPrice abbreviation={product.abbreviation} price={product.price} className='mt-2' />
                        </div>
                    </div>
                ))}
            </ProductsSummaryLayout>
        </AppContainer>
    )
}
