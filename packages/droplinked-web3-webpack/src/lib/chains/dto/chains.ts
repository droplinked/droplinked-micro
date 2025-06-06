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
  UNSTOPPABLE = 'UNSTOPPABLE',
  BITLAYER = 'BITLAYER',
}

export enum PaymentTokens {
  ETH = 'ETH',
  RBNT = 'RBNT',
  SOL = 'SOL',
  USDC = 'USDC',
  USDT = 'USDT',
  MEW = 'MEW',
  BNB = 'BNB',
  MATIC = 'MATIC',
  CSPR = 'CSPR',
  PARAM = 'PARAM',
  BDC = 'BDC',
  BTC = 'BTC',
}

export enum Network {
  MAINNET,
  TESTNET,
  DEV
}

export enum ChainWallet {
  Metamask = 'Metamask',
  CoinBase = 'CoinBase',
  CasperWallet = 'CasperWallet',
  Phantom = 'Phantom',
  BaseSmartWallet = 'BaseSmartWallet',
  UnstoppableDomains = 'UnstoppableDomains',
}

export type Wallets = ChainWallet | string[];

export async function getGasPrice(
  provider: ethers.Provider
): Promise<bigint> {
  return ((await provider.getFeeData()).gasPrice) || BigInt(1e24);
}
