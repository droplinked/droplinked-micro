import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CommonStyle } from '../droplinked-payment-intent';

/**
 * Props interface for the StripePaymentForm component
 * @typedef {Object} StripePaymentFormProps
 */
type StripePaymentFormProps = {
  /** Callback function called after successful payment or setup */
  onSuccess?: (result: any) => void;
  /** Callback function called when an error occurs */
  onError?: (error: any) => void;
  onCancel?: () => void;
  /** URL to redirect after payment completion */
  return_url?: string;
  /** Common style for the component */
  commonStyle?: CommonStyle;
  /** Indicates if the payment is for a testnet */
  isTestnet?: boolean;
  /** Type of intent - payment or setup */
  intentType?: 'payment' | 'setup';
};

/**
 * Stripe Payment Form Component
 * Renders a form with Stripe's PaymentElement and handles payment or setup submission
 * 
 * @component
 * @example
 * ```tsx
 * <StripePaymentForm
 *   onSuccess={(result) => console.log('Payment successful', result)}
 *   onError={(error) => console.error('Payment failed', error)}
 *   return_url="https://your-return-url.com"
 *   intentType="payment"
 * />
 * ```
 */
export const StripePaymentForm: React.FC<StripePaymentFormProps> = ({
  onSuccess,
  onError,
  onCancel,
  return_url,
  commonStyle,
  isTestnet,
  intentType = 'payment'
}) => {
  // Initialize Stripe hooks
  const stripe = useStripe();
  const elements = useElements();
  
  // New state for loading
  const [loading, setLoading] = useState(false);

  /**
   * Handles form submission and payment/setup confirmation
   * @param {React.FormEvent} event - Form submission event
   */
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    try {
      let result;
      
      if (intentType === 'setup') {
        if (return_url) {
          result = await stripe.confirmSetup({
            elements,
            confirmParams: {
              return_url,
            },
          });
        } else {
          result = await stripe.confirmSetup({
            elements,
            redirect: "if_required"
          });
        }
      } else {
        if (return_url) {
          result = await stripe.confirmPayment({
            elements,
            confirmParams: {
              return_url,
            },
          });
        } else {
          result = await stripe.confirmPayment({
            elements,
            redirect: "if_required"
          });
        }
      }

      // Handle result
      if (result.error) {
        onError?.(result.error);
      } else {
        onSuccess?.(result);
      }
    } catch (error) {
      onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  const containerStyle: React.CSSProperties = {
    width: commonStyle?.containerWidth || '100%',
    padding: commonStyle?.containerPadding || '16px',
    backgroundColor: commonStyle?.colorContainer || '#ffffff',
  };

  const buttonContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: commonStyle?.verticalSpacing || '16px',
  };
  

  const submitButtonStyle: React.CSSProperties = {
    backgroundColor: commonStyle?.submitButton?.backgroundColor ?? '#4F46E5',
    color: commonStyle?.submitButton?.textColor ?? '#FFFFFF',
    fontSize: commonStyle?.submitButton?.fontSize ?? '14px',
    fontWeight: commonStyle?.submitButton?.fontWeight ?? 500,
    borderRadius: commonStyle?.submitButton?.borderRadius ?? '4px',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    opacity: loading ? 0.5 : 1,
  };

  const cancelButtonStyle: React.CSSProperties = {
    backgroundColor: commonStyle?.cancelButton?.backgroundColor ?? '#F3F4F6',
    color: commonStyle?.cancelButton?.textColor ?? '#4B5563',
    fontSize: commonStyle?.cancelButton?.fontSize ?? '14px',
    fontWeight: commonStyle?.cancelButton?.fontWeight ?? 500,
    borderRadius: commonStyle?.cancelButton?.borderRadius ?? '4px',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    opacity: loading ? 0.5 : 1,
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: commonStyle?.verticalSpacing || '16px' }}>
          <PaymentElement />
        </div>
        <div style={buttonContainerStyle}>
          <button
            type="button"
            style={{ ...cancelButtonStyle, cursor: loading ? 'not-allowed' : 'pointer' }}
            disabled={!stripe || loading}
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{ ...submitButtonStyle, cursor: loading ? 'not-allowed' : 'pointer' }}
            disabled={!stripe || loading}
          >
            Pay
          </button>
        </div>
      </form>
    </div>
  );
}; 