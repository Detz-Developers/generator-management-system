const express = require("express");
const { authMiddleware, roleMiddleware } = require("../middleware/auth");

const router = express.Router();

// Admin-only route
router.get("/admin-data", authMiddleware, roleMiddleware(["admin"]), (req, res) => {
  res.json({ message: "Admin access granted" });
});

// Technician-only route
router.get("/technician-data", authMiddleware, roleMiddleware(["technician"]), (req, res) => {
  res.json({ message: "Technician data access" });
});

// Shop-only route
router.get("/shop-data", authMiddleware, roleMiddleware(["shop"]), (req, res) => {
  res.json({ message: "Shop operator data access" });
});

// Inventory-only route
router.get("/inventory-data", authMiddleware, roleMiddleware(["inventory"]), (req, res) => {
  res.json({ message: "Inventory staff data access" });
});

module.exports = router;
