const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

// Login (all roles)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByEmail(email);
    if (!user) return res.status(400).json({ message: "Invalid email/password" });

    if (!user.password) {
      return res.status(500).json({ message: "Password not found for this user" });
    }

    const isMatch = await User.comparePassword(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email/password" });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin registers new users
exports.registerUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can create users" });
    }

    const existingUser = await User.findByEmail(email);
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const newUser = new User(email, password, role);
    const savedUser = await newUser.save();

    res.status(201).json({ message: "User created", user: savedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
