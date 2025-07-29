import React, { useState } from "react";
import axios from "axios";

function AddItemForm({ onItemAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    category: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/items", formData);
      setFormData({ name: "", quantity: "", category: "", description: "" });
      onItemAdded(); // Refresh the list
    } catch (err) {
      console.error("Error adding item:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="item-form">
      <h2>Add New Item</h2>
      <div>
        <label>Name:</label>
        <input name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Quantity:</label>
        <input name="quantity" type="number" value={formData.quantity} onChange={handleChange} required />
      </div>
      <div>
        <label>Category:</label>
        <input name="category" value={formData.category} onChange={handleChange} />
      </div>
      <div>
        <label>Description:</label>
        <input name="description" value={formData.description} onChange={handleChange} />
      </div>
      <button type="submit">Add Item</button>
    </form>
  );
}

export default AddItemForm;
