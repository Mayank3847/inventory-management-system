const express = require("express");
const router = express.Router();
const {
  getItems,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");

router.get("/", getItems);           // GET all items
router.post("/", createItem);        // POST create item
router.put("/:id", updateItem);      // PUT update item
router.delete("/:id", deleteItem);   // DELETE item

module.exports = router;
