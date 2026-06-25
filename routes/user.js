const router = require("express").Router();
const Controller = require("../controllers/controller");


router.get("/", Controller.landingpage);


router.get("/register", Controller.registerForm);
router.post("/register", Controller.postRegister);


router.get("/login", Controller.loginForm);
router.post("/login", Controller.postLogin);


router.get("/logout", Controller.logout);

module.exports = router;