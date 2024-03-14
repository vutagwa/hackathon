import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Payment = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handlePayment = async (amount) => {
    try {
      const response = await axios.post('/api/payment', {
        userId: 'user123',
        amount: amount,
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

      <div style={styles.subscriptionPlans}>
        
        <div style={styles.plan}>
          <h3>Yearly Subscription</h3>
          <p>Ksh.5000</p>
          <Link to=" " ><button style={styles.button} onClick={() => handlePayment(5000)}>Subscribe</button></Link>

          
        </div>

        <div style={styles.plan}>
          <h3>Monthly Subscription</h3>
          <p>Ksh.2000</p>
          <Link to=" " ><button style={styles.button} onClick={() => handlePayment(2000)}>Subscribe</button></Link>
        </div>

        <div style={styles.plan}>
          <h3>Weekly Subscription</h3>
          <p>Ksh.500</p>
          <Link to=" " ><button style={styles.button} onClick={() => handlePayment(500)}>Subscribe</button></Link>
        </div>

        <div style={styles.plan}>
          <h3>Daily Subscription</h3>
          <p>Ksh.100</p>
          <Link to=" " ><button style={styles.button} onClick={() => handlePayment(100)}>Subscribe</button></Link>
        </div>
      </div>

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
    color: '#333', 
  },
  subscriptionPlans: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '30px',
  },
  plan: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '20px',
    width: '200px',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    border: 'none',
    textDecoration: 'none',
  },
  message: {
    marginTop: '20px',
    color: '#28a745', 
  },
};

export default Payment;
