import React from 'react';
import { PaymentElementProps } from '../droplinked-payment-intent';

type StripePaymentProps = Omit<PaymentElementProps, 'type'>;

export const StripePayment: React.FC<StripePaymentProps> = ({
  clientSecret,
  theme,
  onSuccess,
  onError,
  formProps,
  ActionButtonsContainerProps,
  cancelButtonProps,
  submitButtonProps
}) => {
  return (
    <div className="stripe-payment-container">
      {/* Stripe Elements will be implemented here */}
      <form {...formProps} onSubmit={(e) => e.preventDefault()}>
        <div className="stripe-element-container">
          {/* Stripe Elements will be mounted here */}
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