import React from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../globals.css';
import Cookies from 'js-cookie';
 

function LoginForm({ onLoginSuccess }) {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('Logging you in');

    try {
      const data = new FormData(event.currentTarget);
      const loginData = {
        username: data.get('username'),
        password: data.get('password'),
      };

      console.log(loginData);

      const response = await axios.post('http://localhost:3001/api/auth/login', loginData, {
        withCredentials: true, // Send cookies with the request
      });

      if (response.data.success) {
        // Redirect to dashboard on successful login
        console.log('Successful login');
        onLoginSuccess(response.data.token);
        Cookies.set('jwt', response.data.token, {sameSite: 'strict'});
        console.log(response.data.token);
        localStorage.setItem('jwt', response.data.token);
        navigate('/dashboard');
      } else {
        // Log login failure with the error message
        console.log('Login failed:', response.data.message);
      }
    } catch (error) {
      // Log any other errors that occur during the login process
      console.error('Error during login:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs" className="login-form">
      <Typography component="h1" variant="h4">
        Login:
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default LoginForm;
