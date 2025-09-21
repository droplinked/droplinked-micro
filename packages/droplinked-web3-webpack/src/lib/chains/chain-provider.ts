/* eslint-disable @typescript-eslint/no-explicit-any */
import { Chain, ChainWallet, Network } from './dto/chains';
import { EVMProvider } from './providers/evm/evm-provider';
import {
  AccountAccessDeniedException,
  ChainNotImplementedException,
  defaultModal,
  MetaMaskNotFoundException,
  NoAccountsFoundException,
  SignatureRequestDeniedException,
  toEthAddress,
  WalletError,
  WalletNotFoundException,
} from '../web3';
import { Web3Actions, Web3ChainConfig } from './dto/configs/web3-config';
import { IChainProvider } from './dto/interfaces/chain-provider.interface';
import { getAccounts } from './providers/evm/evm-login';
import { ethers } from 'ethers';
import ky, { KyInstance } from 'ky';
import { SolanaProvider } from './providers/solana/solana-provider';
import { UnstoppableProvider } from './providers/unstoppable/unstoppable-provider';
import { getShopInfo } from './dto/helpers/get-shop-info';
export class DropWeb3 {
  private axiosInstance: KyInstance;
  private network: Network;
  constructor(workingNetwork: Network, accessToken: string) {
    this.axiosInstance = ky.create({
      prefixUrl:
        workingNetwork === Network.TESTNET
          ? 'https://apiv3dev.droplinked.com'
          : workingNetwork === Network.MAINNET
            ? 'https://apiv3.droplinked.com'
            : 'http://127.0.0.1',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });
    this.network = workingNetwork;
  }
  private chainMapping = {
    [Chain.BINANCE]: {
      [Network.TESTNET]: new EVMProvider(Chain.BINANCE, Network.TESTNET, true),
      [Network.DEV]: new EVMProvider(Chain.BINANCE, Network.TESTNET, true),
      [Network.MAINNET]: new EVMProvider(Chain.BINANCE, Network.MAINNET, true),
    },
    [Chain.POLYGON]: {
      [Network.TESTNET]: new EVMProvider(Chain.POLYGON, Network.TESTNET, true),
      [Network.DEV]: new EVMProvider(Chain.POLYGON, Network.TESTNET, true),
      [Network.MAINNET]: new EVMProvider(Chain.POLYGON, Network.MAINNET, true),
    },
    [Chain.NEAR]: {
      [Network.TESTNET]: new EVMProvider(
        Chain.NEAR,
        Network.TESTNET,
        true // todo
      ),
      [Network.DEV]: new EVMProvider(
        Chain.NEAR,
        Network.TESTNET,
        true // todo
      ),
      [Network.MAINNET]: new EVMProvider(
        Chain.NEAR,
        Network.MAINNET,
        true //todo
      ),
    },
    [Chain.CASPER]: {
      [Network.TESTNET]: null,
      [Network.DEV]: null,
      [Network.MAINNET]: null,
    },
    [Chain.XRPLSIDECHAIN]: {
      [Network.TESTNET]: null,
      [Network.DEV]: null,
      [Network.MAINNET]: null,
    },
    [Chain.BASE]: {
      [Network.TESTNET]: new EVMProvider(Chain.BASE, Network.TESTNET, true),
      [Network.DEV]: new EVMProvider(Chain.BASE, Network.TESTNET, true),
      [Network.MAINNET]: new EVMProvider(Chain.BASE, Network.MAINNET, true),
    },
    [Chain.STACKS]: {
      [Network.TESTNET]: null,
      [Network.DEV]: null,
      [Network.MAINNET]: null,
    },
    [Chain.SKALE]: {
      [Network.TESTNET]: new EVMProvider(Chain.SKALE, Network.TESTNET, false),
      [Network.DEV]: new EVMProvider(Chain.SKALE, Network.TESTNET, false),
      [Network.MAINNET]: new EVMProvider(Chain.SKALE, Network.MAINNET, false),
    },
    [Chain.LINEA]: {
      [Network.TESTNET]: new EVMProvider(Chain.LINEA, Network.TESTNET, true),
      [Network.DEV]: new EVMProvider(Chain.LINEA, Network.TESTNET, true),
      [Network.MAINNET]: new EVMProvider(Chain.LINEA, Network.MAINNET, true),
    },
    [Chain.ETH]: {
      [Network.TESTNET]: new EVMProvider(Chain.ETH, Network.TESTNET, true),
      [Network.DEV]: new EVMProvider(Chain.ETH, Network.TESTNET, true),
      [Network.MAINNET]: new EVMProvider(Chain.ETH, Network.MAINNET, true),
    },
    [Chain.SOLANA]: {
      [Network.MAINNET]: new SolanaProvider(Network.MAINNET),
      [Network.TESTNET]: new SolanaProvider(Network.TESTNET),
      [Network.DEV]: new SolanaProvider(Network.TESTNET),
    },
    [Chain.UNSTOPPABLE]: {
      [Network.MAINNET]: new UnstoppableProvider(Network.MAINNET),
      [Network.TESTNET]: new UnstoppableProvider(Network.TESTNET),
      [Network.DEV]: new UnstoppableProvider(Network.TESTNET),
    },
    [Chain.REDBELLY]: {
      [Network.MAINNET]: new EVMProvider(Chain.REDBELLY, Network.MAINNET, true),
      [Network.TESTNET]: new EVMProvider(Chain.REDBELLY, Network.TESTNET, true),
      [Network.DEV]: new EVMProvider(Chain.REDBELLY, Network.TESTNET, true),
    },
    [Chain.BITLAYER]: {
      [Network.MAINNET]: new EVMProvider(Chain.BITLAYER, Network.MAINNET, true),
      [Network.TESTNET]: new EVMProvider(Chain.BITLAYER, Network.TESTNET, true),
      [Network.DEV]: new EVMProvider(Chain.BITLAYER, Network.TESTNET, true),
    },
  };

  async web3Instance(config: Web3ChainConfig): Promise<IChainProvider> {
    const network = this.network;
    const { modalInterface, preferredWallet } = config;
    let userAddress = '';
    let chain: Chain = Chain.ETH;


    if (config.method === Web3Actions.RECORD) {
      userAddress = config.userAddress;
      chain = config.chain;
    } else if (config.method === Web3Actions.DEPLOY) {
      userAddress = config.userAddress;
      chain = config.chain;
    } else if (config.method === Web3Actions.PAYMENT) {
      userAddress = config.userAddress;
      chain = config.chain;
    } else if (config.method === Web3Actions.CLAIM) {
      userAddress = config.userAddress;
      chain = config.chain;
    } else if (config.method === Web3Actions.LOGIN) {
      if (preferredWallet === ChainWallet.Phantom) {
        chain = Chain.SOLANA;
      } else if (preferredWallet === ChainWallet.UnstoppableDomains) {
        chain = Chain.UNSTOPPABLE;
      } else {
        chain = Chain.BASE;
      }
    } else if (config.method === Web3Actions.AIRDROP) {
      chain = config.chain;
      userAddress = config.userAddress;
    }

    if (
      this.chainMapping[chain][network] === null ||
      this.chainMapping[chain][network] === undefined
    ) {
      throw new ChainNotImplementedException(
        `The given chain <${chain}> and network <${network}> is not implemented yet`
      );
    }

    const { nftContractAddress, shopContractAddress } = await getShopInfo(chain, this.axiosInstance);

    console.log("Started with: ", {
      nftContractAddress, shopContractAddress
    })
    return (this.chainMapping[chain][network] as IChainProvider)
      ?.setAddress(toEthAddress(userAddress) || toEthAddress(''))
      .setModal(modalInterface || new defaultModal())
      .setWallet(preferredWallet)
      .setAxiosInstance(this.axiosInstance)
      .setNFTContractAddress(nftContractAddress || '')
      .setShopContractAddress(shopContractAddress || '')
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
