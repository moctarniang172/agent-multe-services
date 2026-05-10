const reset = require('../services/resset.service');

// ====== etape 1 — Demander le code ==============
exports.renitialiser = async (req, res) => {
  try {
    const { email } = req.body;

    const result = await reset.ressetPassword({ email }); 

    res.status(200).json(result);

  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ message: err.message });
  }
};

// ====== etape 2 — Vérifier le code ==============
exports.verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    const result = await reset.verifyCode(email, code);

    res.json(result);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ====== etape 3 — Nouveau mot de passe ==============
exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!password) {
   throw new Error("Mot de passe requis");
}
if (password.length < 6) {
   throw new Error("Mot de passe trop court");
}

    const result = await reset.resetPassword(token, password);

    res.json(result);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};