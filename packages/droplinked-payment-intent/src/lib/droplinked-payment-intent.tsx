// DroplinkedPaymentIntent.tsx
import React, { ComponentProps } from 'react';
import { StripePaymentProvider } from './components/StripePaymentProvider';
import { PaymobPayment } from './components/PaymobPayment';
import styles from './styles.module.css';

export interface Appearance {
  theme: 'light' | 'dark' | 'flat';
  labels?: 'above' | 'floating';
  variables?: {
    colorBackground?: string;
    colorBackgroundText?: string;
    colorText?: string;
    borderRadius?: string;
    colorSuccess?: string;
    colorDanger?: string;
    focusOutline?: string;
    focusBoxShadow?: string;
  };
  rules?: { [selector: string]: { [cssPropertyName: string]: string } };
}

export type PaymentType = 'stripe' | 'paymob';

export interface PaymentElementProps {
  clientSecret: string;
  type: PaymentType;
  appearance?: Appearance;
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
  ...rest
}: PaymentElementProps) {
  if (!clientSecret) {
    console.error('Client secret is required.');
    throw new Error('Client secret is required.');
  }
  
  if (type !== 'stripe' && type !== 'paymob') {
    console.error('Payment type must be either "stripe" or "paymob"');
    throw new Error('Invalid payment type. Must be either "stripe" or "paymob"');
  }

  switch (type) {
    case 'stripe':
      return (
        <StripePaymentProvider
          clientSecret={clientSecret}
          {...rest}
        />
      );
    case 'paymob':
      return <PaymobPayment clientSecret={clientSecret} {...rest} />;
    default:
      return (
        <div className={styles.error}>Unsupported payment type: {type}</div>
      );
  }
}

export default DroplinkedPaymentIntent;
