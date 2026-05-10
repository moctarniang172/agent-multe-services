const router = require('express').Router();
const authcontroller = require('../controllers/auth.controller');
const resetcontroller = require('../controllers/reset.controller');



router.post('/inscription', authcontroller.register);
router.get("/activate/:token", authcontroller.activerCompte);
router.post('/connexion', authcontroller.login);

router.post('/oublier', resetcontroller.resetPassword);
router.post('/code', resetcontroller.verifyCode);
router.post('/reset', resetcontroller.renitialiser);








module.exports = router;

