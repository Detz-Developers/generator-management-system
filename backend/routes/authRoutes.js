const express = require("express");
const { registerUser, login } = require("../controllers/authController");
const { authMiddleware, roleMiddleware } = require("../middleware/auth");

const router = express.Router();

// Admin can create users
router.post("/register", authMiddleware, roleMiddleware(["admin"]), registerUser);

// Login route (open for all)
router.post("/login", login);

module.exports = router;
