const router = require("express").Router();
const Controller = require("../controllers/controller");

// READ
router.get("/", Controller.orderHistory);

// CREATE ORDER
router.get("/add/:menuId", Controller.getOrder);
router.post("/add/:menuId", Controller.postOrder);

module.exports = router;
