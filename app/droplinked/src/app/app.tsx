import { DroplinkedPaymentIntent, PaymentKey } from 'droplinked-payment-intent';
function app() {
  return <DroplinkedPaymentIntent paymentKey={PaymentKey.Label} />;
}

export default app;
