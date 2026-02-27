const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User');


// backend/routes/auth.js
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check for existing user first
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      displayName: name,
      email: email,
      password: hashedPassword
    });

    // CRITICAL: You must send this back to trigger the frontend 'try' block
    return res.status(201).json({ 
      success: true, 
      message: "User created successfully" 
    });

  } catch (err) {
    console.error(err);
    // If you reach here, Axios triggers the 'catch' block
    res.status(500).json({ error: "Server error" });
  }
});


router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    
    // If login fails, send a 401 error message that React can catch
    if (!user) {
      return res.status(401).json({ message: info.message || "Login Failed" });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      
      // Send a success response. React will handle the redirect.
      return res.status(200).json({ 
        success: true, 
        message: "Logged in successfully",
        user: user 
      });
    });
  })(req, res, next);
});

// GitHub Routes
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', 
  passport.authenticate('github', { 
    successRedirect: 'http://localhost:5173/profile',
    failureRedirect: 'http://localhost:5173/login' 
  })
);

// LinkedIn Routes
router.get('/linkedin', passport.authenticate('linkedin', { scope: ['openid', 'profile', 'email'] }));

router.get('/linkedin/callback', 
  passport.authenticate('linkedin', { 
    successRedirect: 'http://localhost:5173/profile',
    failureRedirect: 'http://localhost:5173/login' 
  })
);

// Get Current User (Used by React to check if logged in)
router.get('/current_user', (req, res) => {
  if (req.user) {
    res.status(200).json(req.user); // Send user data if logged in
  } else {
    res.status(200).json(null); // Send null if no session found
  }
});


// Logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('http://localhost:5173');
  });
});

module.exports = router;