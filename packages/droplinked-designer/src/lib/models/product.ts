export interface IProduct {
    _id: string;
    ownerID: string;
    title: string;
    description: string;
    type: string;
    product_type: string;
    artwork: string;
    artwork_position: string;
    m2m_positions_options: any[];
    m2m_positions: any[];
    m2m_services: any[];
    pod_blank_product_id: string;
    publish_status: string;
    productCollectionID: IProductCollection;
    skuIDs: ISKU[];
    skus: any;
    media: IMedia[];
    priceUnit: string;
    slug?: string;
    shippingType: string;
    shippingPrice: number;
    thumb: string;
    purchaseAvailable: boolean;
}

export interface IProductCollection {
    _id: string;
    title: string;
    ownerID: string;
    nftImages: any[];
    type: string;
    published: boolean;
    __v: number;
    ruleSetID: IRuleSetID;
}

export interface IRuleSetID {
    collectionID: string;
    createdAt: string;
    type: "DISCOUNT" | "GATING";
    ownerID: string;
    _id: string;
    blockchainType: string;
    description: string;
    discountPercentage: number;
    minimumNftRequired: number;
    network: string;
    nftContractAddresses: string[];
    nftPurchaseLink: string;
}
export interface ISKU {
    _id: string;
    ownerID: string;
    recordData: IRecordData;
    price: number;
    rawPrice: number;
    quantity: number;
    weight: number;
    sold_units: number;
    externalID: string;
    options: ISKUOption[];
    dimensions: any;
    vas: IValueAddedService[];
    royalty: number;
    partialOwners: IPartialOwner[];
    __v: number;
    commision: number;
}

export interface IRecordData {
    status: string;
    recordNetwork: string;
    currency: string;
    commision: number;
}

export interface ISKUOption {
    variantName: any;
    variantID: string;
    value: string;
    caption: string;
    _id: string;
}

export interface IValueAddedService {
    name: string;
    costType: string;
    value: number;
    type: string;
    receiver: string;
}

export interface IPartialOwner {
    user: string;
    quantity: number;
}

export interface IMedia {
    url: string;
    isMain: string;
    thumbnail: string;
    _id: string;
}
