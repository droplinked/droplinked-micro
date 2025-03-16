import { DroplinkedPaymentIntent, Appearance } from 'droplinked-payment-intent';

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

  const buttonBaseStyle = {
    padding: '10px 20px',
    borderRadius: '8px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  const disabledStyle = {
    opacity: 0.6,
    cursor: 'not-allowed',
    pointerEvents: 'none' as const
  };

  return (
    <DroplinkedPaymentIntent
      clientSecret="are_csk_test_621793f1b1f56df219c793ccee39e4e4"
      type='paymob'
      appearance={appearance}
      return_url="https://droplinked.com/"
      onSuccess={() => console.log('پرداخت با موفقیت انجام شد')}
      onError={(error) => console.error('خطا در پرداخت:', error)}
      // ActionButtonsContainerProps={{
      //   style: {
      //     display: 'flex',
      //     gap: '12px',
      //     marginTop: '20px'
      //   }
      // }}
      // submitButtonProps={{
      //   style: {
      //     ...buttonBaseStyle,
      //     ...(true ? disabledStyle : {}),
      //     backgroundColor: '#2BCFA1',
      //     color: '#000000',
      //     border: 'none',
      //   },
      //   disabled: true
      // }}
      // cancelButtonProps={{
      //   style: {
      //     ...buttonBaseStyle,
      //     ...(true ? disabledStyle : {}),
      //     backgroundColor: '#292929',
      //     color: '#ffffff',
      //     border: '1px solid #3C3C3C',
      //   },
      //   disabled: true
      // }}
    />
  );
}
//
export default app;