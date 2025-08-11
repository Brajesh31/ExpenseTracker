const User = require("../models/UserModel");
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signupController = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!email || !password || !fullName) return res.status(400).json({ message: "All fields are required" });
        if (!validator.isEmail(email)) return res.status(400).json({ message: "Invalid email" });
        if (!validator.isStrongPassword(password)) return res.status(400).json({ message: "Password not strong enough" });
        
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(409).json({ message: "Email already in use" });

        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name: fullName,
            email,
            password: encryptedPassword,
            avatar: req.file ? req.file.path.replace(/\\/g, "/") : null, // Normalize path for web
        });

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000, sameSite: 'none', secure: process.env.NODE_ENV === 'production' });
        
        return res.status(201).json({
            message: "User created successfully",
            user: { id: newUser._id, name: newUser.name, email: newUser.email, avatar: newUser.avatar }
        });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const loginController = async (req, res) => {
    try {
        console.log(req.body);
        
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "Email and password are required" });

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000, sameSite: 'none', secure: process.env.NODE_ENV === 'production' });
        
        return res.status(200).json({
            message: "Login successful",
            user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar }
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getUserInfoController = async (req, res) => {
  try {
    // The user object is attached to the request by the Protect middleware
    return res.status(200).json({
      message: "User info retrieved successfully",
      user: req.user 
    });
  } catch (err) {
    console.error("Get user info error:", err);
    res.status(500).json({ message: "An internal server error occurred" });
  }
};

const logoutController = (req, res) => {
    try {
        res.clearCookie('token', { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production' });
        console.log("Logout cmoplete")
        return res.status(200).json({ message: "Logout successful" });
    } catch (err) {
        console.error("Logout error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = {
    signupController,
    loginController,
    getUserInfoController ,
    logoutController
};
