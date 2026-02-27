const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const app = express();
const cors = require('cors');

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:5173', // Your React port
  credentials: true,               // MUST be true to allow cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 1. Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// 2. Session Middleware (Required for Passport)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true only if using HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// 3. Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Import and use routes
app.use('/auth', require('./routes/auth'));

// 4. Passport Serialization
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id); // Find user by ID on every request
  done(null, user);
});

// 5. GitHub Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    let user = await User.findOne({ githubId: profile.id });
    if (!user) {
      user = await User.create({
        githubId: profile.id,
        displayName: profile.displayName || profile.username,
        avatar: profile.photos[0].value
      });
    }
    return done(null, user);
  }
));

// 6. LinkedIn Strategy
passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/linkedin/callback",
    scope: ['openid', 'profile', 'email'], // MUST include openid
    state: true
  },
  async (accessToken, refreshToken, profile, done) => {
    // LinkedIn OIDC profile fields are now: profile.id, profile.displayName, profile.emails[0].value, profile.photos[0].value
    let user = await User.findOne({ linkedinId: profile.id });
    if (!user) {
      user = await User.create({
        linkedinId: profile.id,
        displayName: profile.displayName,
        avatar: profile.photos ? profile.photos[0].value : null,
        email: profile.emails ? profile.emails[0].value : null
      });
    }
    return done(null, user);
  }
));

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return done(null, false, { message: 'Incorrect email or password.' });
    }
    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return done(null, false, { message: 'Incorrect email or password.' });
    
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));



const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));