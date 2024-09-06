const express = require('express');
const cors = require('cors'); // Import the cors middleware
const router = express.Router();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser'); // Import cookie-parser
const secretKey = process.env.JWT_SECRET; // Replace with your actual secret key
const { User } = require('../models/User.js');
const { check, validationResult } = require('express-validator');
const passport = require('passport'); // Import passport
const passportJwt = require('passport-jwt'); // Import passport-jwt

// Use cookie-parser middleware
router.use(cookieParser());

// Configure CORS with credentials support
router.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Create a strategy that uses the 'Bearer' scheme from the Authorization header
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'), // Use the 'Bearer' scheme
  secretOrKey: secretKey, // Replace with your actual secret key
};

// Use the passport-jwt strategy
passport.use(new JwtStrategy(jwtOptions, (jwtPayload, done) => {
  // User is authenticated, you can access jwtPayload to get user information
  done(null, { userId: jwtPayload.userId }); // Pass the user's ID to the next middleware
}));

// Middleware for verifying JWT token using passport-jwt
function verifyToken(req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      // Handle token verification error (e.g., invalid token)
      console.error('Token verification error:', err); // Log the error
      res.status(401).json({ message: 'Unauthorized token' });
    } else {
      // User is authenticated, you can access user.userId to get user information
      console.log('User ID:', user.userId); // Log the user ID
      req.userId = user.userId; // Add the user's ID to the request for later use
      next(); // Proceed to the next middleware or route handler
    }
  })(req, res, next);
}

router.get('/log-cookie', (req, res) => {
  console.log('Received JWT cookie:', req.cookies.jwt);
  res.send('Cookie logged');
});

// Define your routes here

router.get('/userdata', verifyToken, async (req, res) => {
  try {
    // Retrieve user data from the database based on the user's token (authentication)
    const user = await User.findOne({
      where: { id: req.userId }, // Use the user's ID for identification
      attributes: ['name', 'email', 'careerField', 'degree', 'expectedSalary', 'skills', 'experienceLevel'],
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching user data' });
  }
});




router.post('/updateAccount', verifyToken, async (req, res) => {
  try {
    // Get the user's ID from the request (provided by the verifyToken middleware)
    const userId = req.userId;

    // Get the form data from the request body
    const {
      name,
      email,
      careerField,
      degree,
      expectedSalary,
      skills,
      experienceLevel,
    } = req.body;

    // Update the user's account information based on their ID
    const updatedUser = await User.update(
      {
        name,
        email,
        careerField,
        degree,
        expectedSalary,
        skills,
        experienceLevel,
      },
      {
        where: { id: userId },
      }
    );

    if (updatedUser) {
      res.status(200).json({ success: true, message: 'Account information updated successfully' });
    } else {
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  } catch (error) {
    console.error('Error updating account information:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/register', async (req, res) => {
  try {
    console.log("Received data", req.body);
    const { name, username, password, email } = req.body;

    const newUser = await User.create({
      name,
      username,
      email,
      password,
    });

    res.json({ message: "Registration Successful" });
  } catch (err) {
    console.log("Failed to retrieve");
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
});

router.post('/updateProfile', verifyToken, async (req, res) => {
  try {
    // Get the user's ID from the request (provided by the verifyToken middleware)
    const userId = req.userId;

    // Get the form data from the request body
    const {
      careerField,
      degree,
      expectedSalary,
      skills,
      experienceLevel,
    } = req.body;

    // Update the user's profile based on their ID
    const updatedUser = await User.update(
      {
        careerField,
        degree,
        expectedSalary,
        skills,
        experienceLevel,
      },
      {
        where: { id: userId },
      }
    );

    if (updatedUser) {
      res.status(200).json({ message: 'Profile updated successfully' });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
