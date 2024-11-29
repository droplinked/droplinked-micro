/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from 'ethers';
import {
  AffiliateRequestData,
  DeployShopResponse,
  EthAddress,
  RecordResponse,
  toEthAddress,
  Uint256,
} from '../../dto/constants/chain-structs';
import { Chain, ChainWallet, getGasPrice, Network } from '../../dto/chains';
import {
  ModalInterface,
  defaultModal,
} from '../../dto/interfaces/modal-interface.interface';
import { EVMApproveRequest, EVMDisapproveRequest } from './evm-affiliate';
import { deployEVMShop } from './evm-deploy-shop';
import {
  evmLogin,
  isMetamaskInstalled,
  getAccounts,
  isWalletConnected,
  isChainCorrect,
  changeChain,
} from './evm-login';
import { EVMPublishRequest } from './evm-publish';
import { recordProduct } from './evm-record';
import { getERC20TokenTransferABI } from './evm-constants';
import { ZERO_ADDRESS } from '../../dto/constants/chain-constants';
import { DroplinkedChainConfig } from '../../dto/configs/chain.config';
import {
  IProductDetails,
  ISKUDetails,
} from '../../dto/interfaces/record-web3-product.interface';
import { WalletNotFoundException } from '../../dto/errors/chain-errors';
import { IWeb3Context } from '../../dto/interfaces/web3-context.interface';
import { IChainProvider } from '../../dto/interfaces/chain-provider.interface';
import { IDeployShop } from '../../dto/interfaces/deploy-shop.interface';
import { getCartData } from './evm.helpers';
import { IChainPayment } from '../../dto/interfaces/chain-payment.interface';
import { droplinked_payment } from './evm-payments';
import { ILoginResult } from '../../dto/interfaces/login-result.interface';
import { IPaymentInputs } from '../../dto/interfaces/payment-interface';
import ky, { KyInstance } from 'ky';
import { ClaimNFTInputs } from '../../dto/interfaces/claim-nft-inputs';
import { claimNFT } from './evm-claim-nfts';

export class EVMProvider implements IChainProvider {
  chain: Chain = Chain.BINANCE;
  network: Network = Network.TESTNET;
  address: EthAddress;
  modalInterface: ModalInterface = new defaultModal();
  wallet: ChainWallet = ChainWallet.Metamask;
  axiosInstance: KyInstance;
  nftContractAddress?: EthAddress;
  shopContractAddress?: EthAddress;
  gasPredictable: boolean;

  constructor(_chain: Chain, _network: Network, gasPredictable: boolean) {
    this.chain = _chain;
    this.network = _network;
    this.gasPredictable = gasPredictable;
    this.address = ZERO_ADDRESS;
    this.axiosInstance = ky.create({
      prefixUrl:
        this.network === Network.MAINNET
          ? 'https://apiv3.droplinked.com'
          : 'https://apiv3dev.droplinked.com',
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  unstoppableLogin(clientID: string, redirectUri: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  setAxiosInstance(axiosInstance: KyInstance) {
    this.axiosInstance = axiosInstance;
    return this;
  }

  setNFTContractAddress(address: string) {
    this.nftContractAddress = toEthAddress(address);
    return this;
  }

  setShopContractAddress(address: string) {
    this.shopContractAddress = toEthAddress(address);
    return this;
  }

  setWallet(wallet: ChainWallet) {
    this.wallet = wallet;
    return this;
  }

  setModal(modal: ModalInterface): IChainProvider {
    this.modalInterface = modal;
    return this;
  }

  async claimNFTs(data: ClaimNFTInputs): Promise<string> {
    await this.handleWallet(this.address);
    const result = await claimNFT(
      data,
      this.getChainConfig(),
      this.getContext()
    );
    return result.transactionHash;
  }

  getWalletProvider() {
    const ethereum = (window as any).ethereum;
    if (!ethereum) throw new WalletNotFoundException();
    // multiple wallet installed
    if (ethereum.providerMap) {
      if (this.wallet === ChainWallet.Metamask) {
        if (!ethereum.providerMap.get('MetaMask'))
          throw new WalletNotFoundException();
        return new ethers.providers.Web3Provider(
          ethereum.providers.find((x: any) => {
            return x.isMetaMask;
          })
        );
      } else if (this.wallet === ChainWallet.CoinBase) {
        if (!ethereum.providerMap.get('CoinbaseWallet'))
          throw new WalletNotFoundException();
        return new ethers.providers.Web3Provider(
          ethereum.providers.find((x: any) => {
            return x.isCoinbaseWallet;
          })
        );
      } else if (this.wallet === ChainWallet.Phantom) {
        if (!ethereum.providerMap.get('CoinbaseWallet'))
          throw new WalletNotFoundException();
        return new ethers.providers.Web3Provider(
          ethereum.providers.find((x: any) => {
            return x.isCoinbaseWallet;
          })
        );
      } else {
        throw new Error('Wallet not implemented');
      }
    } else {
      // single wallet installed
      if (this.wallet === ChainWallet.CoinBase) {
        if (!(window as any).ethereum.isCoinbaseWallet)
          throw new WalletNotFoundException();
      } else if (this.wallet === ChainWallet.Metamask) {
        if (!(window as any).ethereum.isMetaMask)
          throw new WalletNotFoundException();
      }
      return new ethers.providers.Web3Provider((window as any).ethereum);
    }
  }

  async deployShop(shopDetails: IDeployShop): Promise<DeployShopResponse> {
    await this.handleWallet(this.address);
    return await deployEVMShop(
      this.getChainConfig(),
      {
        axiosInstance: this.axiosInstance,
        modalInterface: this.modalInterface,
      },
      shopDetails
    );
  }

  setAddress(address: string): IChainProvider {
    this.address = toEthAddress(address);
    return this;
  }

  async handleWallet(_address: string) {
    if (!isMetamaskInstalled()) {
      this.modalInterface.error('Metamask is not installed');
      throw new WalletNotFoundException();
    }
    this.modalInterface.waiting('Getting accounts...');
    const provider = this.getWalletProvider();
    const ethereum = provider.provider as any;
    const accounts = await getAccounts(ethereum);
    if (!isWalletConnected(ethereum) || accounts.length === 0) {
      this.modalInterface.waiting('Please connect your wallet');
      const { address } = await this.walletLogin();
      if (_address.toLocaleLowerCase() !== address.toLocaleLowerCase()) {
        await (window as any).ethereum.request({
          method: 'wallet_requestPermissions',
          params: [
            {
              eth_accounts: {},
            },
          ],
        });
        await this.handleWallet(_address);
      }
    }
    if (!(await isChainCorrect(ethereum, this.chain, this.network))) {
      this.modalInterface.waiting('Changing chain...');
      await changeChain(ethereum, this.chain, this.network);
    }
    if (
      String(accounts[0]).toLocaleLowerCase() !== _address.toLocaleLowerCase()
    ) {
      this.modalInterface.waiting(
        'Change your account based on the one you used to login...'
      );
      await (window as any).ethereum.request({
        method: 'wallet_requestPermissions',
        params: [
          {
            eth_accounts: {},
          },
        ],
      });
      this.handleWallet(_address);
    }
    if (this.chain === Chain.SKALE) {
      const distributionRequest = await ((
        await this.axiosInstance.post(`shop/sFuelDistribution`, {
          json: {
            wallet: this.address,
            isTestnet: this.network === Network.TESTNET,
          },
        })
      ).json() as any);
      console.log(distributionRequest);
    }

    this.modalInterface.success('Wallet connected');
  }

  getChainConfig(): DroplinkedChainConfig {
    return {
      address: this.address,
      chain: this.chain,
      network: this.network,
      provider: this.getWalletProvider(),
      gasPredictable: this.gasPredictable,
    };
  }

  getContext(): IWeb3Context {
    return {
      axiosInstance: this.axiosInstance,
      modalInterface: this.modalInterface,
      nftContract: this.nftContractAddress,
      shopContractAddress: this.shopContractAddress,
    };
  }

  async walletLogin(): Promise<ILoginResult> {
    const { address, signature, date, nonce } = await evmLogin(
      this.getWalletProvider(),
      this.chain,
      this.network,
      this.modalInterface,
      this.axiosInstance
    );
    this.address = toEthAddress(address);
    return { address, signature, date, nonce };
  }

  checkDeployment() {
    if (!this.nftContractAddress)
      throw new Error('NFT contract address not set');
    if (!this.shopContractAddress)
      throw new Error('Shop contract address not set');
  }

  async recordProduct(
    productData: IProductDetails,
    skuData: ISKUDetails[]
  ): Promise<RecordResponse> {
    this.checkDeployment();
    await this.handleWallet(this.address);
    return await recordProduct(
      this.getChainConfig(),
      this.getContext(),
      productData,
      skuData
    );
  }

  async publishRequest(
    productId: Uint256,
    shopAddress: EthAddress
  ): Promise<AffiliateRequestData> {
    await this.handleWallet(this.address);
    return await EVMPublishRequest({
      provider: this.getWalletProvider(),
      chain: this.chain,
      address: this.address,
      productId,
      shopAddress,
      modalInterface: this.modalInterface,
    });
  }
  async approveRequest(
    requestId: Uint256,
    shopAddress: EthAddress
  ): Promise<string> {
    this.checkDeployment();
    await this.handleWallet(this.address);
    return await EVMApproveRequest(
      this.getWalletProvider(),
      this.chain,
      this.address,
      requestId,
      shopAddress,
      this.modalInterface
    );
  }
  async disapproveRequest(
    requestId: Uint256,
    shopAddress: EthAddress
  ): Promise<string> {
    this.checkDeployment();
    await this.handleWallet(this.address);
    return await EVMDisapproveRequest(
      this.getWalletProvider(),
      this.chain,
      this.address,
      requestId,
      shopAddress,
      this.modalInterface
    );
  }
  async payment(
    data: IPaymentInputs
  ): Promise<{ transactionHash: string; cryptoAmount: any; orderID: string }> {
    await this.handleWallet(this.address);
    const { cartID, paymentToken, paymentType } = data;
    const paymentDetails = await getCartData(
      cartID,
      paymentToken,
      paymentType,
      this.address,
      this.axiosInstance
    );
    const paymentData: IChainPayment = paymentDetails.paymentData;
    // return this too
    console.log({ paymentData });
    const result = await droplinked_payment(
      this.getChainConfig(),
      this.getContext(),
      paymentData
    );
    return { ...result, orderID: paymentDetails.orderID };
  }

  async getPaymentData(cartID: string, paymentType: string, token: string) {
    return await getCartData(
      cartID,
      token,
      paymentType,
      this.address,
      this.axiosInstance
    );
  }

  async paymentWithToken(
    receiver: string,
    amount: number,
    tokenAddress: string
  ): Promise<string> {
    await this.handleWallet(this.address);
    const abi = getERC20TokenTransferABI();
    const provider = this.getWalletProvider().getSigner();
    const contract = new ethers.Contract(tokenAddress, abi, provider);
    try {
      await contract.callStatic['transfer'](
        receiver,
        BigInt(Math.floor(amount * 1e6)) * BigInt(1e12)
      );
      const estimation = (
        await contract.estimateGas['transfer'](
          receiver,
          BigInt(Math.floor(amount * 1e6)) * BigInt(1e12)
        )
      )
        .toBigInt()
        .valueOf();
      const gasPrice = (await getGasPrice(this.getWalletProvider())).valueOf();
      const tx = await contract['transfer'](
        receiver,
        BigInt(Math.floor(amount * 1e6)) * BigInt(1e12),
        {
          gasPrice: (gasPrice * BigInt(105)) / BigInt(100),
          gasLimit: (estimation * BigInt(105)) / BigInt(100),
        }
      );
      return tx.hash;
    } catch (e: any) {
      if (e.reason) {
        if (e.reason === 'ERC20: transfer amount exceeds balance') {
          throw new Error('Insufficient token balance');
        } else if (e.reason === 'insufficient funds for gas * price + value') {
          throw new Error('Insufficient ETH balance');
        }
        if (e.reason === 'bad result from backend') {
          throw new Error(
            'Something went wrong, check your eth and token balance'
          );
        }
        throw new Error(e.reason);
      }
      throw e;
    }
  }
}
