import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        // Successful login
        console.log("Login successful!");
        // Redirect or set user authentication state here
      } else {
        // Failed login
        console.error("Login failed!");
        // Handle error, such as displaying an error message
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle error
    }
  };

  return (
    <div style={{ 
      width: '270px', 
      margin: '0 auto', 
      padding: '8px', 
      border: '1px solid #ccc', 
      borderRadius: '7px',
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
              <Link to="/interface">
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
  );
};

export default Login;
