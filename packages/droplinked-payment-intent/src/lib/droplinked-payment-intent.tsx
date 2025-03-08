/**
 * DroplinkedPaymentIntent Component
 * A unified payment component that supports multiple payment providers (Stripe and Paymob)
 * Handles payment processing and provides customizable UI elements
 */
// sadfsgasdf
// DroplinkedPaymentIntent.tsx
import React, { ComponentProps } from 'react';
import { StripePaymentProvider } from './components/StripePaymentProvider';
import { PaymobPayment } from './components/PaymobPayment';
import styles from './styles.module.css';

/**
 * Interface for customizing the appearance of payment elements
 * Supports theming, label positioning, and custom CSS variables
 */
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

/**
 * Supported payment provider types
 */
export type PaymentType = 'stripe' | 'paymob';

/**
 * Props interface for the DroplinkedPaymentIntent component
 * @param clientSecret - Secret key for payment authentication
 * @param type - Payment provider type ('stripe' or 'paymob')
 * @param appearance - Custom styling options
 * @param onSuccess - Callback function on successful payment
 * @param onError - Callback function on payment error
 * @param formProps - Additional form element props
 * @param ActionButtonsContainerProps - Props for action buttons container
 * @param cancelButtonProps - Props for cancel button
 * @param submitButtonProps - Props for submit button
 * @param return_url - URL to redirect after payment completion
 */
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

/**
 * A unified payment component that handles different payment providers
 * 
 * @component
 * @example
 * ```tsx
 * <DroplinkedPaymentIntent
 *   clientSecret="your_client_secret"
 *   type="stripe"
 *   return_url="https://your-return-url.com"
 *   onSuccess={() => console.log('Payment successful')}
 *   onError={(error) => console.error('Payment failed', error)}
 * />
 * ```
 * 
 * @param {Object} props - Component props
 * @param {string} props.clientSecret - Secret key required for payment authentication
 * @param {PaymentType} props.type - Payment provider type ('stripe' or 'paymob')
 * @param {string} props.return_url - URL to redirect after payment completion
 * @param {Appearance} [props.appearance] - Custom styling options for payment elements
 * @param {() => void} [props.onSuccess] - Callback function called on successful payment
 * @param {(error: unknown) => void} [props.onError] - Callback function called on payment error
 * @param {ComponentProps<'form'>} [props.formProps] - Additional props for the form element
 * @param {ComponentProps<'div'>} [props.ActionButtonsContainerProps] - Props for the action buttons container
 * @param {ComponentProps<'button'>} [props.cancelButtonProps] - Props for the cancel button
 * @param {ComponentProps<'button'>} [props.submitButtonProps] - Props for the submit button
 * 
 * @throws {Error} Throws error if clientSecret is not provided
 * @throws {Error} Throws error if payment type is invalid
 * 
 * @returns {JSX.Element} Payment form component based on the specified provider
 */
export function DroplinkedPaymentIntent({
  clientSecret,
  type,
  ...rest
}: PaymentElementProps) {
  // Validate required client secret
  if (!clientSecret) {
    console.error('Client secret is required.');
    throw new Error('Client secret is required.');
  }
  
  // Validate payment type
  if (type !== 'stripe' && type !== 'paymob') {
    console.error('Payment type must be either "stripe" or "paymob"');
    throw new Error('Invalid payment type. Must be either "stripe" or "paymob"');
  }

  // Render appropriate payment provider component based on type
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
