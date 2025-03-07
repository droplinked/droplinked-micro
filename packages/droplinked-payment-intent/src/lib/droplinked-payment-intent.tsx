// DroplinkedPaymentIntent.tsx
import { PaymentKey } from './enums';

interface DroplinkedPaymentIntentProps {
  paymentKey: PaymentKey; // Renamed to paymentKey to avoid conflict with React's key
}

export function DroplinkedPaymentIntent({
  paymentKey,
}: DroplinkedPaymentIntentProps) {
  const renderComponent = () => {
    console.log({ paymentKey }); // Log the renamed prop
    switch (paymentKey) {
      case PaymentKey.Button:
        return <button>Click Me</button>;
      case PaymentKey.Label:
        return <label>This is a label</label>;
      default:
        return <h1>Invalid Key</h1>;
    }
  };

  return <div>{renderComponent()}</div>;
}

export default DroplinkedPaymentIntent;
