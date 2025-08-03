import { IRuleSetID, IMedia as Media } from "lib/models/product";
import { ProductQuery } from "lib/stores/productQueryStore/productQueryStore";

export interface IGetProductsRequest extends ProductQuery {
  page: number;
  shopName: string;
  limit: number;
}

export interface IHomePageProduct {
  _id: string;
  title: string;
  slug: string;
  skuIDs: { options: IOption[] }[];
  media: Media[];
  lowestSkuPrice: number;
  gatedRuleset: boolean;
  discountRuleset: boolean;
}

export interface IgetProductPublicService {
  shopname: string;
  productID: string;
}

export interface IGetProductBySlugService {
  shopname: string;
  slug: string;
}

export interface IGetProductByLinkId {
  linkId: string;
}

// Interface for media objects in the product's media array
interface IMedia {
  isMain: boolean; // Indicates whether this media is the main image
  thumbnail: string; // URL of the thumbnail image
  url: string; // URL of the main image
  _id: string; // Unique identifier for the media object
}

// Interface for the product collection object
interface IProductCollection {
  title: string; // Title of the product collection
  ruleSetID?: IRuleSetID
}

// Interface for the optional ruleset object (not required)
interface IRuleSet {
  gated?: boolean; // Optional gated flag
  redeemedNFTs?: any; // Optional redeemed NFTs field
  rules?: any; // Optional rules field
}

// Interface for option objects inside each SKU
export interface IOption {
  variantName: string; // Name of the variant (e.g., color, size)
  value: string; // Value of the variant (e.g., red, large)
  caption: string; // Caption for the option (additional description)
}

// Interface for SKU objects in the skuIDs array
export interface ISku {
  _id: string; // Unique identifier for the SKU
  price: number; // Price of the SKU
  quantity: number; // Quantity available for the SKU
  image?: string; // Optional image URL for the SKU
  weight: number; // Weight of the SKU

  dimensions: { // Dimensions of the SKU
    height: number;
    length: number;
    width: number;
  };

  options?: IOption[]; // Optional options array (for NON-DIGITAL products)
}

// Main interface for the product object
export interface IProduct {
  // Ensured this is exported
  description: string; // Mandatory description of the product
  media: IMedia[]; // Mandatory media array containing images and videos
  productCollectionID: IProductCollection; // Object containing the product collection details
  ruleSet?: IRuleSet; // Optional ruleSet object (could be undefined)
  slug: string | null; // Mandatory slug (URL-friendly identifier for the product)
  title: string; // Mandatory title of the product
  _id: string | null; // Mandatory unique identifier for the product
  ownerID: string | null; // Mandatory unique identifier for the owner of the product
  product_type: "NORMAL" | "PRINT_ON_DEMAND" | "DIGITAL"; // Type of the product (one of three types)
  skuIDs: ISku[]; // Mandatory SKU array, must contain at least one SKU
  launchDate?: string;
  purchaseAvailable: boolean;
  pod_blank_product_id: string;
  // Optional nftData object containing blockchain-related information
  nftData?: INftData;
  m2m_positions: IM2MPosition[];
  m2m_services: IM2MService[];
  shippingType: string;
}
export interface IM2MPosition {
  placement: string
  variantIDs: number[]
  url: string
}
export interface IM2MService {
  _id: string;
  name: string;
  chain: string;
}

export interface INftData {
  deployHash: string;
  transactionUrl: string;
  networkName: string;
}
export interface IShippingAvailbilityData {
  statusCode: number;
  message: string | null;
  data: string[];
}
// Function to convert raw product data into the IProduct model
export const convertProductDataToModel = (data: any): IProduct => {
  try {
    // Default SKU in case the SKU data is missing or incomplete
    const defaultSku: ISku = {
      price: 0,
      quantity: 0,
      _id: "unknown_sku_id",
      weight: 0,
      dimensions: {
        height: 0,
        length: 0,
        width: 0,
      },
    };


    // Default option for SKUs in NON-DIGITAL products
    const defaultOption: IOption = {
      variantName: "default_variant",
      value: "default_value",
      caption: " ",
    };

    // Default media object in case media array is missing or incomplete
    const defaultMedia: IMedia = {
      isMain: false,
      thumbnail: "default_thumbnail.jpg",
      url: "default_url.jpg",
      _id: "default_media_id",
    };

    // Construct the product object, falling back to default values when necessary
    const product: IProduct = {
      description: data?.description || "No description available",
      media:
        Array.isArray(data?.media) && data?.media.length > 0
          ? data.media.map((mediaItem: any) => ({
            isMain:
              mediaItem?.isMain === "true" || mediaItem?.isMain === true,
            thumbnail: mediaItem?.thumbnail || "",
            url: mediaItem?.url || "",
            _id: mediaItem?._id || "",
          }))
          : [defaultMedia],

      productCollectionID: {
        title: data?.productCollectionID?.title || "",
        ruleSetID: {
          collectionID: data?.productCollectionID?.ruleSetID?.collectionID || "",
          createdAt: data?.productCollectionID?.ruleSetID?.createdAt || "",
          type: data?.productCollectionID?.ruleSetID?.type || "",
          ownerID: data?.productCollectionID?.ruleSetID?.ownerID || "",
          _id: data?.productCollectionID?.ruleSetID?._id || "",
          blockchainType: data?.productCollectionID?.ruleSetID?.blockchainType || "",
          description: data?.productCollectionID?.ruleSetID?.description || "",
          discountPercentage: data?.productCollectionID?.ruleSetID?.discountPercentage || "",
          minimumNftRequired: data?.productCollectionID?.ruleSetID?.minimumNftRequired || "",
          network: data?.productCollectionID?.ruleSetID?.network || "",
          nftContractAddresses: data?.productCollectionID?.ruleSetID?.nftContractAddresses || "",
          nftPurchaseLink: data?.productCollectionID?.ruleSetID?.nftPurchaseLink || "",
        }
      },
      purchaseAvailable: data.purchaseAvailable,
      slug: data?.slug || null,
      title: data?.title || "",
      _id: data?._id || null,
      ownerID: data?.ownerID || null,
      product_type: data?.product_type || "NORMAL",
      launchDate: data?.launchDate,
      pod_blank_product_id: data.pod_blank_product_id,
      shippingType: data.shippingType,
      skuIDs:
        Array.isArray(data?.skuIDs) && data?.skuIDs.length > 0
          ? data.skuIDs.map((sku: any) => ({
            price: typeof sku?.price === "number" ? sku.price : 0,
            quantity: typeof sku?.quantity === "number" ? sku.quantity : 0,
            _id: sku?._id || "unknown_sku_id",
            options:
              data?.product_type !== "DIGITAL" &&
                Array.isArray(sku?.options) &&
                sku.options.length > 0
                ? sku.options.map((option: any) => ({
                  variantName: option?.variantName || "default_variant",
                  value: option?.value || "default_value",
                  caption: option?.caption || " ",
                }))
                : undefined,
            image: sku.image,
            weight: sku.weight,
            dimensions: {
              height: sku.dimensions.height,
              length: sku.dimensions.length,
              width: sku.dimensions.width,
            },
          }))
          : [defaultSku],

      // Adding nftData
      nftData: data?.nftData
        ? {
          deployHash: data.nftData.deployHash,
          transactionUrl: data.nftData.transactionUrl,
          networkName: data.nftData.networkName,
        }
        : undefined,


      m2m_positions:
        Array.isArray(data?.m2m_positions) && data?.m2m_positions.length > 0
          ? data.m2m_positions.map((position: any) => ({
            placement: position.placement || "",
            variantIDs: position.variant_ids || "",
            url: position.url || ""
          }))
          : [],

      m2m_services:
        Array.isArray(data?.m2m_services) && data?.m2m_services.length > 0
          ? data.m2m_services.map((service: any) => ({
            _id: service?._id || "",
            name: service?.name || "Unnamed Service",
            chain: service?.chain || "Unknown Chain",
          }))
          : [],
    };

    return product;
  } catch (error) {
    console.error("Error converting product data:", error);

    // If an error occurs, return a product object with default values
    return {
      description: "No description available",
      purchaseAvailable: data?.purchaseAvailable,
      media: [
        {
          isMain: false,
          thumbnail: "default_thumbnail.jpg",
          url: "default_url.jpg",
          _id: "default_media_id",
        },
      ],
      productCollectionID: { title: "Default Collection" },
      slug: null,
      title: "",
      _id: null,
      ownerID: null,
      product_type: "NORMAL",
      pod_blank_product_id: "",
      skuIDs: [
        {
          price: 0,
          quantity: 0,
          _id: "unknown_sku_id",
          weight: 0,
          dimensions: {
            height: 0,
            length: 0,
            width: 0,
          },
        },
      ],
      nftData: undefined,
      m2m_positions: [],
      m2m_services: [],
      shippingType: ""
    };
  }
};

export interface ISemanticSearchParams {
  query: string;
  limit?: number;
}

export interface NftImagesData {
  nfts: string[];
  domains: string[];
}

