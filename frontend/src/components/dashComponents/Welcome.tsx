import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import '../../globals.css'

const Welcome = ({ authToken, username }) => {
  return (
    <Card className='welcome-card'>
      <CardContent className='welcome-card'>
        {username ? (
          <Typography variant="h5" component="div">
            Welcome,{' '}
            <span style={{ fontWeight: 'bold', color: '#1876D2' }}>{username}</span>!
          </Typography>
        ) : (
          <Typography variant="h5" component="div">
            Welcome
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default Welcome;
