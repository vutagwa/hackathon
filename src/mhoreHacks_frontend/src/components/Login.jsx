import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form submission
    // Handle login logic here
    console.log("Logging in with:", email, password);
  };

  return (
    <div style={{ 
      width: '300px', 
      margin: '0 auto', 
      padding: '20px', 
      border: '1px solid #ccc', 
      borderRadius: '5px' 
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ 
            marginBottom: '15px', 
            padding: '10px', 
            fontSize: '16px', 
            border: '1px solid #ccc', 
            borderRadius: '5px', 
            width: '100%' 
          }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ 
            marginBottom: '15px', 
            padding: '10px', 
            fontSize: '16px', 
            border: '1px solid #ccc', 
            borderRadius: '5px', 
            width: '100%' 
          }}
          required
        />
        <Link to="./components/Payment">
          <button 
            type="submit" 
            style={{ 
              width: '100%', 
              backgroundColor: '#007bff', 
              color: '#fff', 
              padding: '10px', 
              fontSize: '16px', 
              border: 'none', 
              borderRadius: '5px', 
              cursor: 'pointer' 
            }}>
            Login
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
