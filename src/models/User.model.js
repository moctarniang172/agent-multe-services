const mongoose = require('mongoose');

const userChema = new mongoose.Schema({
     name: {
    type: String,
    required: true
  },
   prenom: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["admin", "agent"],
    default: "agent"
  }

}, { timestamps: true })
module.exports = mongoose.Model('user', userChema);