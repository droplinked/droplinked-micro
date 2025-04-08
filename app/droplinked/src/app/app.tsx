import { DroplinkedPaymentIntent, CommonStyle, ButtonStyle } from 'droplinked-payment-intent';
import './app.styles.css';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

function app() {
  return (
    <div className="app-container">
      <DroplinkedPaymentIntent
  clientSecret="pi_3RBbZNJYpy7bkFtu0MYKLm9n_secret_HxiSfXRaujQqBUzEZB2rzjrx1"
  type='stripe'
  return_url="https://droplinked.com/"
  onSuccess={() => console.log('confirmtion success')}
  onCancel={() => console.log('asdfasdfasd success')}
  onError={(error) => console.error('error', error)}
  isTestnet={true}
/>
    </div>
  );
}


const PaymentWrapper = () => {
 
  return ;
};

export default app;