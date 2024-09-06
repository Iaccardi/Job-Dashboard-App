import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../globals.css'

const SuccessRegistration = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Use setTimeout to delay navigation by 5 seconds (5000 milliseconds)
    const timeoutId = setTimeout(() => {
      navigate('/login');
    }, 5000);

    // Clear the timeout when the component unmounts (cleanup)
    return () => clearTimeout(timeoutId);
  }, [navigate]); // The dependency array should include 'navigate'

  return (
    <div className='success-registration'>
      <Typography className='success-registration' component='h1' variant='h4'>
        You have registered Successfully. Please wait while we redirect you to the login screen...
      </Typography>
    </div>
  );
};

export default SuccessRegistration;
