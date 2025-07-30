const express = require("express");
const router = express.Router();

const {
  getItems,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");

const auth = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin"); // ✅ Import admin check

// ✅ Public for authenticated users
router.get("/", auth, getItems);

// ✅ Allow all authenticated users to create
router.post("/", auth, createItem);

// 🔒 Only admin can update items
router.put("/:id", auth, isAdmin, updateItem);

// 🔒 Only admin can delete items
router.delete("/:id", auth, isAdmin, deleteItem);

module.exports = router;
