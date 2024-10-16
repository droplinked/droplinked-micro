import { Beneficiary, ProductType } from './constants/chain-structs';

export type RecordProduct = {
  sku_id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  skuProperties: any;
  productTitle: string;
  description: string;
  image_url: string;
  price: number;
  amount: number;
  commission: number;
  type: ProductType;
  beneficiaries: Beneficiary[];
  acceptsManageWallet: boolean;
  royalty: number;
  currencyAddress: string;
};
