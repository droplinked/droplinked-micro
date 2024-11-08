import { ethers } from 'ethers';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IChainPayment {
  chainLinkRoundId?: string;
  totalPrice: any;
  tbdValues: number[] | ethers.BigNumber[];
  tbdReceivers: string[];
  tokenAddress?: string;
  cartItems: {
    id: number;
    amount: number;
    isAffiliate: boolean;
    shopAddress: string;
  }[];
  memo: string;
}
