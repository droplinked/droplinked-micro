import { ImsTypeEnum, IPaymentMethods, IShopDesign, IShopDesignPrev, IShopMedia, ITemplateOptions } from "lib/models/shop";

export interface ICartStoreItem {
    _id: string
    skuID: string
    groupId: string
    product: {
        _id: string;
        title: string
        image: string
        skuImage: string
        m2m_preview: string
        slug: string;
        type: string
        pre_purchase_data_fetch?: {
            active: boolean;
            title: string;
        }
        productCollectionID?: {
            _id: string;
            title: string;
            ownerID: string;
            shopId: string;
            nftImages: any[];
            type: string;
            image: string;
            description: string;
            published: boolean;
            createdAt: string;
            updatedAt: string;
            __v: number;
            order: number;
            ruleSetID?: string;
        }
    }
    options: {
        quantity: number
        size: {
            caption: string
            value: string
        },
        color: {
            caption: string
            value: string
        }
    },
    totals: {
        discountPercentage: number
        priceItem: number
        priceItemByDiscount: number
        subTotal: number
    }
}

export interface IShippingData {
    id: string;
    title: string;
    price: number;
    delivery_estimation: string;
    selected: boolean;
}

export interface Ishippings {
    groupId: string,
    type: string,
    data: IShippingData[]
}

export interface ICartStore {
    _id: string
    status: string
    shopID: string | any
    type: string
    email?: string
    items: Array<ICartStoreItem>
    note: string;
    shippings: Array<Ishippings> | []
    address?: any
    canApplyGiftCard: boolean
    totalCart: TotalCart
}

export interface TotalCart {
    subtotal: number,
    shipping: number,
    estimatedTaxes: number,
    giftCard: {
        type: string,
        amount: number
        percent?: number
    },
    totalPayment: number;
    productsAmount?: number;
    taxAmount?: number;
    shippingAmount?: number;
    totalAmount?: number;
    totalPaymentInLocalCurrency: string;
}

export interface ILoginWallet {
    name: string;
    chains: string[]
}

export interface ITokenBasedPricing {
    token: string;
    unit: number;
    tokenSign: string;
    hasTokenBasedPricing: boolean;
}
export interface IShopCurrency {
    abbreviation: string;
    symbol: string;
    conversionRateToUSD: number;
    decimalPlaces: number;
    thousandsSeparator: string;
    decimalSeparator: string;
    symbolPosition: 'before' | 'after';
    spaceBetweenAmountAndSymbol: boolean;
    locale: string;
}
export interface IShop {
    addressBookID: string | null;
    backgroundColor: string;
    backgroundImage: string;
    backgroundImageSecondary: string;
    backgroundText: string;
    description: string;
    discordURL: string | null;
    headerIcon: string;
    currency: IShopCurrency;
    isAgeRestricted?: boolean;
    isRestricted?: boolean;
    imsType: ImsTypeEnum;
    instagramURL: string | null;
    logo: string;
    name: string;
    ownerID: string;
    tiktokURL: string | null;
    linkedinURL: string | null;
    facebookURL: string | null;
    paymentMethods: IPaymentMethods[];
    productsTags: string | null;
    textColor: string;
    shopifyDomain: string | null;
    twitterURL: string | null;
    webURL: string | null;
    telegramURL: string | null;
    youtubeURL: string | null;
    messengerURL: string | null;
    infoEmail: string | null;
    socialMedias: IShopMedia[];
    shopDomain: string | undefined;
    productSectionText: string;
    _id: string;
    fullWidthHero: boolean;
    design: IShopDesignPrev;
    shopDesign: IShopDesign;
    template_options: ITemplateOptions;
    loginMethods: IWallet[]
    tokenBasedPricing: ITokenBasedPricing;
    launchDate: string | null;
    hasBlog: boolean;
}

export interface IWallet {
    name: string;
    isActivated: boolean;
    type: string;
}