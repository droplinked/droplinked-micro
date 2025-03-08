// DroplinkedPaymentIntent.tsx
import React, { ComponentProps } from 'react';
import { PaymentType } from './enums';
import { StripePaymentProvider } from './components/StripePaymentProvider';
import { PaymobPayment } from './components/PaymobPayment';
import styles from './styles.module.css';

export interface Appearance {
  theme: 'light' | 'dark' | 'flat';
}

export interface PaymentElementProps {
  clientSecret: string;
  type: PaymentType;
  theme?: Appearance['theme'];
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  formProps?: ComponentProps<'form'>;
  ActionButtonsContainerProps?: ComponentProps<'div'>;
  cancelButtonProps?: ComponentProps<'button'>;
  submitButtonProps?: ComponentProps<'button'>;
  return_url: string;
}

export function DroplinkedPaymentIntent({
  clientSecret,
  type,
  theme = 'light',
  ...rest
}: PaymentElementProps) {
  switch (type) {
    case PaymentType.Stripe:
      return (
        <StripePaymentProvider
          clientSecret={clientSecret}
          theme={theme}
          {...rest}
        />
      );
    case PaymentType.Paymob:
      return <PaymobPayment clientSecret={clientSecret} {...rest} />;
    default:
      return (
        <div className={styles.error}>Unsupported payment type: {type}</div>
      );
  }
}

export default DroplinkedPaymentIntent;
