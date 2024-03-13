import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [userName, setuserName] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(true); 
  
    const handleChange = (e) => {
      setEmail(e.target.value);
    };
  const handleRegister = () => {
    console.log("Registering with:", email, fullname, username, password);
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
      <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Full names"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      <input
        type="text" 
        placeholder="Username"
        value={userName}
        onChange={(e) =>setuserName(e.target.value)}
        required
      />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Link to="./userContent">
        <button type="submit">Register</button>
      </Link>
      </form>
    </div>
    
  );
};

export default Register;
