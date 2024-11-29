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
}

export enum Network {
  MAINNET,
  TESTNET,
}

export enum ChainWallet {
  Metamask = 'Metamask',
  CoinBase = 'CoinBase',
  CasperWallet = 'CasperWallet',
  Phantom = 'Phantom',
  BaseSmartWallet = 'BaseSmartWallet',
}

export async function getGasPrice(
  provider: ethers.providers.JsonRpcProvider
): Promise<bigint> {
  return (await provider.getGasPrice()).toBigInt();
}
