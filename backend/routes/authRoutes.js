const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { db, User } = require('../database.js');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser'); // Import cookie-parser
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET;

// Use cookie-parser middleware
router.use(cookieParser());

// Validation middleware for user registration
const validateRegistration = [
  check('username').notEmpty().withMessage('Username is required'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  check('email').isEmail().withMessage('Invalid email address'),
  check('name').notEmpty().withMessage('Name is required'),
];

// User registration route
router.post('/register', validateRegistration, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if the username or email already exists in the database
    const existingUser = await User.findOne({
      where: {
        [db.Sequelize.Op.or]: [{ username: req.body.username }, { email: req.body.email }],
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    // Create a new user in the database
    const newUser = await User.create({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    });

    res.json({ success: true, message: 'Registration Successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// User login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username in the database
    const user = await User.findOne({ where: { username } });

    if (!user) {
      console.log('User not found');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if the provided password matches the stored password
    if (password !== user.password) {
      console.log('Invalid password');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const payload = {
      userId: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
      careerField : user.careerField,
      degree: user.degree,
      expectedSalary: user.expectedSalary,
      skills: user.skills,
      experienceLevel: user.experienceLevel
    }

    const token = jwt.sign(
      payload, 
      SECRET_KEY,
      {expiresIn: '3d'}
    );

    // Set the token as a cookie with options
    res.cookie('jwt', token, {
      httpOnly: true, // HTTP-only for security
      sameSite: 'none', // Set the sameSite attribute as needed
      secure: true, // Set secure attribute as needed
    });

    res.json({ success: true, message: 'Login Successful', token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;
