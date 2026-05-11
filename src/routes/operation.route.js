const router = require("express").Router();
// const router = express.Router();

const operationController = require("../controllers/operation.controller");
const middleware = require("../middlewares/auth.middleware");

// créer opération
router.post("/", middleware, operationController.createOperation);
router.get("/", middleware, operationController.getOperations);


module.exports = router;