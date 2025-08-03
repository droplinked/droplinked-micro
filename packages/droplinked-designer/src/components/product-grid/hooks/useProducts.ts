import { useInfiniteQuery } from 'react-query'

const staticProducts = {
    data: {
        products: [
            {
                _id: "1",
                title: "Wireless Headphones",
                slug: "wireless-headphones",
                skuIDs: [],
                media: [
                    {
                        url: "https://upload-file-droplinked.s3.amazonaws.com/0ed05f030f8b156daea6d727ac028ce3a95a3edd87526683d7847c68501b2093_or.png",
                        thumbnail: "https://upload-file-droplinked.s3.amazonaws.com/0ed05f030f8b156daea6d727ac028ce3a95a3edd87526683d7847c68501b2093_or.png",
                        isMain: "true",
                        _id: "media-1-1"
                    }
                ],
                lowestSkuPrice: 59.99,
                gatedRuleset: false,
                discountRuleset: false
            },
            {
                _id: "2",
                title: "Smart Fitness Watch",
                slug: "smart-fitness-watch",
                skuIDs: [],
                media: [
                    {
                        url: "https://upload-file-droplinked.s3.amazonaws.com/5d1f101c24c897d244560ef8ba22723f92676e4120586d50816f38a175494adf_or.webp",
                        thumbnail: "https://upload-file-droplinked.s3.amazonaws.com/5d1f101c24c897d244560ef8ba22723f92676e4120586d50816f38a175494adf_or.webp",
                        isMain: "true",
                        _id: "media-2-1"
                    }
                ],
                lowestSkuPrice: 129.00,
                gatedRuleset: false,
                discountRuleset: false
            },
            {
                _id: "3",
                title: "Portable Speaker",
                slug: "portable-speaker",
                skuIDs: [],
                media: [
                    {
                        url: "https://upload-file-droplinked.s3.amazonaws.com/87a2cf04f523242e9237ccec4897948f8b9739d2ebcdbf0827c9494d66e5c6ac_or.png",
                        thumbnail: "https://upload-file-droplinked.s3.amazonaws.com/87a2cf04f523242e9237ccec4897948f8b9739d2ebcdbf0827c9494d66e5c6ac_or.png",
                        isMain: "true",
                        _id: "media-3-1"
                    }
                ],
                lowestSkuPrice: 39.95,
                gatedRuleset: false,
                discountRuleset: false
            },
            {
                _id: "4",
                title: "Eco-Friendly Water Bottle",
                slug: "eco-friendly-water-bottle",
                skuIDs: [],
                media: [
                    {
                        url: "https://upload-file-droplinked.s3.amazonaws.com/bf513688b9567cbfc060b3d43d1b33c3fa15aeaf952863482748c88fef9ceb59_or.jpeg",
                        thumbnail: "https://upload-file-droplinked.s3.amazonaws.com/bf513688b9567cbfc060b3d43d1b33c3fa15aeaf952863482748c88fef9ceb59_or.jpeg",
                        isMain: "true",
                        _id: "media-4-1"
                    }
                ],
                lowestSkuPrice: 24.50,
                gatedRuleset: false,
                discountRuleset: false
            }
        ],
        nextPage: null
    }
}

export default function useProducts() {
    return useInfiniteQuery({
        queryKey: ["PRODUCTS", "static"],
        queryFn: ({ pageParam = 1 }) => Promise.resolve(staticProducts),
        getNextPageParam: (lastPage) => lastPage.data.nextPage,
        refetchOnWindowFocus: false
    })
}