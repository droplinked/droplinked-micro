/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from 'ethers';
import {
  DeployShopResponse,
  EthAddress,
  RecordResponse,
  toEthAddress,
} from '../../dto/constants/chain-structs';
import { Chain, ChainWallet, getGasPrice, Network } from '../../dto/chains';
import {
  ModalInterface,
  defaultModal,
} from '../../dto/interfaces/modal-interface.interface';
import { deployEVMShop } from './evm-deploy-shop';
import {
  evmLogin,
  isMetamaskInstalled,
  getAccounts,
  isWalletConnected,
  isChainCorrect,
  changeChain,
  addChain,
} from './evm-login';
import { recordProduct } from './evm-record';
import { ZERO_ADDRESS } from '../../dto/constants/chain-constants';
import { DroplinkedChainConfig } from '../../dto/configs/chain.config';
import { WalletNotFoundException, Web3CallbackFailed } from '../../dto/errors/chain-errors';
import { IWeb3Context } from '../../dto/interfaces/web3-context.interface';
import { IChainProvider } from '../../dto/interfaces/chain-provider.interface';
import { IDeployShop } from '../../dto/interfaces/deploy-shop.interface';
import { getAirdropData, getCartData } from './evm.helpers';
import { IChainPayment } from '../../dto/interfaces/chain-payment.interface';
import { droplinked_payment } from './evm-payments';
import { ILoginResult } from '../../dto/interfaces/login-result.interface';
import { IPaymentInputs } from '../../dto/interfaces/payment-interface';
import ky, { KyInstance } from 'ky';
import { ClaimNFTInputs } from '../../dto/interfaces/claim-nft-inputs';
import { claimNFT } from './evm-claim-nfts';
import { airdrop } from './evm-airdrop';
import { TokenStandard } from '../../dto/interfaces/airdrop-token.interface';
import { erc20ABI } from '../../dto/constants/chain-abis';
import { startRecord, transformProductData, web3Callback } from '../../dto/helpers/get-shop-info';

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

  async customPayment(
    data: IChainPayment
  ): Promise<{ transactionHash: string; cryptoAmount: any }> {
    await this.handleChain();
    return await droplinked_payment(
      this.getChainConfig(),
      this.getContext(),
      data
    );
  }

  async claimNFTs(data: ClaimNFTInputs): Promise<string> {
    await this.handleWallet(this.address);
    await this.handleChain();
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
    await this.handleChain();
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

  async handleChain() {
    const provider = this.getWalletProvider();
    await addChain(provider, this.chain, this.network, this.modalInterface);
    if (!(await isChainCorrect(provider.provider, this.chain, this.network))) {
      console.log('Changing chain...');
      await changeChain(provider.provider, this.chain, this.network);
    }
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
    // if (!(await isChainCorrect(ethereum, this.chain, this.network))) {
    //   this.modalInterface.waiting('Changing chain...');
    //   await changeChain(ethereum, this.chain, this.network);
    // }
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
        await this.axiosInstance.post(`web3/sFuelDistribution`, {
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
    productId: string
  ): Promise<RecordResponse> {
    const { productData, skuData } = await transformProductData(productId, this.axiosInstance);
    this.checkDeployment();
    const txId = await startRecord(productId);
    await this.handleWallet(this.address);
    await this.handleChain();
    const result = await recordProduct(
      this.getChainConfig(),
      this.getContext(),
      productData,
      skuData
    );
    const callbackResults = await web3Callback();
    if (!callbackResults) {
      throw new Web3CallbackFailed(`txHash: ${result.transactionHash}`);
    }
    return { ...result, transactionId: txId };
  }

  async executeAirdrop(
    airdropId: string
  ): Promise<{ transactionHashes: string[] }> {
    console.log({ airdropId });
    const airdropData = await getAirdropData(airdropId, this.axiosInstance);
    await this.handleWallet(this.address);
    await this.handleChain();
    return await airdrop(this.getChainConfig(), this.getContext(), {
      type: TokenStandard.ERC1155,
      airdropId: airdropId,
      receivers: airdropData.receivers,
      tokenAddress: toEthAddress(airdropData.tokenAddress),
      tokenId: airdropData.tokenId,
      chunkSize: 300,
    });
  }

  async payment(
    data: IPaymentInputs
  ): Promise<{ transactionHash: string; cryptoAmount: any; orderID: string }> {
    await this.handleWallet(this.address);
    await this.handleChain();
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
    tokenAddress: string,
    decimals = 18
  ): Promise<string> {
    await this.handleWallet(this.address);
    await this.handleChain();
    const abi = erc20ABI;
    const provider = this.getWalletProvider().getSigner();
    const contract = new ethers.Contract(tokenAddress, abi, provider);
    try {
      await contract.callStatic['transfer'](
        receiver,
        BigInt(Math.floor(amount * 1e6)) * BigInt(10 ** (decimals - 6))
      );
      const estimation = (
        await contract.estimateGas['transfer'](
          receiver,
          BigInt(Math.floor(amount * 1e6)) * BigInt(10 ** (decimals - 6))
        )
      )
        .toBigInt()
        .valueOf();
      const gasPrice = (await getGasPrice(this.getWalletProvider())).valueOf();
      const tx = await contract['transfer'](
        receiver,
        BigInt(Math.floor(amount * 1e6)) * BigInt(10 ** (decimals - 6)),
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
