const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // The display name from either social platform
  displayName: {
    type: String,
    required: true
  },
  // The primary email (note: some users hide email on GitHub)
  email: {
    type: String,
    unique: true,
    sparse: true 
  },
  password:{
    type: String
  },
  // GitHub specific data
  githubId: {
    type: String,
    unique: true,
    sparse: true
  },
  // LinkedIn specific data
  linkedinId: {
    type: String,
    unique: true,
    sparse: true
  },
  // Profile image URL from the provider
  avatar: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);