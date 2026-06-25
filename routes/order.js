const router = require("express").Router();
const Controller = require("../controllers/controller");


router.get("/", Controller.orderHistory);


router.get("/add/:menuId", Controller.getOrder);
router.post("/add/:menuId", Controller.postOrder);

module.exports = router;
