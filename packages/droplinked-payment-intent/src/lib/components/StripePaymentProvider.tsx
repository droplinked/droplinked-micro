import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { StripePaymentForm } from './StripePaymentForm';
import { PaymentElementProps } from '../droplinked-payment-intent';

// Initialize Stripe instance outside of component for better performance
const stripePromise = loadStripe(
  'pk_test_51Odtp1JYpy7bkFtuwoI9JX5KEjpK66XQ1KO2nzmJ7d0aUM2g2alhMhsA6kELz2VvJO64RpgL82vqoBpAx4WsCjOc00mW98oWYW'
);

/**
 * Props type for StripePaymentProvider, excluding the 'type' field from PaymentElementProps
 */
type StripePaymentProviderProps = Omit<PaymentElementProps, 'type'>;

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
  // Map component theme to Stripe-specific theme values
  const stripeTheme: 'flat' | 'stripe' | 'night' = appearance?.theme === 'light' 
    ? 'stripe' 
    : appearance?.theme === 'dark' 
      ? 'night' 
      : 'flat';

  // Configure Stripe Elements options
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
