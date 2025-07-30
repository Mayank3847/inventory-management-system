import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth"; // ✅ make sure this file exists

function ItemForm() {
  const [item, setItem] = useState({ name: "", quantity: "", category: "" });
  const [items, setItems] = useState([]);
  const { isAdmin, token } = useAuth();

  // 🔁 Fetch all items
  const fetchItems = async () => {
    try {
      const res = await axios.get("/api/items", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching items", err);
    }
  };

  useEffect(() => {
  const fetchItems = async () => {
    try {
      const res = await axios.get("/api/items", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching items", err);
    }
  };

  fetchItems(); // call it right away
}, [token]);


  // 🔄 Controlled inputs
  const handleChange = (e) =>
    setItem({ ...item, [e.target.name]: e.target.value });

  // ➕ Add Item
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/items", item, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Item added successfully!");
      setItem({ name: "", quantity: "", category: "" });
      fetchItems(); // refresh list
    } catch (err) {
      alert("Error adding item");
    }
  };

  // ❌ Delete Item
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/items/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchItems(); // refresh list
    } catch (err) {
      alert("Failed to delete item");
    }
  };

  // ✏️ Placeholder edit (you can replace with modal or prefill form)
  const handleEdit = (id) => {
    alert("Edit functionality is not implemented yet. Coming soon!");
  };

  return (
    <div>
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={item.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          name="quantity"
          value={item.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          required
        />
        <input
          name="category"
          value={item.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />
        <button type="submit">Add Item</button>
      </form>

      <h2>Inventory List</h2>
      {items.map((item) => (
        <div key={item._id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
          <p><strong>Name:</strong> {item.name}</p>
          <p><strong>Quantity:</strong> {item.quantity}</p>
          <p><strong>Category:</strong> {item.category}</p>

          {/* 🔐 Admin-only actions */}
          {isAdmin && (
            <>
              <button onClick={() => handleEdit(item._id)}>Edit</button>
              <button onClick={() => handleDelete(item._id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default ItemForm;
