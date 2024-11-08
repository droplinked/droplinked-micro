import { Chain, PaymentTokens } from '../chains';

export interface IPaymentInputs {
  cartID: string;
  paymentToken: PaymentTokens;
  paymentType: Chain;
}
