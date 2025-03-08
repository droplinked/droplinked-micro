import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { StripePaymentForm } from './StripePaymentForm';
import { PaymentElementProps } from '../droplinked-payment-intent';

// استرایپ را خارج از کامپوننت بارگذاری می‌کنیم
const stripePromise = loadStripe(
  'pk_test_51Odtp1JYpy7bkFtuwoI9JX5KEjpK66XQ1KO2nzmJ7d0aUM2g2alhMhsA6kELz2VvJO64RpgL82vqoBpAx4WsCjOc00mW98oWYW'
);

type StripePaymentProviderProps = Omit<PaymentElementProps, 'type'>;

export const StripePaymentProvider: React.FC<StripePaymentProviderProps> = ({
  clientSecret,
  appearance,
  onSuccess,
  onError,
  formProps,
  ActionButtonsContainerProps,
  cancelButtonProps,
  submitButtonProps,
  return_url,
}) => {
  const stripeTheme: 'flat' | 'stripe' | 'night' = appearance?.theme === 'light' 
    ? 'stripe' 
    : appearance?.theme === 'dark' 
      ? 'night' 
      : 'flat';

  const options = {
    clientSecret,
    appearance: {
      ...appearance,
      theme: stripeTheme,
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <StripePaymentForm
        onSuccess={onSuccess}
        onError={onError}
        formProps={formProps}
        ActionButtonsContainerProps={ActionButtonsContainerProps}
        cancelButtonProps={cancelButtonProps}
        submitButtonProps={submitButtonProps}
        return_url={return_url}
      />
    </Elements>
  );
};
