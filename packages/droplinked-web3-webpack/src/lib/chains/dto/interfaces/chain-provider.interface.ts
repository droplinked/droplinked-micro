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
import { IDeployShop } from './deploy-shop.interface';
import { ILoginResult } from './login-result.interface';
import { IPaymentInputs } from './payment-interface';
import { KyInstance } from 'ky';
import { ClaimNFTInputs } from './claim-nft-inputs';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IChainProvider {
  setAxiosInstance(axiosInstance: KyInstance): IChainProvider;
  walletLogin(): Promise<ILoginResult>;
  unstoppableLogin(clientID: string, redirectUri: string): Promise<any>;
  deployShop(shopDetails: IDeployShop): Promise<DeployShopResponse>;
  recordProduct(
    productData: IProductDetails,
    skuData: ISKUDetails[]
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
    data: IPaymentInputs
  ): Promise<{ transactionHash: string; cryptoAmount: any; orderID: string }>;
  paymentWithToken(
    receiver: string,
    amount: number,
    tokenAddress: string
  ): Promise<string>;
  claimNFTs(data: ClaimNFTInputs): Promise<string>;
  setAddress(address: EthAddress): IChainProvider;
  setWallet(wallet: ChainWallet): IChainProvider;
  setModal(modal: ModalInterface): IChainProvider;
  setNFTContractAddress(address: string): IChainProvider;
  setShopContractAddress(address: string): IChainProvider;
  getPaymentData(cartID: string, paymentType: string, token: string): any;
}
