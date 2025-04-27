import { ethers } from 'ethers';
import { IChainPayment } from '../../dto/interfaces/chain-payment.interface';
import { KyInstance } from 'ky';
import { Chain, Network } from '../../../web3';

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function uploadMetadata(
  metadata: any,
  skuID: string,
  axiosInstance: KyInstance
) {
  if (typeof metadata == typeof {} || typeof metadata == typeof []) {
    metadata = JSON.stringify(metadata);
  }
  const res = await ((
    await axiosInstance.patch(`sku/metadata/${skuID}`, {
      json: {
        metadata: metadata,
      },
    })
  ).json() as any);
  return res.data;
}

export async function getCartData(
  cartID: string,
  tokenType: string,
  paymentType: string,
  walletAddress: string,
  axiosInstance: KyInstance
): Promise<{ paymentData: IChainPayment; orderID: string }> {
  const result = (
    (await (
      await axiosInstance.get(
        `checkout/order/crypto-payment-data/${cartID}/${tokenType}/${paymentType}/${walletAddress}`
      )
    ).json()) as any
  ).data;
  return {
    paymentData: result.paymentData as IChainPayment,
    orderID: result.orderID,
  };
}

export type AirdropReceivers = { receiver: string; amount: number }[];

export interface AirdropResponse {
  shopId: string;
  tokenAddress: string;
  tokenId: string;
  chain: Chain;
  networkName: Network;
  receivers: AirdropReceivers;
  status: string;
}

export async function getAirdropData(
  airdropID: string,
  axiosInstance: KyInstance
): Promise<AirdropResponse> {
  const result = (await (
    await axiosInstance.get(`nfts/airdrop/${airdropID}`)
  ).json()) as any;
  return result;
}

export async function getNonce(
  walletAddress: string,
  axiosInstance: KyInstance
): Promise<number> {
  return (
    (await (
      await axiosInstance.get(`auth/nonce?wallet=${walletAddress}`)
    ).json()) as any
  ).data as number;
}

/**
 * Checks if the signer's address matches the expected address
 * If not, provides instructions for reconnecting with AppKit
 * 
 * @param signer - The ethers signer
 * @param address - The expected address
 * @throws Error if addresses don't match
 */
export async function checkWallet(signer: ethers.Signer, address: string) {
  const signerAddress = await signer.getAddress();
  
  if (signerAddress.toLowerCase() !== address.toLowerCase()) {
    console.log(`Address mismatch: Expected ${address}, found ${signerAddress}`);
    
    // With AppKit, account switching should be handled through the wallet modal UI
    throw new Error(
      `Wrong account connected. You need to use account ${address} but you're connected with ${signerAddress}. ` +
      `Please disconnect your wallet using the 'Disconnect' option and reconnect with the correct account.`
    );
  }
}
