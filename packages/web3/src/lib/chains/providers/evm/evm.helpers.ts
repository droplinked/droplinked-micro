import { ethers } from 'ethers';
import { IChainPayment } from '../../dto/interfaces/chain-payment.interface';
import { KyInstance } from 'ky';

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

export async function checkWallet(signer: ethers.Signer, address: string) {
  if (
    (await signer.getAddress()).toLocaleLowerCase() !==
    address.toLocaleLowerCase()
  ) {
    throw new Error('Address does not match signer address');
  }
}
