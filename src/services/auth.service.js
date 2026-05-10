const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken")

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
   const activationTokenExpire = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

   const createdUser = await User.create({
      nom,
      prenom,
      email,
      password: hashedPassword,
      activationToken,
      activationTokenExpire 
   });

   return {
      user: createdUser,
      token: activationToken
   };
};

exports.activerCompte = async (token) => {  // ✅ nom harmonisé
   const result = await User.findOne({ activationToken: token });

   if (!result) throw new Error("Token invalide");

   //  Vérification expiration
   if (result.activationTokenExpire < Date.now()) {
      throw new Error("Token expiré, veuillez vous réinscrire");
   }

   result.isActive = true;
   result.activationToken = null;
   result.activationTokenExpire = null; 

   await result.save();

   return result;
};

// LOGIN
exports.login = async (data) => {
    const { email, password } = data;

    if (!email || !password) {
        throw new Error("remplir tous les champs !!");
    }

    const userconnecter = await user.findOne({ email });

    if (!userconnecter) {
        throw new Error("email n'existe pas");
    }
      if (!userconnecter.isActive) {
    throw new Error("Veuillez activer votre compte");
}

    const verifierPassword = await bycrypt.compare(
        password,
        userconnecter.password
    );

    if (!verifierPassword) {
        throw new Error("mot de passe incorrect");
    }
  

    const token = jwt.sign(
        { id: userconnecter._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    return { token: token, id: userconnecter._id, nom: userconnecter.nom, // On sort le nom de l'objet user 
             email: userconnecter.email};
};