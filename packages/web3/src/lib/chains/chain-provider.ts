/* eslint-disable @typescript-eslint/no-explicit-any */
import { Chain, Network } from './dto/chains';
import { EVMProvider } from './providers/evm/evm-provider';
import { ContractType } from './dto/constants/chain-constants';
import {
  AccountAccessDeniedException,
  ChainNotImplementedException,
  defaultModal,
  MetaMaskNotFoundException,
  NoAccountsFoundException,
  SignatureRequestDeniedException,
  WalletError,
  WalletNotFoundException,
} from '../web3';
import { Web3Actions, Web3ChainConfig } from './dto/configs/web3-config';
import { IChainProvider } from './dto/interfaces/chain-provider.interface';
import axios, { AxiosInstance } from 'axios';
import { getAccounts } from './providers/evm/evm-login';
import { ethers } from 'ethers';
export class DropWeb3 {
  private axiosInstance: AxiosInstance;
  private network: Network;
  constructor(workingNetwork: Network) {
    this.axiosInstance = axios.create({
      baseURL:
        workingNetwork === Network.TESTNET
          ? 'https://apiv3dev.droplinked.com'
          : 'https://apiv3.droplinked.com',
    });
    this.network = workingNetwork;
  }
  private chainMapping = {
    [Chain.BINANCE]: {
      [Network.TESTNET]: new EVMProvider(
        Chain.BINANCE,
        Network.TESTNET,
        ContractType.TYPE0,
        true
      ),
      [Network.MAINNET]: new EVMProvider(
        Chain.BINANCE,
        Network.MAINNET,
        ContractType.TYPE0,
        true
      ),
    },
    [Chain.POLYGON]: {
      [Network.TESTNET]: new EVMProvider(
        Chain.POLYGON,
        Network.TESTNET,
        ContractType.TYPE1,
        true
      ),
      [Network.MAINNET]: new EVMProvider(
        Chain.POLYGON,
        Network.MAINNET,
        ContractType.TYPE0,
        true
      ),
    },
    [Chain.NEAR]: {
      [Network.TESTNET]: new EVMProvider(
        Chain.NEAR,
        Network.TESTNET,
        ContractType.TYPE3,
        true // todo
      ),
      [Network.MAINNET]: new EVMProvider(
        Chain.NEAR,
        Network.MAINNET,
        ContractType.TYPE3,
        true //todo
      ),
    },
    [Chain.CASPER]: {
      [Network.TESTNET]: null,
      [Network.MAINNET]: null,
    },
    [Chain.XRPLSIDECHAIN]: {
      [Network.TESTNET]: null,
      [Network.MAINNET]: null,
    },
    [Chain.BASE]: {
      [Network.TESTNET]: new EVMProvider(
        Chain.BASE,
        Network.TESTNET,
        ContractType.TYPE1,
        true
      ),
      [Network.MAINNET]: new EVMProvider(
        Chain.BASE,
        Network.MAINNET,
        ContractType.TYPE0,
        true
      ),
    },
    [Chain.STACKS]: {
      [Network.TESTNET]: null,
      [Network.MAINNET]: null,
    },
    [Chain.SKALE]: {
      [Network.TESTNET]: new EVMProvider(
        Chain.SKALE,
        Network.TESTNET,
        ContractType.TYPE3,
        false
      ),
      [Network.MAINNET]: new EVMProvider(
        Chain.SKALE,
        Network.MAINNET,
        ContractType.TYPE3,
        false
      ),
    },
    [Chain.LINEA]: {
      [Network.TESTNET]: new EVMProvider(
        Chain.LINEA,
        Network.TESTNET,
        ContractType.TYPE3,
        true
      ),
      [Network.MAINNET]: new EVMProvider(
        Chain.LINEA,
        Network.MAINNET,
        ContractType.TYPE0,
        true
      ),
    },
    [Chain.ETH]: {
      [Network.TESTNET]: new EVMProvider(
        Chain.ETH,
        Network.TESTNET,
        ContractType.TYPE1,
        true
      ),
      [Network.MAINNET]: new EVMProvider(
        Chain.ETH,
        Network.MAINNET,
        ContractType.TYPE0,
        true
      ),
    },
    [Chain.SOLANA]: {
      [Network.MAINNET]: null,
      [Network.TESTNET]: null,
    },
    [Chain.REDBELLY]: {
      [Network.MAINNET]: new EVMProvider(
        Chain.REDBELLY,
        Network.MAINNET,
        ContractType.TYPE3,
        false
      ),
      [Network.TESTNET]: new EVMProvider(
        Chain.REDBELLY,
        Network.TESTNET,
        ContractType.TYPE3,
        false
      ),
    },
  };

  web3Instance(config: Web3ChainConfig): IChainProvider {
    const network = this.network;
    const { chain, modalInterface, preferredWallet } = config;
    let userAddress = '';
    let nftContractAddress = '';
    let shopContractAddress = '';

    if (config.method === Web3Actions.RECORD_AFFILIATE) {
      userAddress = config.userAddress;
      nftContractAddress = config.nftContractAddress;
      shopContractAddress = config.shopContractAddress;
    } else if (config.method === Web3Actions.DEPLOY) {
      userAddress = config.userAddress;
    } else if (config.method === Web3Actions.PAYMENT) {
      userAddress = config.userAddress;
    }

    if (this.chainMapping[chain][network] == null)
      throw new ChainNotImplementedException(
        `The given chain <${chain}> and network <${network}> is not implemented yet`
      );

    return this.chainMapping[chain][network]
      ?.setAddress(userAddress || '')
      .setModal(modalInterface || new defaultModal())
      .setWallet(preferredWallet)
      .setAxiosInstance(this.axiosInstance)
      .setNFTContractAddress(nftContractAddress || '')
      .setShopContractAddress(shopContractAddress || '');
  }

  async getWalletInfo() {
    try {
      const ethereum = (window as any).ethereum;

      // Check if an Ethereum provider is available
      if (!ethereum) {
        throw new WalletNotFoundException();
      }

      // Check if MetaMask is installed
      if (!ethereum.isMetaMask) {
        throw new MetaMaskNotFoundException();
      }

      // Request accounts access
      try {
        await ethereum.request({ method: 'eth_requestAccounts' });
      } catch (error: any) {
        // Handle case when user denies account access
        console.error(error);
        throw new AccountAccessDeniedException();
      }

      const nonce = Math.floor(Math.random() * 10000000);

      // Get the current date and time for transparency
      const currentDate = new Date().toLocaleString();

      const message = `Welcome to Droplinked!
      
      Please sign this message to verify your identity and securely log in.
      
      - Nonce: ${nonce}
      - Date: ${currentDate}
      
      This action will not incur any gas fees or blockchain transactions.`;

      // Get the account address
      let address;
      try {
        const accounts = await getAccounts(ethereum);
        if (!accounts || accounts.length === 0) {
          throw new NoAccountsFoundException();
        }
        address = accounts[0];
      } catch (error: any) {
        // Handle error in retrieving accounts
        throw new WalletError(
          `Failed to retrieve account address: ${error.message}`
        );
      }

      // Request the user to sign the message
      let signature;
      try {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        signature = await signer.signMessage(message);
      } catch (error: any) {
        console.error(error);
        // Handle case where the user refuses to sign the message
        throw new SignatureRequestDeniedException();
      }

      // Return the wallet information
      return {
        address: address,
        signature: signature,
        nonce: nonce,
        date: currentDate,
      };
    } catch (error: any) {
      // General catch for unexpected errors
      console.error('Error fetching wallet information:', error.message);
      throw error; // Re-throw the error to let the caller handle it
    }
  }
}
