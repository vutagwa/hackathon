import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('normal'); 
  const [creatorInfo, setCreatorInfo] = useState({});

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (userType === 'normal') {
      console.log("Registering as normal user with:", email, fullName, userName, password);
    } else {
      console.log("Registering as creator with:", email, fullName, userName, password, creatorInfo);
    }
  };

  const handleCreatorInfoChange = (e) => {
    const { name, value } = e.target;
    setCreatorInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <body style={{  maxWidth: '20000px',
    height: '590px',
    margin: '0 auto',
    padding: '20px',
    background: 'linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(https://i.pinimg.com/236x/29/ff/1e/29ff1e5366dee43516a19d9cf8534f59.jpg)',
    backgroundColor: 'transparent', 
    backgroundSize: 'cover', 
    backgroundRepeat: 'no-repeat',}}>
    <div style={styles.container}>
      <h2 style={styles.heading}>Register</h2>
      <div style={styles.userTypeContainer}>
        <label>
          <input
            type="radio"
            value="normal"
            checked={userType === 'normal'}
            onChange={() => setUserType('normal')}
          />
          Normal
        </label>
        <label>
        
          <input
            type="radio"
            value="creator"
            checked={userType === 'creator'}
            onChange={() => setUserType('creator')}
          />
          Creator
        </label>
      </div>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Full names"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="text" 
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        {userType === 'creator' && (
          <>
            <select
                name="contmode"
                value={creatorInfo.contType || ''}
                onChange={handleCreatorInfoChange}
                style={styles.input}
                required
            >
              <option value="">Select mode</option>
                <option value="video">Video</option>
                 <option value="image">Image</option>
                <option value="document">document</option>
</select>
<select
                name="conttype"
                value={creatorInfo.contType || ''}
                onChange={handleCreatorInfoChange}
                style={styles.input}
                required
            >
              <option value="">Select Content Type</option>
                <option value="Education">Education</option>
                 <option value="Music">Music</option>
                <option value="health">health</option>

</select>
          </>
        )}
                
        <Link to="/payment"><button type="submit" style={styles.button}>Register</button></Link>
        
      </form>
      <Link to="" style={styles.link}>Already have an account? Sign in</Link>
    </div>
    </body>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    margin: '100px',
    width: '300px', 
    padding: '20px', 
    border: '1px solid #ccc', 
    borderRadius: '7px' ,

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
  link: {
    marginTop: '20px',
    display: 'block',
    textDecoration: 'none',
    color: '#007bff',
    fontSize: '15px',
  },
  userTypeContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
};

export default Register;
