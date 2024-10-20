import { AxiosInstance } from 'axios';
import { ChainWallet } from '../chains';
import {
  AffiliateRequestData,
  DeployShopResponse,
  EthAddress,
  RecordResponse,
  Uint256,
} from '../constants/chain-structs';
import { IProductDetails, ISKUDetails } from './record-web3-product.interface';
import { ModalInterface } from './modal-interface.interface';
import { RecordProduct } from '../record.dto';
import { IDeployShop } from './deploy-shop.interface';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IChainProvider {
  setAxiosInstance(axiosInstance: AxiosInstance): IChainProvider;
  walletLogin(): Promise<any>;
  deployShop(shopDetails: IDeployShop): Promise<DeployShopResponse>;
  recordProduct(
    productData: IProductDetails,
    skuData: ISKUDetails
  ): Promise<RecordResponse>;
  recordBatch(
    products: RecordProduct[],
    shopAddress: string,
    nftContract: string
  ): Promise<RecordResponse>;
  publishRequest(
    productId: Uint256,
    shopAddress: EthAddress
  ): Promise<AffiliateRequestData>;
  approveRequest(requestId: Uint256, shopAddress: EthAddress): Promise<string>;
  disapproveRequest(
    requestId: Uint256,
    shopAddress: EthAddress
  ): Promise<string>;
  payment(
    cartID: string
  ): Promise<{ transactionHash: string; cryptoAmount: any }>;
  paymentWithToken(
    receiver: string,
    amount: number,
    tokenAddress: string
  ): Promise<string>;
  setAddress(address: EthAddress): IChainProvider;
  setWallet(wallet: ChainWallet): IChainProvider;
  setModal(modal: ModalInterface): IChainProvider;
  setNFTContractAddress(address: string): IChainProvider;
  setShopContractAddress(address: string): IChainProvider;
}
