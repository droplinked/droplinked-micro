import { AxiosInstance } from 'axios';
import { ethers } from 'ethers';
import { IChainPayment } from '../../dto/interfaces/chain-payment.interface';

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function uploadMetadata(
  metadata: any,
  skuID: string,
  axiosInstance: AxiosInstance
) {
  if (typeof metadata == typeof {} || typeof metadata == typeof []) {
    metadata = JSON.stringify(metadata);
  }
  const res = (
    await axiosInstance.patch(`sku/metadata/${skuID}`, {
      metadata: metadata,
    })
  ).data;
  return res.data;
}

export async function getCartData(
  cartID: string,
  tokenType: string,
  paymentType: string,
  walletAddress: string,
  axiosInstance: AxiosInstance
): Promise<IChainPayment> {
  return (
    await axiosInstance.get(
      `/checkout/order/crypto-payment-data/${cartID}/${tokenType}/${paymentType}/${walletAddress}`
    )
  ).data.data.paymentData as IChainPayment;
}

export async function checkWallet(signer: ethers.Signer, address: string) {
  if (
    (await signer.getAddress()).toLocaleLowerCase() !==
    address.toLocaleLowerCase()
  ) {
    throw new Error('Address does not match signer address');
  }
}
