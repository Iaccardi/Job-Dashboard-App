import React, { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import '../globals.css';

function Hero({ isLoggedIn }) {
  const navigate = useNavigate();

  const paperStyle = {
    background: 'linear-gradient(to right, #fff, #fff)',
    padding: '2rem',
    color: 'black',
    height: '75vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '50px',
  };

 

  const innerContainerStyle = {
    width: '100%',
  };

  const textMarginStyle = {
    marginBottom: '20px', // Adjust the margin as needed
    fontSize: '20px',
    
  };

  const buttonStyle = {
    background: '#1876D2', 
    color: 'white', 
  };

  const headerStyle = {
    fontWeight: 'bold',
    fontSize: '40px', // Default font size
    color: '#004488',
    
    '@media (max-width:600px)': {
      fontSize: '24px', // Adjust the font size for smaller screens
    },
  };

  return (
    <div className="hero-paper">
      <Container className="hero-container" style={innerContainerStyle} maxWidth="md">
        <div>
          <Typography variant="h3" component="div" gutterBottom sx={headerStyle}>
            Custom Career Dashboard
          </Typography>
          <Typography variant="h5" gutterBottom style={textMarginStyle}>
            We offer a <span style={{fontWeight:'bold', color:'#ee8800'}}>COMPLETELY FREE </span> all-in-one suite of tools to help you navigate the market and dive into your career.
          </Typography>
          {/* Conditionally render the button text based on isLoggedIn prop */}
          <Button
            variant="contained"
            style={buttonStyle}
            onClick={() => navigate(isLoggedIn ? '/dashboard' : '/signup')} // Change route based on isLoggedIn
          >
            {isLoggedIn ? 'View Dashboard' : 'Sign Up!'} {/* Change button text */}
          </Button>
        </div>
      </Container>
      {/* Include an image */}
      <img
        className='hero-img'
        src='./images/dashboard_img.png'
        alt="dashboard preview"
        style={{ marginTop: '20px', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)', width: '68%', height: 'auto', marginLeft: '20px' }} // Set width to 75%
      />
    </div>
  );
}

export default Hero;
