import {
  Beneficiary,
  EthAddress,
  ProductType,
} from '../constants/chain-structs';

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IProductDetails {
  skuProperties: any;
  productTitle: string;
  description: string;
  commission: number;
  type: ProductType;
  acceptsManageWallet: boolean;
  nftContract: EthAddress;
  shopAddress: EthAddress;
  currencyAddress: EthAddress;
  royalty: number;
}

export interface ISKUDetails {
  imageUrl: string;
  price: number;
  amount: number;
  beneficiaries: Beneficiary[];
  skuID: string;
}
