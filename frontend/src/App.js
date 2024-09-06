import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from "./components/Navbar.tsx"
import './globals.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUpForm from './components/SignUpForm.tsx';
import Home from './pages/Home.tsx';
import Dashboard from './pages/Dashboard.tsx'
import LoginForm from './components/LoginForm.tsx';
import SuccessRegistration from './components/SucessRegistration.tsx';
import ReviewsSection from './components/Reviews.tsx';
import ProfileForm from './components/ProfileForm.tsx';
import Account from './pages/Account.tsx';
import { parse } from 'cookie';
import { AuthProvider } from './AuthContext.js';
import About from './components/About.tsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState('');

  const handleLoginSuccess = (token) => {
    setIsLoggedIn(true);
    setAuthToken(token);
    console.log("app", token)
  }

  useEffect(() => {
    // Check for the presence of the 'jwt' cookie
    const jwtCookie = parse(document.cookie);
    const storedToken = localStorage.getItem('jwt');

    if(storedToken) {
      setAuthToken(storedToken);
      setIsLoggedIn(true);
    }

    if (jwtCookie.jwt) { // Corrected the token extraction
      console.log(jwtCookie.jwt);
      // Extract the token value from the cookie
      const token = jwtCookie.jwt;
      setIsLoggedIn(true);
      setAuthToken(token);
    }
  }, []);


  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');

  }

 

  return (
    <Router> {/* Wrap your components with Router */}
      <div className="App">
        <Navbar isLoggedIn= {isLoggedIn} onLogout = {handleLogout}/>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home isLoggedIn={isLoggedIn} />} />

          
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/reviews" element={<ReviewsSection />} />
          <Route path="/profile" element={<ProfileForm />} />
          <Route path="/account" element={<Account authToken = {authToken} />} />
          <Route path="/about" element={<About />} />



          <Route path="/login" element={<LoginForm onLoginSuccess= {handleLoginSuccess} />} />
          <Route
              isLoggedIn={isLoggedIn}
              path="/dashboard"
              element={
                <AuthProvider authToken={authToken}>
                  <Dashboard />
                </AuthProvider>
                }/>          
          <Route path="/success" element={<SuccessRegistration />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
