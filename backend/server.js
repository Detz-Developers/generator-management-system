// server.js
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const path = require("path");

// Load env first
require("dotenv").config();

console.log("JWT Secret:", process.env.JWT_SECRET);
console.log("Firebase URL:", process.env.FIREBASE_DATABASE_URL);

// Make sure the env variable exists
if (!process.env.FIREBASE_DATABASE_URL) {
  console.error("❌ FIREBASE_DATABASE_URL is missing!");
  process.exit(1);
}

// Service account
const serviceAccount = require(path.join(__dirname, "config", "serviceAccountKey.json"));

// Initialize Firebase
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
  console.log("✅ Firebase initialized successfully!");
}

const db = admin.database();
global.USERS_REF = db.ref("users");

// Test Firebase connection
db.ref("users")
  .once("value")
  .then(() => console.log("✅ Firebase test read successful!"))
  .catch((err) => console.error("❌ Firebase connection error:", err));

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/protectedRoutes"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
