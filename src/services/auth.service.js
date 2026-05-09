const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const generateTokenValidation = () => {
   return crypto.randomBytes(32).toString("hex");
};

exports.inscription = async (data) => {

   const { nom, prenom, email, password } = data;

   if (!nom || !prenom || !email || !password) {
      throw new Error("Remplis tous les champs");
   }

   const existingUser = await User.findOne({ email });

   if (existingUser) {
      throw new Error("Email déjà utilisé");
   }

   const hashedPassword = await bcrypt.hash(password, 10);

   const activationToken = generateTokenValidation();

   const createdUser = await User.create({
      nom,
      prenom,
      email,
      password: hashedPassword,
      activationToken
   });

   return {
      user: createdUser,
      token: activationToken
   };
};