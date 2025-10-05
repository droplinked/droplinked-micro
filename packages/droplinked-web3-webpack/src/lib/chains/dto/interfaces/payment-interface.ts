import { Chain, PaymentTokens } from '../chains';

export interface IPaymentInputs {
  orderID: string;
  paymentToken: PaymentTokens;
  paymentType: Chain;
}
