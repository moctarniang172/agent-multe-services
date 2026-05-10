const User = require("../models/User.model");
const transporter = require("../config/nodemailer");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken"); 

// ====== etape 1 ==============

exports.ressetPassword = async (data) => {
   const { email } = data;

   const user = await User.findOne({ email });

   if (!user) { 
      throw new Error("Email introuvable");
   }

   
   const code = Math.floor(100000 + Math.random() * 900000).toString();
   const hashedCode = crypto.createHash("sha256").update(code).digest("hex");

   user.resetCode = hashedCode;
   user.resetCodeExpire = new Date(Date.now() + 15 * 60 * 1000); 
   user.resetAttempts = 0;

   await user.save();

   await transporter.sendMail({
      to: user.email,
      subject: "Code de réinitialisation de mot de passe",
      html: `
         <div style="font-family: Arial, sans-serif; background-color:#f4f4f4; padding:20px;">
            <div style="max-width:500px; margin:auto; background:#ffffff; padding:20px; border-radius:10px; box-shadow:0 2px 10px rgba(0,0,0,0.1);">

               <h2 style="text-align:center; color:#333;">Réinitialisation de mot de passe</h2>

               <p style="font-size:16px; color:#555;">Bonjour,</p>

               <p style="font-size:16px; color:#555;">Voici votre code de réinitialisation :</p>

               <div style="text-align:center; margin:20px 0;">
                  <span style="display:inline-block; font-size:24px; letter-spacing:5px; font-weight:bold; background:#f0f0f0; padding:10px 20px; border-radius:8px; color:#000;">
                     ${code} <!-- code brut, pas la fonction -->
                  </span>
               </div>

               <p style="font-size:14px; color:#777;">
                  Ce code est valable 15 minutes. Ne le partagez avec personne.
               </p>

               <hr style="margin:20px 0;" />

               <p style="font-size:12px; color:#aaa; text-align:center;">
                  © ${new Date().getFullYear()} RED-PRODUCT. Tous droits réservés.
               </p>
            </div>
         </div>
      `
   });

   return { message: "Code envoyé par email" };
};

// ====== etape 2 ==============

exports.verifyCode = async (email, code) => {
   const user = await User.findOne({ email });

   if (!user) throw new Error("Utilisateur introuvable");

   if (user.resetAttempts >= 5) {
      throw new Error("Trop de tentatives, recommencez");
   }

   const hashedCode = crypto.createHash("sha256").update(code).digest("hex");

   if (user.resetCodeExpire < Date.now()) {
   throw new Error("Code expiré");
}

if (user.resetCode !== hashedCode) {
   user.resetAttempts += 1;
   user.resetAttempts = 0;

   await user.save();
   throw new Error("Code invalide");
}

   const token = jwt.sign( { id: user._id },process.env.JWT_SECRET,{ expiresIn: "10m" });

   return { message: "Code validé", token };
};

// ====== etape 3 ==============

exports.resetPassword = async (token, password) => {
   let decoded;

   try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
   } catch {
      throw new Error("Token invalide ou expiré");
   }

   const user = await User.findById(decoded.id);

   if (!user) throw new Error("Utilisateur introuvable");

   user.password = await bcrypt.hash(password, 10);
   user.resetCode = null;
   user.resetCodeExpire = null; 
   user.resetAttempts = 0;

   await user.save();

   return { message: "Mot de passe réinitialisé avec succès" };
};