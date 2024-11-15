export type PurchaseConfirmationData = {
  amount: number;
  productId: string;
  nullifier: string;
}[];

export type PurchaseProducts = {
  amount: number;
  productId: string;
}[];

export type PurchaseSignature = {
  signature: string;
  purchaseData: PurchaseConfirmationData;
};

export interface ClaimNFTInputs {
  signature: PurchaseSignature;
}
