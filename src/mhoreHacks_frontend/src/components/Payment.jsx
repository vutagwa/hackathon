import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Payment = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handlePayment = async () => {
    try {
      const response = await axios.post('/api/payment', {
        userId: 'user123', 
        amount: 100000.00,    
        currency: 'Ksh.'    
      });
      console.log(response.data);
      setPaymentStatus(response.data);
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  return (
    <div>
      <h2>Payment</h2>
      <Link to="./userContent">
      <button onClick={handlePayment}>Complete</button>
      </Link>

      {paymentStatus && (
        <p>{paymentStatus}</p>
      )}
    </div>
  );
};

export default Payment;
