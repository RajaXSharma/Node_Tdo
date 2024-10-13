const authRouter = require("express").Router();

const { todoLogin, todoSignup , logout } = require("../controller/authController.js");

authRouter.post("/login", todoLogin);
authRouter.post("/signup", todoSignup);
authRouter.post("/logout", logout);

module.exports = authRouter;
