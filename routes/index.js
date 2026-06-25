const router = require("express").Router();
const { isLogin } = require("../middlewares/auth");

const userRouter = require("./user");
const menuRouter = require("./menu");
const orderRouter = require("./order");
const Controller = require("../controllers/controller");

router.use("/", userRouter);
router.use(isLogin);
router.use("/menus", menuRouter);
router.use("/orders", orderRouter);
router.use("/menus", menuRouter);
router.use("/orders", orderRouter);
router.get("/logout", Controller.logout)

module.exports = router;
