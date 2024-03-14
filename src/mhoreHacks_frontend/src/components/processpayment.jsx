import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { NoEmitOnErrorsPlugin } from 'webpack';

const processpayment = () =>{
const handleApprove = async (data, actions) => {
    try {
  
      setIsPaid(true);
  s
      const order = await actions.order.capture();
  
      console.log('Order captured:', order);
  
      return order;
    } catch (error) {
      e
      console.error('Error capturing order:', error);
      return null;
    }
};

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>PayPal Payment</h2>
      <PayPalScriptProvider options={{ 
        'client-id': 'YOUR_PAYPAL_CLIENT_ID',
        currency: 'Ksh.' 
      }}>
        <PayPalButtons 
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: '100.00' 
                }
              }]
            });
          }}
          onApprove={handleApprove}
        />
      </PayPalScriptProvider>
      {isPaid && <p>Payment Successful!</p>}
    </div>      
     );
    };
    const styles = {
        container:{ 
           border :none,
           padding: '10px, 20px',
           cursor:'pointer',
           border_radius: '5px',
           font_size:'16px',
        }
}

export default PayPalPayment;
