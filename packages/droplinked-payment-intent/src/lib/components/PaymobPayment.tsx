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
      <form {...formProps} onSubmit={(e) => e.preventDefault()}>
        <div className="paymob-iframe-container">
          {/* Paymob iframe will be mounted here */}
        </div>
        <div {...ActionButtonsContainerProps}>
          <button type="button" {...cancelButtonProps}>
            Cancel
          </button>
          <button type="submit" {...submitButtonProps}>
            Pay
          </button>
        </div>
      </form>
    </div>
  );
}; 