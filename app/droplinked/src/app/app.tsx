import { DroplinkedPaymentIntent, CommonStyle, ButtonStyle } from 'droplinked-payment-intent';

function app() {
  // تعریف استایل دکمه‌ها
  const submitButtonStyle: ButtonStyle = {
    backgroundColor: '#3B82F6',
    textColor: '#FFFFFF',
    fontSize: '16px',
    fontWeight: 600,
    borderRadius: '8px'
  };

  const cancelButtonStyle: ButtonStyle = {
    backgroundColor: '#374151',
    textColor: '#FFFFFF',
    fontSize: '16px',
    fontWeight: 600,
    borderRadius: '8px'
  };

  // تعریف استایل مشترک
  const commonStyle: CommonStyle = {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSizeLabel: '16px',
    fontSizeInput: '16px',
    fontSizePaymentButton: '16px',
    fontWeightLabel: 500,
    fontWeightInput: 400,
    fontWeightPaymentButton: 600,
    colorContainer: '#1F2937',
    colorBorderInput: '#4B5563',
    colorBorderPaymentButton: 'transparent',
    borderRadius: '12px',
    colorDisabled: '#6B7280',
    colorError: '#EF4444',
    colorPrimary: '#3B82F6',
    colorInput: '#374151',
    textColorLabel: '#F3F4F6',
    textColorPaymentButton: '#FFFFFF',
    textColorInput: '#F3F4F6',
    placeholderColor: '#9CA3AF',
    containerWidth: '100%',
    verticalPadding: '16px',
    verticalSpacing: '20px',
    containerPadding: '24px',
    backgroundBody: '#111827',
    textColorParagraphs: '#F3F4F6',
    submitButton: submitButtonStyle,
    cancelButton: cancelButtonStyle,
    theme: 'dark'
  };

  return (
    <DroplinkedPaymentIntent
      clientSecret="are_csk_test_fa95ff3698576131c8113b9b95a541af"
      type='paymob'
      commonStyle={commonStyle}
      return_url="https://droplinked.com/"
      onSuccess={() => console.log('پرداخت با موفقیت انجام شد')}
      onError={(error) => console.error('خطا در پرداخت:', error)}
    />
  );
}

export default app;