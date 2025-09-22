import { ChainWallet } from '../chains';
import {
  DeployShopResponse,
  EthAddress,
  RecordResponse,
} from '../constants/chain-structs';
import { ModalInterface } from './modal-interface.interface';
import { IDeployShop } from './deploy-shop.interface';
import { ILoginResult } from './login-result.interface';
import { IPaymentInputs } from './payment-interface';
import { KyInstance } from 'ky';
import { ClaimNFTInputs } from './claim-nft-inputs';
import { IChainPayment } from './chain-payment.interface';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IChainProvider {
  setAxiosInstance(axiosInstance: KyInstance): IChainProvider;
  walletLogin(): Promise<ILoginResult>;
  unstoppableLogin(clientID: string, redirectUri: string): Promise<any>;
  deployShop(shopDetails: IDeployShop): Promise<DeployShopResponse>;
  recordProduct(
    productId: string
  ): Promise<RecordResponse>;
  payment(
    data: IPaymentInputs
  ): Promise<{ transactionHash: string; cryptoAmount: any; orderID: string }>;
  customPayment(data: IChainPayment): Promise<{
    transactionHash: string;
    cryptoAmount: any;
  }>;
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
  executeAirdrop(airdropId: string): Promise<{ transactionHashes: string[] }>;
}
