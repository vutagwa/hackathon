import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Payment = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handlePaymentSuccess = (details, data) => {
    // Handle payment success
    console.log('Payment successful:', details);
    setPaymentStatus('active');
    // Make API call to update account status in your backend
  };

  const handlePaymentError = (err) => {
    // Handle payment error
    console.error('Payment error:', err);
    setPaymentStatus('expired');
  };

  return (
    <div>
      <h2>Payment</h2>
      <Link to="./components/userContent">
      <PayPalButton
        amount="10.00" // Example amount
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
      />
      </Link>
      
      {paymentStatus && (
        <p>Account Status: {paymentStatus === 'active' ? 'Active' : 'Expired'}</p>
      )}
    </div>
  );
};

export default Payment;
