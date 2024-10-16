import { AxiosInstance } from 'axios';
import { ChainWallet } from '../chains';
import {
  AffiliateRequestData,
  DeployedShop,
  EthAddress,
  RecordResponse,
  Uint256,
} from '../constants/chain-structs';
import { IChainPayment } from './chain-payment.interface';
import { IProductDetails, ISKUDetails } from './record-web3-product.interface';
import { ModalInterface } from './modal-interface.interface';
import { RecordProduct } from '../record.dto';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IChainProvider {
  setAxiosInstance(axiosInstance: AxiosInstance): IChainProvider;
  walletLogin(): Promise<any>;
  deployShop(
    shopName: string,
    shopAddress: string,
    shopOwner: EthAddress,
    shopLogo: string,
    shopDescription: string
  ): Promise<DeployedShop>;
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
    data: IChainPayment
  ): Promise<{ deploy_hash: string; cryptoAmount: any }>;
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
