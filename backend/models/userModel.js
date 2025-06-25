const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[0-9]{6}@student\.nitandhra\.ac\.in$/
  },

  password: { type: String, required: true },

  department: { type: String, required: true },

  year: { 
    type: Number, 
    required: true,
    min: 1, 
    max: 4   
  },

  skills: { type: [String], default: [] },

  bio: { type: String },

  importantLinks: { type: Map, of: String }
},
{
  timestamps: true
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
