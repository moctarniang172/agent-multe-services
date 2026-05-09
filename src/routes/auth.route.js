const router = require('express').Router();
const authcontroller = require('../controllers/auth.controller');

router.post('/inscription', authcontroller.register);
router.get("/activate/:token", authcontroller.activerCompte); // ✅ GET obligatoire


module.exports = router;

