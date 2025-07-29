import React, { useState } from "react";
import axios from "axios";

function EditItemForm({ item, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: item.name,
    quantity: item.quantity,
    category: item.category || "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/items/${item._id}`, formData);
      onSave(); // refresh list + exit edit mode
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <div>
      <h3>Edit Item</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Item Name"
          required
        />
        <input
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          required
        />
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
        />
        <button type="submit">Update Item</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditItemForm;
