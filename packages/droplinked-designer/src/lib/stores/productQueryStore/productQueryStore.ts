import { create } from 'zustand'

export interface ProductQuery {
    search: string
    sort: string
    order?: number
    productType: string[]
    collectionId: string[]
    minPrice?: number
    maxPrice?: number
}
type ViewMode = 'grid' | 'list'

interface ProductQueryStore {
    stagedProductQuery: ProductQuery   // Filters that are staged (for mobile)
    appliedProductQuery: ProductQuery  // Filters that are applied (for desktop or when confirmed on mobile)
    viewMode: ViewMode
    setStagedProductQuery: <K extends keyof ProductQuery>(key: K, value: ProductQuery[K]) => void
    applyStagedFilters: () => void     // Function to apply staged filters
    resetProductQuery: () => void
    setViewMode: (viewModel: ViewMode) => void
}

const initialProductQuery: ProductQuery = {
    search: "",
    sort: "",
    productType: [],
    collectionId: []
}

const useProductQueryStore = create<ProductQueryStore>((set) => ({
    stagedProductQuery: initialProductQuery,
    appliedProductQuery: initialProductQuery,
    viewMode: "grid",

    setStagedProductQuery: (key, value) => set((state) => ({
        stagedProductQuery: { ...state.stagedProductQuery, [key]: value }
    })),

    applyStagedFilters: () => set((state) => ({
        appliedProductQuery: { ...state.stagedProductQuery }
    })),

    resetProductQuery: () => set(() => ({
        stagedProductQuery: initialProductQuery,
        appliedProductQuery: initialProductQuery
    })),

    setViewMode: (viewMode) => set(() => ({ viewMode }))

}))

export default useProductQueryStore