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
import axios, { AxiosInstance } from 'axios';
import {
  ContractType,
  ZERO_ADDRESS,
} from '../../dto/constants/chain-constants';
import { DroplinkedChainConfig } from '../../dto/configs/chain.config';
import {
  IProductDetails,
  ISKUDetails,
} from '../../dto/interfaces/record-web3-product.interface';
import { WalletNotFoundException } from '../../dto/errors/chain-errors';
import { IWeb3Context } from '../../dto/interfaces/web3-context.interface';
import { IChainProvider } from '../../dto/interfaces/chain-provider.interface';
import { IDeployShop } from '../../dto/interfaces/deploy-shop.interface';

export class EVMProvider implements IChainProvider {
  chain: Chain = Chain.BINANCE;
  network: Network = Network.TESTNET;
  address: EthAddress;
  modalInterface: ModalInterface = new defaultModal();
  wallet: ChainWallet = ChainWallet.Metamask;
  axiosInstance: AxiosInstance = axios.create({});
  contractType: ContractType;
  nftContractAddress?: EthAddress;
  shopContractAddress?: EthAddress;
  gasPredictable: boolean;

  constructor(
    _chain: Chain,
    _network: Network,
    _contractType: ContractType = ContractType.TYPE0,
    gasPredictable: boolean
  ) {
    this.chain = _chain;
    this.network = _network;
    this.contractType = _contractType;
    this.gasPredictable = gasPredictable;
    this.address = ZERO_ADDRESS;
  }

  setAxiosInstance(axiosInstance: AxiosInstance) {
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
        this.handleWallet(_address);
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
      const distributionRequest = (
        await this.axiosInstance.post(`shop/sFuelDistribution`, {
          wallet: this.address,
          isTestnet: this.network === Network.TESTNET,
        })
      ).data;
      console.log(distributionRequest);
    }

    this.modalInterface.success('Wallet connected');
  }

  getChainConfig(): DroplinkedChainConfig {
    return {
      address: this.address,
      chain: this.chain,
      contractType: this.contractType,
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

  async walletLogin() {
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
      contractType: this.contractType,
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
      this.modalInterface,
      this.contractType
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
      this.modalInterface,
      this.contractType
    );
  }

  async payment(
    cartID: string
  ): Promise<{ transactionHash: string; cryptoAmount: any }> {
    // if (this.wallet !== ChainWallet.BaseSmartWallet)
    // await this.handleWallet(this.address);
    // return await EVMPayment(
    //   await this.getWalletProvider(),
    //   this.chain,
    //   this.network,
    //   this.address,
    //   data
    // );
    console.log({ cartID });
    return { transactionHash: '', cryptoAmount: 0 };
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
