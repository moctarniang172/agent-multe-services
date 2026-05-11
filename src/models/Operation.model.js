const mongoose = require('mongoose');

const operationSchema = new mongoose.Schema({
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  clientName: {
    type: String,
    required: true
  },

  type: {
    type: String,
    enum: ["depot","retrait","transfert",]
  },

  montant: {
    type: Number,
    required: true
  },

  frais: {
    type: Number,
    default: 0
  },

}, { timestamps: true });

module.exports = mongoose.model("Operation", operationSchema);
