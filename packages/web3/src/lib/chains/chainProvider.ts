import { Chain, Network } from './dto/chains';
import { EVMProvider } from './providers/evm/evmProvider';
import { ContractType } from './dto/constants/chain-constants';
import { ChainNotImplementedException, defaultModal } from '../web3';
import { Web3Config } from './dto/configs/web3-config';
import { IChainProvider } from './dto/interfaces/chain-provider.interface';

const chainMapping = {
  [Chain.BINANCE]: {
    [Network.TESTNET]: new EVMProvider(
      Chain.BINANCE,
      Network.TESTNET,
      ContractType.TYPE0
    ),
    [Network.MAINNET]: new EVMProvider(
      Chain.BINANCE,
      Network.MAINNET,
      ContractType.TYPE0
    ),
  },
  [Chain.POLYGON]: {
    [Network.TESTNET]: new EVMProvider(
      Chain.POLYGON,
      Network.TESTNET,
      ContractType.TYPE1
    ),
    [Network.MAINNET]: new EVMProvider(
      Chain.POLYGON,
      Network.MAINNET,
      ContractType.TYPE0
    ),
  },
  [Chain.NEAR]: {
    [Network.TESTNET]: new EVMProvider(
      Chain.NEAR,
      Network.TESTNET,
      ContractType.TYPE3
    ),
    [Network.MAINNET]: new EVMProvider(
      Chain.NEAR,
      Network.MAINNET,
      ContractType.TYPE3
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
      ContractType.TYPE1
    ),
    [Network.MAINNET]: new EVMProvider(
      Chain.BASE,
      Network.MAINNET,
      ContractType.TYPE0
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
      ContractType.TYPE3
    ),
    [Network.MAINNET]: new EVMProvider(
      Chain.SKALE,
      Network.MAINNET,
      ContractType.TYPE3
    ),
  },
  [Chain.LINEA]: {
    [Network.TESTNET]: new EVMProvider(
      Chain.LINEA,
      Network.TESTNET,
      ContractType.TYPE3
    ),
    [Network.MAINNET]: new EVMProvider(
      Chain.LINEA,
      Network.MAINNET,
      ContractType.TYPE0
    ),
  },
  [Chain.ETH]: {
    [Network.TESTNET]: new EVMProvider(
      Chain.ETH,
      Network.TESTNET,
      ContractType.TYPE1
    ),
    [Network.MAINNET]: new EVMProvider(
      Chain.ETH,
      Network.MAINNET,
      ContractType.TYPE0
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
      ContractType.TYPE3
    ),
    [Network.TESTNET]: new EVMProvider(
      Chain.REDBELLY,
      Network.TESTNET,
      ContractType.TYPE3
    ),
  },
};

export function Web3Instance(config: Web3Config): IChainProvider {
  const { chain, network, modalInterface, preferredWallet, userAddress } =
    config;

  if (chainMapping[chain][network] == null)
    throw new ChainNotImplementedException(
      `The given chain <${chain}> and network <${network}> is not implemented yet`
    );

  return chainMapping[chain][network]
    ?.setAddress(userAddress || '')
    .setModal(modalInterface || new defaultModal())
    .setWallet(preferredWallet)
    .setAxiosInstance(config.axiosInstance)
    .setNFTContractAddress(config.nftContractAddress || '')
    .setShopContractAddress(config.shopContractAddress || '');
}
