type Uint256 = bigint | string | number;
type EthAddress = string;

type Beneficiary = {
  isPercentage: boolean;
  value: number;
  wallet: string;
};

enum NFTType {
  ERC1155,
  ERC721,
}

enum PaymentMethodType {
  NATIVE_TOKEN,
  USD,
  TOKEN,
}

enum ProductType {
  DIGITAL,
  POD,
  PHYSICAL,
}

type PaymentInfo = {
  price: Uint256;
  currencyAddress: EthAddress;
  beneficiaries: Uint256[];
  paymentType: PaymentMethodType;
};

type Product = {
  tokenId: Uint256;
  nftAddress: EthAddress;
  nftType: NFTType;
  productType: ProductType;
  paymentInfo: PaymentInfo;
  affiliatePercentage: Uint256;
};

type AffiliateRequest = {
  publisher: EthAddress;
  productId: Uint256;
  isConfirmed: boolean;
};

type ShopInfo = {
  shopName: string;
  shopAddress: string;
  shopLogo: string;
  shopDescription: string;
  shopOwner: EthAddress;
};

type Issuer = {
  issuer: EthAddress;
  royalty: Uint256;
};

type PurchaseData = {
  id: Uint256;
  amount: Uint256;
  isAffiliate: boolean;
  shopAddress: EthAddress;
};

type RecordResponse = {
  transactionHash: string;
  productId?: Uint256;
  amountRecorded?: Uint256;
};

type AffiliateRequestData =
  | { transactionHash: string; requestId: Uint256; publisher: EthAddress }
  | undefined;

type DeployedShop = {
  shop: EthAddress;
  nft: EthAddress;
  transactionHash: string;
};

export { NFTType, PaymentMethodType, ProductType };
export type {
  AffiliateRequest,
  DeployedShop,
  AffiliateRequestData,
  RecordResponse,
  Beneficiary,
  EthAddress,
  Issuer,
  PaymentInfo,
  Product,
  PurchaseData,
  ShopInfo,
  Uint256,
};
