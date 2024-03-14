import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Hi! Welcome to Mhore :)</h1>
        <nav>
          <ul style={styles.navList}>
            <li style={styles.navItem}>
            <Link to="/login"><button type="submit" style={styles.button}>login</button></Link>
            </li>
            <li style={styles.navItem}>
            <Link to="/Register"><button type="submit" style={styles.button}>SignUp</button></Link>
            </li>
          </ul>
        </nav>
      </header>
      <div style={styles.content}>
        <p>Home to our website. Explore and enjoy!</p>
      </div>
    </div>
  );
};

const styles = {
    container: {
        maxWidth: '20000px',
        height: '590px',
        margin: '0 auto',
        padding: '20px',
        background: 'linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(https://i.pinimg.com/236x/29/ff/1e/29ff1e5366dee43516a19d9cf8534f59.jpg)',
        backgroundColor: 'transparent', 
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat',
        color: 'grey', 
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: {
    color: '#fff', 
  },
  navList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
  },
  navItem: {
    marginRight: '6px',
    marginTop: '-100px',
  },
  button: {
    backgroundColor: 'grey',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    border: 'none',
    fontWeight: 'bolder',
  },
  navLink: {
    textDecoration: 'none',
    color: 'red',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  content: {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
};

export default Home;
