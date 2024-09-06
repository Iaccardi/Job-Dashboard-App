import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import LoginForm from './LoginForm.tsx';
import { useNavigate } from 'react-router-dom';


function SignUpForm() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);
  const navigate = useNavigate();
 

  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Here you would usually send the data to a server
    const data = new FormData(event.currentTarget);
    const userData = {
      name: data.get('name'),
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
    };

    console.log("Sending data: ", userData);

    try {
      const response = await axios.post("http://localhost:3001/api/auth/register", userData);

      if (response.data.success) {
        // Registration is successful
        // Now set the JWT token as a cookie (assuming the server sets the token as a cookie)
        document.cookie = `jwt=${response.data.token}; path=/`;

        // Redirect to dashboard
        setRegistrationSuccessful(true);
        navigate('/success');
        console.log("Registration success");
      } else {
        // Show error message
        console.log("Registration failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container component="main" maxWidth="xs" className='signup-form'>
      {!showLoginForm && (
        <div>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </form>
        </div>
      )}
      {!showLoginForm && (
        <div>
          <Typography variant="body1" align="center">
            Already an existing user?
          </Typography>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            onClick={toggleLoginForm}
          >
            Log In
          </Button>
        </div>
      )}
      {showLoginForm && (
        <LoginForm onLoginSuccess={() => {
          navigate('/dashboard');
        }} />
      )}
    </Container>
  );
}

export default SignUpForm;
