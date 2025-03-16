import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Appearance as StripeAppearance } from '@stripe/stripe-js';
import { StripePaymentForm } from './StripePaymentForm';
import { PaymentElementProps, CommonStyle ,PaymentType } from '../droplinked-payment-intent';

// Initialize Stripe instance outside of component for better performance
const stripePromise = loadStripe(
  'pk_test_51Odtp1JYpy7bkFtuwoI9JX5KEjpK66XQ1KO2nzmJ7d0aUM2g2alhMhsA6kELz2VvJO64RpgL82vqoBpAx4WsCjOc00mW98oWYW'
);
//sfs
/**
 * Props type for StripePaymentProvider, excluding the 'type' field from PaymentElementProps
 */
type StripePaymentProviderProps = Omit<PaymentElementProps, 'type'>;

interface PaymobProps {
  clientSecret: string;
  commonStyle: CommonStyle;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  return_url: string;
}

/**
 * تبدیل CommonStyle به Appearance مورد نیاز Stripe
 */
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
      fontWeightNormal: commonStyle.fontWeightInput.toString(),
      fontLineHeight: '1.5',
      // اضافه کردن متغیرهای خاص Stripe
      focusOutline: 'unset',
      focusBoxShadow: 'none',
      colorSuccess: commonStyle.colorPrimary,
    },
    rules: {
      '.Input': {
        border: `1px solid ${commonStyle.colorBorderInput}`,
        backgroundColor: commonStyle.colorInput,
        color: commonStyle.textColorInput,
      },
      '.Input:focus': {
        borderColor: commonStyle.colorPrimary,
      },
      '.Input:hover': {
        borderColor: commonStyle.colorBorderInput,
      },
      '.Label': {
        color: commonStyle.textColorLabel,
        fontSize: commonStyle.fontSizeLabel,
        fontWeight: commonStyle.fontWeightLabel.toString(),
      },
      '.Tab': {
        backgroundColor: commonStyle.colorContainer,
        borderColor: commonStyle.colorBorderInput,
      },
      '.Tab--selected': {
        backgroundColor: commonStyle.colorPrimary,
        color: commonStyle.textColorPaymentButton,
      },
    },
  };
};

/**
 * Provider component for Stripe payment integration
 * Wraps Stripe Elements and handles theme configuration
 * 
 * @component
 * @example
 * ```tsx
 * <StripePaymentProvider
 *   clientSecret="your_client_secret"
 *   appearance={{ theme: 'light' }}
 *   return_url="https://your-return-url.com"
 *   onSuccess={() => console.log('Success')}
 * />
 * ```
 * 
 * @param {Object} props
 * @param {string} props.clientSecret - Stripe client secret for payment session
 * @param {Appearance} [props.appearance] - Custom appearance configuration
 * @param {() => void} [props.onSuccess] - Success callback
 * @param {(error: unknown) => void} [props.onError] - Error callback
 * @param {Object} [props.formProps] - Additional form element props
 * @param {Object} [props.ActionButtonsContainerProps] - Props for action buttons container
 * @param {Object} [props.cancelButtonProps] - Props for cancel button
 * @param {Object} [props.submitButtonProps] - Props for submit button
 * @param {string} props.return_url - URL to redirect after payment
 * 
 * @returns {JSX.Element} Wrapped Stripe payment form with configured Elements provider
 */
export const StripePaymentProvider: React.FC<PaymobProps> = ({
  clientSecret,
  commonStyle ,
  onSuccess,
  onError,
  return_url,
}) => {
  const options = {
    clientSecret,
    appearance: convertCommonStyleToStripeAppearance(commonStyle),
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <StripePaymentForm
        onSuccess={onSuccess}
        onError={onError}
        return_url={return_url}
        commonStyle={commonStyle}
      />
    </Elements>
  );
};
