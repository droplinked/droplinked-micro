import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { StripePaymentForm } from './StripePaymentForm';
import { PaymentElementProps } from '../droplinked-payment-intent';

// استرایپ را خارج از کامپوننت بارگذاری می‌کنیم
const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY || '');

type StripePaymentProviderProps = Omit<PaymentElementProps, 'type'>;

export const StripePaymentProvider: React.FC<StripePaymentProviderProps> = ({
  clientSecret,
  theme,
  onSuccess,
  onError,
  formProps,
  ActionButtonsContainerProps,
  cancelButtonProps,
  submitButtonProps,
}) => {
  const appearanceTheme: 'flat' | 'stripe' | 'night' | undefined =
    theme === 'light' ? 'stripe' : theme === 'dark' ? 'night' : theme;

  const options = {
    clientSecret,
    appearance: { theme: appearanceTheme },
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
      />
    </Elements>
  );
};
