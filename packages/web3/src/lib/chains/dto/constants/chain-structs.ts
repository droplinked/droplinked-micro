// import { ethers } from 'ethers';

type Uint256 = bigint | string | number;

declare const BRAND: unique symbol;
type EthAddress = string & { [BRAND]: 'EthAddress' };

/**
 * Validates and brands a string as an EthAddress.
 * @param address The address string to validate and brand.
 * @returns The branded EthAddress.
 * @throws Error if the address is invalid.
 */
export function toEthAddress(address: string): EthAddress {
  // const isAddress = ethers.utils.isAddress;
  // if (address !== '' && (address.length !== 42 || !isAddress(address))) {
  //   throw new Error(`Invalid Ethereum address: ${address}`);
  // }
  return address as EthAddress;
}

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

type Product = {
  tokenId: Uint256;
  nftAddress: EthAddress;
  nftType: NFTType;
  productType: ProductType;
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

type DeployShopResponse = {
  deployedShopAddress: EthAddress;
  deployedNFTAddress: EthAddress;
  transactionHash: string;
};

export { NFTType, PaymentMethodType, ProductType };
export type {
  AffiliateRequest,
  DeployShopResponse,
  AffiliateRequestData,
  RecordResponse,
  EthAddress,
  Issuer,
  Product,
  PurchaseData,
  ShopInfo,
  Uint256,
};
