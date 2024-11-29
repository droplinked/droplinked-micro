import {
  ProductType,
} from '../constants/chain-structs';

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IProductDetails {
  productTitle: string;
  description: string;
  commission: number;
  type: ProductType;
  acceptsManageWallet: boolean;
  royalty: number;
}

export interface ISKUDetails {
  skuProperties: any;
  imageUrl: string;
  amount: number;
  skuID: string;
}
