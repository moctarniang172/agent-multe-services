const mongoose = require('mongoose');

const userChema = new mongoose.Schema({
     nom: {
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
  },
    isActive: {
    type: Boolean,
    default: false
    },
    activationToken: String,
    activationTokenExpire:{
      type: String,
        default: null
    },
    resetToken: {
        type: String,
        default: null
    },
    resetTokenExpiry: {
        type: Date,
        default: null
    },
    resetCode: {
        type: String,
        default: null
    },
    resetCodeExpire: {
        type: Date,
        default: null
    },
    resetAttempts: {
        type: Number,
        default: 0
    }

}, { timestamps: true })

module.exports = mongoose.model('user', userChema);