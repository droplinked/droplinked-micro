import { ethers } from 'ethers';

export enum Chain {
  CASPER = 'CASPER',
  POLYGON = 'POLYGON',
  BINANCE = 'BINANCE',
  STACKS = 'STACKS',
  XRPLSIDECHAIN = 'XRPLSIDECHAIN',
  NEAR = 'NEAR',
  SKALE = 'SKALE',
  BASE = 'BASE',
  LINEA = 'LINEA',
  ETH = 'ETH',
  SOLANA = 'SOLANA',
  REDBELLY = 'REDBELLY',
}

export enum Network {
  MAINNET,
  TESTNET,
}

export enum ChainWallet {
  Metamask,
  CoinBase,
  CasperWallet,
  Phantom,
}

export async function getGasPrice(
  provider: ethers.providers.JsonRpcProvider
): Promise<bigint> {
  return (await provider.getGasPrice()).toBigInt();
}
