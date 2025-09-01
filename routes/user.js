const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userControlller = require("../controllers/users.js");

router.route("/signup")
.get(userControlller.renderSignupForm)
.post(wrapAsync(userControlller.signup));

router.route("/login")
.get(userControlller.renderLoginForm)
.post(saveRedirectUrl ,passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }) ,userControlller.login);

router.get("/logout",userControlller.logout);

module.exports = router;







//router.get("/signup",userControlller.renderSignupForm);

//router.post("/signup", wrapAsync(userControlller.signup));

// router.get("/login",userControlller.renderLoginForm);

// router.post("/login",saveRedirectUrl ,passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }) ,userControlller.login);

// router.get("/logout",userControlller.logout);

module.exports = router;