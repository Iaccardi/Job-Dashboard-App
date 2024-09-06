import React, { useState, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import Hero from '../components/Hero.tsx';
import { useAuth } from '../AuthContext.js';

const Home = ({isLoggedIn}) => {



  

  return (
    <Container maxWidth="lg">
      <Grid className='homepage' container spacing={2}>
        <Grid item xs={12}>
          <Hero isLoggedIn={isLoggedIn}/>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
