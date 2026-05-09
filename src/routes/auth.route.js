const router = require('express').Router();
const authcontroller = require('../controllers/auth.controller');

router.post('/inscription', authcontroller.register);

module.exports = router;

