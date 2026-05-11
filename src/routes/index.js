const router = require("express").Router();

router.use('/auth', require('./auth.route'));

router.use('/operation', require('./operation.route'));

router.use('/bilan', require('./operation.route'));



module.exports = router;