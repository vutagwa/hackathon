import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Payment = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState('monthly'); 
  const [cardNumber, setCardNumber] = useState('');
  const [amount, setAmount] = useState(1000);

  const handlePlanChange = (event) => {
    setSelectedPlan(event.target.value);
  };

  // calculate total amount based on the selected plan
  const calculateTotalAmount = () => {
    const monthlyPrice = 1000;
    const yearlyPrice = 10000;
    return selectedPlan === 'monthly' ? monthlyPrice : yearlyPrice;
  };

  // Function to handle payment
  const handlePayment = async () => {
    try {
      const totalAmount = calculateTotalAmount();
      const response = await paymentBackend.processPayment({
        userId: 'user123',
        amount: totalAmount,
        currency: 'Ksh.'
      });
      console.log(response);
      setPaymentStatus(response);
    } catch (error) {
      console.error('Error processing payment:', error);
      setPaymentStatus('Payment failed. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Payment</h2>

      <div style={styles.subscriptionPlans}>
        <div style={styles.plan}>
          <input
            type="radio"
            id="monthly"
            name="plan"
            value="monthly"
            checked={selectedPlan === 'monthly'}
            onChange={handlePlanChange}
          />
          <label style={styles.pay}>Monthly Plan (ksh.1000/month)</label>
        </div>
        <div style={styles.plan}>
          <input
            type="radio"
            id="yearly"
            name="plan"
            value="yearly"
            checked={selectedPlan === 'yearly'}
            onChange={handlePlanChange}
          />
          <label style={styles.pay}>Yearly Plan (ksh.10000/year)</label>
        </div>
      </div>

      <input
        type="text"
        placeholder="Enter Card Number"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        style={styles.input}
        required
      />
        <Link to="/Login"> <button style={styles.button} onClick={handlePayment}>Activate Account</button>
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
    margin: '100px auto',
    width: '300px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '7px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    border: 'none',
  },
  subscriptionPlans: {
    textAlign: 'left',
    marginTop: '20px',
  },
  plan: {
    marginBottom: '10px',
  },
  pay: {
    fontSize: '16px',
    marginLeft: '10px',
  },
  message: {
    marginTop: '20px',
    color: 'green',
    fontWeight: 'bold',
  },
};

export default Payment;
