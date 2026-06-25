const router = require("express").Router();
const Controller = require("../controllers/controller");


router.get("/", Controller.menuList);


router.get("/add", Controller.getMenu);
router.post("/add", Controller.postMenu);


router.get("/edit/:id", Controller.getEditMenu);
router.post("/edit/:id", Controller.postEditMenu);


router.get("/delete/:id", Controller.deleteMenu);

module.exports = router;