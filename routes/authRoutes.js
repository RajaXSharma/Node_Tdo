const authRouter = require("express").Router();

const { todoLogin, todoSignup } = require("../controller/authController.js");

authRouter.post("/login", todoLogin);
authRouter.post("/signup", todoSignup);

module.exports = authRouter