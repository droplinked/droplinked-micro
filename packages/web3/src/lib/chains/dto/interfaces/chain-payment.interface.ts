/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IChainPayment {
  chainLinkRoundId: string;
  totalPrice: any;
  tbdValues: number[];
  tbdReceivers: string[];
  cartItems: {
    id: number;
    amount: number;
    isAffiliate: boolean;
    shopAddress: string;
  }[];
  memo: string;
}
