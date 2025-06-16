# Droplinked Payment Intent

A unified React payment component library that supports multiple payment providers (Stripe and Paymob) with customizable styling.

[![npm version](https://img.shields.io/npm/v/droplinked-payment-intent.svg)](https://www.npmjs.com/package/droplinked-payment-intent)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Features

- 🔄 Unified API for multiple payment providers
- 💳 Support for Stripe and Paymob payment gateways
- 🎨 Highly customizable UI with comprehensive styling options
- 🌐 Support for both testnet and production environments
- 📱 Responsive design for all device sizes
- 🔒 Secure payment processing

## Installation

```bash
# Using npm
npm install droplinked-payment-intent

# Using yarn
yarn add droplinked-payment-intent

# Using pnpm
pnpm add droplinked-payment-intent
```

## Quick Start

```jsx
import React from 'react';
import { DroplinkedPaymentIntent } from 'droplinked-payment-intent';

function PaymentPage() {
  return (
    <div className="payment-container">
      <h2>Complete Your Payment</h2>
      <DroplinkedPaymentIntent
        clientSecret="your_client_secret"
        type="stripe" // or "paymob"
        return_url="https://your-return-url.com"
        onSuccess={() => console.log('Payment successful')}
        onError={(error) => console.error('Payment failed', error)}
        isTestnet={true} // Set to false for production
        intentType="payment" // or "setup"
      />
    </div>
  );
}

export default PaymentPage;
```

## API Reference

### DroplinkedPaymentIntent Component

The main component that renders a payment form based on the specified provider.

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `clientSecret` | string | Yes | - | Secret key for payment authentication |
| `type` | 'stripe' \| 'paymob' | Yes | - | Payment provider type |
| `return_url` | string | No | `window.location.href` | URL to redirect after payment completion |
| `commonStyle` | CommonStyle | No | defaultCommonStyle | Styling options for the payment component |
| `onSuccess` | () => void | No | - | Callback function on successful payment |
| `onError` | (error: unknown) => void | No | - | Callback function on payment error |
| `isTestnet` | boolean | No | false | Indicates whether the payment is in testnet mode |
| `intentType` | 'payment' \| 'setup' | No | 'payment' | Indicates the type of payment intent ('payment' or 'setup') |

### Styling Options

The component accepts a `commonStyle` prop that allows for comprehensive customization of the payment form.

```jsx
// Example of custom styling
const customStyle = {
  fontFamily: 'Roboto, sans-serif',
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
  theme: 'light', // 'light' or 'dark'
  submitButton: {
    backgroundColor: '#4F46E5',
    textColor: '#FFFFFF',
    fontSize: '14px',
    fontWeight: 500,
    borderRadius: '4px'
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
    textColor: '#4B5563',
    fontSize: '14px',
    fontWeight: 500,
    borderRadius: '4px'
  }
};
```

## Payment Providers

### Stripe

For Stripe payments, the component uses Stripe Elements to render a secure payment form. You need to obtain a client secret from your backend.

```jsx
<DroplinkedPaymentIntent
  clientSecret="your_stripe_client_secret"
  type="stripe"
  return_url="https://your-return-url.com"
  isTestnet={true}
/>
```

### Paymob

For Paymob payments, the component integrates with Paymob Pixel SDK to handle payment processing.

```jsx
<DroplinkedPaymentIntent
  clientSecret="your_paymob_client_secret"
  type="paymob"
  commonStyle={commonStyle}
  return_url="https://droplinked.com/"
  onSuccess={() => console.log('Payment successful')}
  onError={(error) => console.error('Payment failed: ', error)}    
  isTestnet={true}
/>
```

## Browser Support

The library supports all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT © [Droplinked](https://droplinked.com)
