import React from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

type StripePaymentFormProps = {
  onSuccess?: (result: any) => void;
  onError?: (error: any) => void;
  formProps?: React.HTMLAttributes<HTMLFormElement>;
  ActionButtonsContainerProps?: React.HTMLAttributes<HTMLDivElement>;
  cancelButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  submitButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
};

export const StripePaymentForm: React.FC<StripePaymentFormProps> = ({
  onSuccess,
  onError,
  formProps,
  ActionButtonsContainerProps,
  cancelButtonProps,
  submitButtonProps
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.href,
        },
      });

      if (result.error) {
        onError?.(result.error);
      } else {
        onSuccess?.(result);
      }
    } catch (error) {
      onError?.(error);
    }
  };

  return (
    <div className="stripe-payment-container">
      <form {...formProps} onSubmit={handleSubmit}>
        <div className="stripe-element-container">
          <PaymentElement />
        </div>
        <div {...ActionButtonsContainerProps}>
          <button type="button" {...cancelButtonProps}>
            انصراف
          </button>
          <button 
            type="submit" 
            {...submitButtonProps} 
            disabled={!stripe}
          >
            پرداخت
          </button>
        </div>
      </form>
    </div>
  );
}; 