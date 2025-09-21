/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import ky, { KyInstance } from 'ky';
import UAuth from '@uauth/js';
import {
  IDeployShop,
  DeployShopResponse,
  IProductDetails,
  ISKUDetails,
  RecordResponse,
  Uint256,
  EthAddress,
  AffiliateRequestData,
  ModalInterface,
  WalletNotFoundException,
  defaultModal,
  toEthAddress,
  ClaimNFTInputs,
  IChainPayment,
} from '../../../web3';
import { ChainWallet, Network } from '../../dto/chains';
import { IChainProvider } from '../../dto/interfaces/chain-provider.interface';
import { ILoginResult } from '../../dto/interfaces/login-result.interface';
import { IPaymentInputs } from '../../dto/interfaces/payment-interface';
import { ITokenDetails } from '../../dto/interfaces/airdrop-token.interface';

export class UnstoppableProvider implements IChainProvider {
  axiosInstance: KyInstance;
  network: Network;
  address: string;
  modalInterface: ModalInterface = new defaultModal();
  wallet: ChainWallet = ChainWallet.Phantom;
  nftContractAddress?: EthAddress;
  shopContractAddress?: EthAddress;
  clientID: string;
  redirectUri: string;


  constructor(network: Network) {
    this.network = network;
    this.axiosInstance = ky.create({
      prefixUrl:
        this.network === Network.MAINNET
          ? 'https://apiv3.droplinked.com'
          : 'https://apiv3dev.droplinked.com',
    });
    this.address = '';
    this.clientID = '';
    this.redirectUri = '';
  }

  executeAirdrop(airdropId: string): Promise<{ transactionHashes: string[] }> {
    throw new Error('Method not implemented.');
  }
  customPayment(
    data: IChainPayment
  ): Promise<{ transactionHash: string; cryptoAmount: any }> {
    throw new Error('Method not implemented.');
  }

  setClientID(clientID: string, redirectUri: string) {
    this.clientID = clientID;
    this.redirectUri = redirectUri;
  }

  claimNFTs(data: ClaimNFTInputs): Promise<string> {
    throw new Error('Method not implemented.');
  }

  setAxiosInstance(axiosInstance: KyInstance): IChainProvider {
    this.axiosInstance = axiosInstance;
    return this;
  }

  async unstoppableLogin(clientID: string, redirectUri: string): Promise<any> {
    this.clientID = clientID;
    this.redirectUri = redirectUri;
    if (this.clientID === '' || this.redirectUri === '') {
      throw new WalletNotFoundException();
    }
    const uauth = new UAuth({
      clientID: this.clientID,
      redirectUri: this.redirectUri,
    });
    try {
      const authorization = await uauth.loginWithPopup();
      return authorization;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async walletLogin(): Promise<ILoginResult> {
    throw new Error('Method not implemented.');
  }
  deployShop(shopDetails: IDeployShop): Promise<DeployShopResponse> {
    throw new Error('Method not implemented.');
  }
  recordProduct(
    productData: IProductDetails,
    skuData: ISKUDetails[]
  ): Promise<RecordResponse> {
    throw new Error('Method not implemented.');
  }
  publishRequest(
    productId: Uint256,
    shopAddress: EthAddress
  ): Promise<AffiliateRequestData> {
    throw new Error('Method not implemented.');
  }
  approveRequest(requestId: Uint256, shopAddress: EthAddress): Promise<string> {
    throw new Error('Method not implemented.');
  }
  disapproveRequest(
    requestId: Uint256,
    shopAddress: EthAddress
  ): Promise<string> {
    throw new Error('Method not implemented.');
  }
  async payment(
    data: IPaymentInputs
  ): Promise<{ transactionHash: string; cryptoAmount: any; orderID: string }> {
    throw new Error('Method not implemented.');
  }
  async paymentWithToken(
    receiver: string,
    amount: number,
    tokenAddress: string
  ): Promise<string> {
    throw new Error('Method not implemented.');
  }
  setAddress(address: EthAddress): IChainProvider {
    this.address = address;
    return this;
  }
  setWallet(wallet: ChainWallet): IChainProvider {
    this.wallet = wallet;
    return this;
  }
  setModal(modal: ModalInterface): IChainProvider {
    this.modalInterface = modal;
    return this;
  }
  setNFTContractAddress(address: string): IChainProvider {
    this.nftContractAddress = toEthAddress(address);
    return this;
  }
  setShopContractAddress(address: string): IChainProvider {
    this.shopContractAddress = toEthAddress(address);
    return this;
  }
  getPaymentData(cartID: string, paymentType: string, token: string) {
    throw new Error('Method not implemented.');
  }
}
