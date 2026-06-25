const router = require("express").Router();
const Controller = require("../controllers/controller");
const { isAdmin } = require("../middlewares/auth");

router.get("/", Controller.menuList);

router.get("/add", isAdmin, Controller.getMenu);
router.post("/add", isAdmin, Controller.postMenu);

router.get("/edit/:id", isAdmin, Controller.getEditMenu);
router.post("/edit/:id", isAdmin, Controller.postEditMenu);

router.get("/delete/:id", isAdmin, Controller.deleteMenu);

module.exports = router;
