import React, { useState } from "react";
import axios from "axios";

function ItemForm() {
  const [item, setItem] = useState({ name: "", quantity: "", category: "" });

  const handleChange = (e) =>
    setItem({ ...item, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/items", item);
      alert("Item added successfully!");
      setItem({ name: "", quantity: "", category: "" });
    } catch (err) {
      alert("Error adding item");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={item.name} onChange={handleChange} placeholder="Name" required />
      <input name="quantity" value={item.quantity} onChange={handleChange} placeholder="Quantity" required />
      <input name="category" value={item.category} onChange={handleChange} placeholder="Category" required />
      <button type="submit">Add Item</button>
    </form>
  );
}

export default ItemForm;
