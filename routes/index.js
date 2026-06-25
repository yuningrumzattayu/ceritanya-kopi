const router = require("express").Router();

const userRouter = require("./user");
const menuRouter = require("./menu");
const orderRouter = require("./order");

router.use("/", userRouter);
router.use("/menus", menuRouter);
router.use("/orders", orderRouter);

module.exports = router;