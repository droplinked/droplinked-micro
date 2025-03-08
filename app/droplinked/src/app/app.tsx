import {
  DroplinkedPaymentIntent,
  PaymentType,
} from 'droplinked-payment-intent';
function app() {
  return <DroplinkedPaymentIntent type={PaymentType.Stripe} clientSecret="pi_3R0JysJYpy7bkFtu0zIpAWCr_secret_gMDigNJaZk7I9BRCh2fnrh6eD"  />;
}

export default app;
