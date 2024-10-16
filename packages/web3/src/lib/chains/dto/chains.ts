import { ethers } from 'ethers';

export enum Chain {
  CASPER,
  POLYGON,
  BINANCE,
  STACKS,
  XRPLSIDECHAIN,
  NEAR,
  SKALE,
  BASE,
  LINEA,
  ETH,
  SOLANA,
  REDBELLY,
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
