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
  };

  return (
    <DroplinkedPaymentIntent
      clientSecret="pi_3R3aWLJYpy7bkFtu1CZ6xfBo_secret_HmYaeWuS3uzfkPVDk20ZCifpm"
      type='stripe'
     // commonStyle={commonStyle}
      return_url="https://droplinked.com/"
      onSuccess={() => console.log('پرداخت با موفقیت انجام شد')}
      onError={(error) => console.error('خطا در پرداخت:', error)}
      isTestnet={true}
    />
  );
}

export default app;