const authService = require("../services/auth.service"); 
const transport = require("../config/nodemailer");


exports.register = async (req, res) => {
   try {
      const { user, token } = await authService.inscription(req.body);

      const url = `http://localhost:3000/api/auth/activate/${token}`;

      try {
         await transport.sendMail({
            to: user.email,
            subject: "Activation de votre compte de Gestion de Multi-Service",
            html: `
               <div style="margin:0; padding:0; background-color:#f4f7fb; font-family:Arial, Helvetica, sans-serif;">
                  <div style="max-width:600px; margin:40px auto; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 15px rgba(0,0,0,0.08);">
                     
                     <!-- HEADER -->
                     <div style="background:linear-gradient(135deg,#ff3b3b,#b30000); padding:30px; text-align:center;">
                        <h1 style="color:white; margin:0; font-size:28px; letter-spacing:1px;">RED-PRODUCT</h1>
                     </div>

                     <!-- CONTENT -->
                     <div style="padding:40px 30px;">
                        <h2 style="color:#222; text-align:center; margin-bottom:20px;">Activation de votre compte</h2>
                        <p style="font-size:16px; color:#555; line-height:1.7;">
                           Bonjour <strong>${user.nom || ""}</strong>,
                        </p>
                        <p style="font-size:16px; color:#555; line-height:1.7;">
                           Merci de vous être inscrit sur <strong>RED-PRODUCT</strong>. 
                           Pour finaliser votre inscription, veuillez cliquer sur le bouton ci-dessous.
                        </p>

                        <!-- BUTTON -->
                        <div style="text-align:center; margin:35px 0;">
                           <a href="${url}" style="background:#ff3b3b; color:white; text-decoration:none; padding:15px 30px; border-radius:8px; font-size:16px; font-weight:bold; display:inline-block; box-shadow:0 4px 10px rgba(255,59,59,0.3);">
                              Activer mon compte
                           </a>
                        </div>

                        <p style="font-size:14px; color:#777; line-height:1.6;">
                           Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :
                        </p>
                        <div style="background:#f5f5f5; padding:12px; border-radius:8px; word-break:break-all; font-size:13px; color:#444;">
                           ${url}
                        </div>

                        <hr style="border:none; border-top:1px solid #eee; margin:35px 0;" />
                        <p style="text-align:center; font-size:13px; color:#999; line-height:1.6;">
                           Cet email a été envoyé automatiquement, merci de ne pas y répondre.
                        </p>
                     </div>

                     <!-- FOOTER -->
                     <div style="background:#fafafa; padding:20px; text-align:center; font-size:12px; color:#999;">
                        © ${new Date().getFullYear()} RED-PRODUCT — Tous droits réservés.
                     </div>
                  </div>
               </div>
            `
         });
      } catch (mailError) {
         // ✅ L'utilisateur est créé mais on signale le problème d'email
         console.error("Erreur envoi email :", mailError.message);
         return res.status(201).json({
            message: "Compte créé mais l'email n'a pas pu être envoyé. Contactez le support.",
            user
         });
      }

      res.status(201).json({
         message: "Compte créé avec succès, vérifie ton email pour l'activer.",
         user
      });

   } catch (error) {
      res.status(400).json({ message: error.message });
   }
};

exports.activerCompte = async (req, res) => {  
   try {
      await authService.activerCompte(req.params.token);  
      res.redirect("http://localhost:3000/api/?activated=true");

   } catch (error) {
      res.status(400).json({ message: error.message });
   }
};


// CONNEXION
exports.login = async (req, res) => {
    
    try {
        const userlogin = await authService.login(req.body);

        res.status(200).json({
            message: "connexion avec succes",
            ...userlogin
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};