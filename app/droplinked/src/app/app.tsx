import { DroplinkedPaymentIntent, CommonStyle, ButtonStyle } from 'droplinked-payment-intent';
import './app.styles.css';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

function app() {
  return (
    <div className="app-container">
      <DroplinkedPaymentIntent
  clientSecret="pi_3RAVLUJYpy7bkFtu1iv7olk7_secret_pdRNZT3xehJh4mr0YllVSpk5K"
  type='stripe'
  return_url="https://droplinked.com/"
  onSuccess={() => console.log('confirmtion success')}
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