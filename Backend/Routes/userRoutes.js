const express = require('express');
const { signupController, loginController, getUserInfoController , logoutController } = require('../Controller/userAuthController');
const userRouter = express.Router();
const upload = require("../middleware/multer");
const Protect = require('../middleware/isAuth');

// User authentication routes


// User login and signup routes
userRouter.post("/login", loginController);

// User signup route with avatar upload
// The 'avatar' field in the form should match the name used in multer configuration
userRouter.post("/signup", upload.single('avatar'), signupController);

// Get current user information
userRouter.get("/getUser", Protect, getUserInfoController);

// Logout user
userRouter.get("/logout", logoutController)


module.exports = userRouter;

