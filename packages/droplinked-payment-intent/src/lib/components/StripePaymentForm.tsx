import React from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

/**
 * Props interface for the StripePaymentForm component
 * @typedef {Object} StripePaymentFormProps
 */
type StripePaymentFormProps = {
  /** Callback function called after successful payment */
  onSuccess?: (result: any) => void;
  /** Callback function called when an error occurs */
  onError?: (error: any) => void;
  /** Additional props for the form element */
  formProps?: React.HTMLAttributes<HTMLFormElement>;
  /** Props for the container of action buttons */
  ActionButtonsContainerProps?: React.HTMLAttributes<HTMLDivElement>;
  /** Props for the cancel button */
  cancelButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  /** Props for the submit button */
  submitButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  /** URL to redirect after payment completion */
  return_url?: string;
};

/**
 * Stripe Payment Form Component
 * Renders a form with Stripe's PaymentElement and handles payment submission
 * 
 * @component
 * @example
 * ```tsx
 * <StripePaymentForm
 *   onSuccess={(result) => console.log('Payment successful', result)}
 *   onError={(error) => console.error('Payment failed', error)}
 *   return_url="https://your-return-url.com"
 * />
 * ```
 */
export const StripePaymentForm: React.FC<StripePaymentFormProps> = ({
  onSuccess,
  onError,
  formProps,
  ActionButtonsContainerProps,
  cancelButtonProps,
  submitButtonProps,  
  return_url
}) => {
  // Initialize Stripe hooks
  const stripe = useStripe();
  const elements = useElements();

  /**
   * Handles form submission and payment confirmation
   * @param {React.FormEvent} event - Form submission event
   */
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate Stripe initialization
    if (!stripe || !elements) {
      return;
    }

    try {
      // Attempt to confirm payment with Stripe
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: return_url || window.location.href, 
        },
      });

      // Handle payment result
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
        {/* Container for Stripe's PaymentElement */}
        <div className="stripe-element-container">
          <PaymentElement />
        </div>
        {/* Action buttons container */}
        <div {...ActionButtonsContainerProps}>
          <button type="button" disabled={!stripe} {...cancelButtonProps}>
            Cancel
          </button>
          <button
            type="submit"
            {...submitButtonProps}
            disabled={!stripe}
          >
            Pay
          </button>
        </div>
      </form>
    </div>
  );
}; 