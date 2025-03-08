import React from 'react';
import { PaymentElementProps } from '../droplinked-payment-intent';

type PaymobPaymentProps = Omit<PaymentElementProps, 'type' | 'theme'>;

export const PaymobPayment: React.FC<PaymobPaymentProps> = ({
  clientSecret,
  onSuccess,
  onError,
  formProps,
  ActionButtonsContainerProps,
  cancelButtonProps,
  submitButtonProps
}) => {
  return (
    <div className="paymob-payment-container">
      {/* Paymob iframe will be implemented here */}
     not provided
    </div>
  );
}; 