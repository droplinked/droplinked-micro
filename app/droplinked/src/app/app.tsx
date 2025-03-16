import { DroplinkedPaymentIntent, CommonStyle, ButtonStyle } from 'droplinked-payment-intent';

function app() {
  // تعریف استایل دکمه‌ها
  const submitButtonStyle: ButtonStyle = {
    backgroundColor: '#2BCFA1',
    textColor: '#000000',
    fontSize: '14px',
    fontWeight: 500,
    borderRadius: '8px'
  };

  const cancelButtonStyle: ButtonStyle = {
    backgroundColor: '#292929',
    textColor: '#ffffff',
    fontSize: '14px',
    fontWeight: 500,
    borderRadius: '8px'
  };

  // تعریف استایل مشترک
  const commonStyle: CommonStyle = {
    fontFamily: 'avenir',
    fontSizeLabel: '30px',
    fontSizeInput: '30px',
    fontSizePaymentButton: '30px',
    fontWeightLabel: 500,
    fontWeightInput: 400,
    fontWeightPaymentButton: 600,
    colorContainer: 'red',
    colorBorderInput: 'green',
    colorBorderPaymentButton: 'transparent',
    borderRadius: '15px',
    colorDisabled: '#9CA3AF',
    colorError: '#blue',
    colorPrimary: '#2BCFA1',
    colorInput: '#1a1a1a',
    textColorLabel: '#ffffff',
    textColorPaymentButton: '#ffffff',
    textColorInput: '#ffffff',
    placeholderColor: '#7B7B7B',
    containerWidth: '100%',
    verticalPadding: '12px',
    verticalSpacing: '16px',
    containerPadding: '16px',
    backgroundBody: 'gray',
    textColorParagraphs: '#ffffff',
    submitButton: submitButtonStyle,
    cancelButton: cancelButtonStyle,
    theme: 'dark'
  };

  return (
    <DroplinkedPaymentIntent
      clientSecret="are_csk_test_392a791b452032532032f7c17679cf08"
      type='paymob'
      commonStyle={commonStyle}
      return_url="https://droplinked.com/"
      onSuccess={() => console.log('پرداخت با موفقیت انجام شد')}
      onError={(error) => console.error('خطا در پرداخت:', error)}
    />
  );
}

export default app;