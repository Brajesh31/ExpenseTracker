const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const Protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided." });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by the ID stored in the token's payload
    req.user = await User.findById(payload.userId).select('-password');
    console.log("Authenticated User:", req.user); // Log the authenticated user for debugging
    if (!req.user) {
      return res.status(404).json({ message: "User not found." });
    }

    next();
  } catch (err) {
    console.error("Authentication error:", err);
    return res.status(401).json({ message: "Unauthorized: Invalid token." });
  }
};

module.exports = Protect;
