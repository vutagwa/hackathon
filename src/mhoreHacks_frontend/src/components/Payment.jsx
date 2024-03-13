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
    <div style={styles.container}>
      <h2 style={styles.heading}>Payment</h2>
      <Link to="./userContent">
        <button style={styles.button} onClick={handlePayment}>Complete</button>
      </Link>

      {paymentStatus && (
        <p style={styles.message}>{paymentStatus}</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
    border: 'none',
    textDecoration: 'none',
  },
  message: {
    marginTop: '20px',
    color: '#28a745', // Green color
  },
};

export default Payment;
