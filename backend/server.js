// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

// Middleware
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send("Hello Express Backend 🚀");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
