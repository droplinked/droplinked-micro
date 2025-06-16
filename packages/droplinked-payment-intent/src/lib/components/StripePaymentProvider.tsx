import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Appearance as StripeAppearance } from '@stripe/stripe-js';
import { StripePaymentForm } from './StripePaymentForm';
import { PaymentElementProps, CommonStyle  } from '../droplinked-payment-intent';

/**
 * Props type for StripePaymentProvider, excluding the 'type' field from PaymentElementProps
 */
type StripePaymentProviderProps = Omit<PaymentElementProps, 'type'>;

interface PaymobProps {
  clientSecret: string;
  commonStyle: CommonStyle;
  onSuccess?: () => void;
  onCancel?: () => void;
  onError?: (error: unknown) => void;
  return_url?: string;
  isTestnet?: boolean;
  intentType?: 'payment' | 'setup';
}


const convertCommonStyleToStripeAppearance = (commonStyle: CommonStyle): StripeAppearance => {
  return {
    theme: commonStyle.theme === 'dark' ? 'night' : 'stripe',
    labels: 'above',
    variables: {
      colorPrimary: commonStyle.colorPrimary,
      colorBackground: commonStyle.backgroundBody || '#ffffff',
      colorText: commonStyle.textColorParagraphs || '#1f1f1f',
      colorDanger: commonStyle.colorError,
      colorTextSecondary: commonStyle.textColorLabel,
      colorTextPlaceholder: commonStyle.placeholderColor,
      colorBackgroundText: commonStyle.textColorParagraphs || '#1f1f1f',
      borderRadius: commonStyle.borderRadius,
      fontFamily: commonStyle.fontFamily,
      fontSizeBase: commonStyle.fontSizeInput,
      fontWeightNormal: (commonStyle.fontWeightInput ?? 400).toString(),
      fontLineHeight: '1.5',
      focusOutline: 'unset',
      focusBoxShadow: 'none',
      colorSuccess: commonStyle.colorPrimary,
    },
    rules: {
      '.Input': {
        border: `1px solid ${commonStyle.colorBorderInput ?? '#E5E7EB'}`,
        backgroundColor: commonStyle.colorInput ?? '#FFFFFF',
        color: commonStyle.textColorInput ?? '#1F2937',
      },
      '.Input:focus': {
        borderColor: commonStyle.colorPrimary ?? '#4F46E5',
      },
      '.Input:hover': {
        borderColor: commonStyle.colorBorderInput ?? '#E5E7EB',
      },
      '.Label': {
        color: commonStyle.textColorLabel ?? '#374151',
        fontSize: commonStyle.fontSizeLabel ?? '14px',
        fontWeight: (commonStyle.fontWeightLabel ?? 500).toString(),
      },
      '.Tab': {
        backgroundColor: commonStyle.colorContainer ?? '#FFFFFF',
        borderColor: commonStyle.colorBorderInput ?? '#E5E7EB',
      },
      '.Tab--selected': {
        backgroundColor: commonStyle.colorPrimary ?? '#4F46E5',
        color: commonStyle.textColorPaymentButton ?? '#FFFFFF',
      },
    },
  };
};

/**
 * Provider component for Stripe payment integration
 * Wraps Stripe Elements and handles theme configuration for both payment and setup intents
 * 
 * @component
 * @example
 * ```tsx
 * // For payment intent
 * <StripePaymentProvider
 *   clientSecret="your_client_secret"
 *   appearance={{ theme: 'light' }}
 *   return_url="https://your-return-url.com"
 *   onSuccess={() => console.log('Success')}
 *   intentType="payment"
 * />
 * 
 * // For setup intent
 * <StripePaymentProvider
 *   clientSecret="your_setup_intent_secret"
 *   appearance={{ theme: 'light' }}
 *   return_url="https://your-return-url.com"
 *   onSuccess={() => console.log('Setup Success')}
 *   intentType="setup"
 * />
 * ```
 */
export const StripePaymentProvider: React.FC<PaymobProps> = ({
  clientSecret,
  commonStyle,
  onSuccess,
  onError,
  onCancel,
  return_url,
  isTestnet = false,
  intentType = 'setup'
}) => {
  const options = {
    clientSecret,
    appearance: convertCommonStyleToStripeAppearance(commonStyle),
  };

  const stripePromise = loadStripe(
    isTestnet 
      ? 'pk_test_51Odtp1JYpy7bkFtuwoI9JX5KEjpK66XQ1KO2nzmJ7d0aUM2g2alhMhsA6kELz2VvJO64RpgL82vqoBpAx4WsCjOc00mW98oWYW'
      : 'pk_live_51Odtp1JYpy7bkFturM9ERf1yy1izpUMSIDK10yIigTwhHvzzJjDLzH8bJAk18IGTvnyRBfJg9o6BDGugmJs9ltYS00EL6TSa5T'
  );

  return (
    <Elements stripe={stripePromise} options={options}>
      <StripePaymentForm
        onSuccess={onSuccess}
        onError={onError}
        onCancel={onCancel}
        {...(return_url ? { return_url } : {})}
        commonStyle={commonStyle}
        isTestnet={isTestnet}
        intentType={intentType}
      />
    </Elements>
  );
};
