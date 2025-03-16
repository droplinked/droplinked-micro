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
 * Interface for button styling
 */
export interface ButtonStyle {
  backgroundColor: string;
  textColor: string;
  fontSize: string;
  fontWeight: number;
  borderRadius?: string;
}

/**
 * Interface for common styling across the payment component
 */
export interface CommonStyle {
  fontFamily: string;
  fontSizeLabel: string;
  fontSizeInput: string;
  fontSizePaymentButton: string;
  fontWeightLabel: number;
  fontWeightInput: number;
  fontWeightPaymentButton: number;
  colorContainer: string;
  colorBorderInput: string;
  colorBorderPaymentButton: string;
  borderRadius: string;
  colorDisabled: string;
  colorError: string;
  colorPrimary: string;
  colorInput: string;
  textColorLabel: string;
  textColorPaymentButton: string;
  textColorInput: string;
  placeholderColor: string;
  containerWidth: string;
  verticalPadding: string;
  verticalSpacing: string;
  containerPadding: string;
  backgroundBody?: string;         // For Stripe or other providers
  textColorParagraphs?: string;    // For Stripe or other providers
  submitButton: ButtonStyle;
  cancelButton: ButtonStyle;
  theme?: "light" | "dark";        // Theme property
}

/**
 * Supported payment provider types
 */
export type PaymentType = 'stripe' | 'paymob';

/**
 * Props interface for the DroplinkedPaymentIntent component
 * @param clientSecret - Secret key for payment authentication
 * @param type - Payment provider type ('stripe' or 'paymob')
 * @param commonStyle - Common styling options for the payment component
 * @param onSuccess - Callback function on successful payment
 * @param onError - Callback function on payment error
 * @param return_url - URL to redirect after payment completion (optional with default)
 * @param isTestnet - Indicates whether the payment is in testnet mode
 */
export interface PaymentElementProps {
  clientSecret: string;
  type: PaymentType;
  commonStyle?: CommonStyle;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  return_url: string;
  isTestnet?: boolean;
}

/**
 * Default button style
 */
export const defaultButtonStyle: ButtonStyle = {
  backgroundColor: '#4F46E5',
  textColor: '#FFFFFF',
  fontSize: '14px',
  fontWeight: 500,
  borderRadius: '4px'
};

/**
 * Default common style for payment components
 */
export const defaultCommonStyle: CommonStyle = {
  fontFamily: 'system-ui, -apple-system, sans-serif',
  fontSizeLabel: '14px',
  fontSizeInput: '16px',
  fontSizePaymentButton: '16px',
  fontWeightLabel: 500,
  fontWeightInput: 400,
  fontWeightPaymentButton: 600,
  colorContainer: '#FFFFFF',
  colorBorderInput: '#E5E7EB',
  colorBorderPaymentButton: 'transparent',
  borderRadius: '8px',
  colorDisabled: '#9CA3AF',
  colorError: '#EF4444',
  colorPrimary: '#4F46E5',
  colorInput: '#FFFFFF',
  textColorLabel: '#374151',
  textColorPaymentButton: '#FFFFFF',
  textColorInput: '#1F2937',
  placeholderColor: '#9CA3AF',
  containerWidth: '100%',
  verticalPadding: '12px',
  verticalSpacing: '16px',
  containerPadding: '16px',
  backgroundBody: '#F9FAFB',
  textColorParagraphs: '#4B5563',
  submitButton: {
    ...defaultButtonStyle
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
    textColor: '#4B5563',
    fontSize: '14px',
    fontWeight: 500,
    borderRadius: '4px'
  },
  theme: 'light'
};

/**
 * A unified payment component that handles different payment providers
 * 
 * @component
 * @example
 * ```tsx
 * <DroplinkedPaymentIntent
 *   clientSecret="your_client_secret"
 *   type="stripe"
 *   onSuccess={() => console.log('Payment successful')}
 *   onError={(error) => console.error('Payment failed', error)}
 * />
 * ```
 * 
 * @param {Object} props - Component props
 * @param {string} props.clientSecret - Secret key required for payment authentication
 * @param {PaymentType} props.type - Payment provider type ('stripe' or 'paymob')
 * @param {string} [props.return_url] - URL to redirect after payment completion (defaults to current URL)
 * @param {CommonStyle} [props.commonStyle] - Common styling options for the payment component
 * @param {() => void} [props.onSuccess] - Callback function called on successful payment
 * @param {(error: unknown) => void} [props.onError] - Callback function called on payment error
 * @param {boolean} [props.isTestnet] - Indicates whether the payment is in testnet mode
 * 
 * @throws {Error} Throws error if clientSecret is not provided
 * @throws {Error} Throws error if payment type is invalid
 * 
 * @returns {JSX.Element} Payment form component based on the specified provider
 */
export function DroplinkedPaymentIntent({
  clientSecret,
  type,
  commonStyle = defaultCommonStyle,
  return_url = window.location.href,
  isTestnet = false,
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
          commonStyle={commonStyle}
          return_url={return_url}
          isTestnet={isTestnet}
          {...rest}
        />
      );
    case 'paymob':
      return (
        <PaymobPayment 
          clientSecret={clientSecret} 
          commonStyle={commonStyle} 
          return_url={return_url}
          isTestnet={isTestnet}
        />
      );
    default:
      return (
        <div className={styles.error}>Unsupported payment type: {type}</div>
      );
  }
}

export default DroplinkedPaymentIntent;
