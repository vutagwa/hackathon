import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('normal'); // Default to normal user

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, userType }), // Include userType in login request
      });
      if (response.ok) {
        // Successful login
        console.log("Login successful!");
      } else {
        // Failed login
        console.error("Login failed!");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <body>
    <div style={{ 
      width: '300px', 
      margin: '0 auto', 
      padding: '8px', 
      border: '1px solid #ccc', 
      borderRadius: '7px',
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '15px' }}>
          <label>
            <input
              type="radio"
              value="normal"
              checked={userType === 'normal'}
              onChange={() => setUserType('normal')}
            />
            Normal User
          </label>
          <label style={{ marginLeft: '15px' }}>
            <input
              type="radio"
              value="creator"
              checked={userType === 'creator'}
              onChange={() => setUserType('creator')}
            />
            Creator
          </label>
        </div>
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
       
        <Link to="/register"><button 
        type="submit" 
        style={{ 
          width: '200%', 
          backgroundColor: '#007bff', 
          position: 'center',
          color: '#fff', 
          padding:'20px', 
          fontSize: '16px', 
          border: 'none', 
          borderRadius: '6px', 
          cursor: 'pointer' 
        }}>
        Login
      </button></Link>
        <Link to="/register" style={{
          marginTop: '4px',
          display: 'block',
          textDecoration: 'none',
          color: '#007bff',
          fontSize: '15px'
        }}>Don't have an account? Sign in</Link>
      </form>
    </div>
    </body>
  );
};

export default Login;
