const router = require("express").Router();
const bilanController = require("../controllers/Bilan.controller");
const middleware = require("../middlewares/auth.middleware");

// rapport journalier
router.get("/", middleware, bilanController.dailyReport);

module.exports = router;