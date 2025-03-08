import { DroplinkedPaymentIntent,  Appearance } from 'droplinked-payment-intent';

function app() {
  const appearance: Appearance = {
    theme: 'dark',
    labels: 'above',
    variables: {
      colorBackground: '#1a1a1a',
      colorBackgroundText: '#ffffff',
      colorText: '#ffffff',
      borderRadius: '8px',
      colorSuccess: '#2BCFA1',
      colorDanger: '#FF2244',
      focusOutline: 'unset',
      focusBoxShadow: 'none',
    },
    rules: {
      '.Input:focus': {
        border: '1px solid #7B7B7B',
      },
      '.Input:hover': {
        border: '1px solid #3C3C3C',
      },
      '.Input': {
        border: '1px solid #292929',
        borderRadius: '8px',
        padding: '10px',
        marginBottom: '12px',
      },
      '.Label': {
        marginBottom: '12px',
        fontWeight: '500',
      },
    }
  };

  return (
    <DroplinkedPaymentIntent 
      clientSecret="pi_3R0LESJYpy7bkFtu1JA4ZrYM_secret_JTYYYectX3YhsNUmTJGVJKgIe"
      type='stripe'
      appearance={appearance}
      return_url="droplinked.com"
      onSuccess={() => console.log('پرداخت با موفقیت انجام شد')}
      onError={(error) => console.error('خطا در پرداخت:', error)}
    />
  );
}

export default app;