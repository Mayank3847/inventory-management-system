import React, { useEffect, useState } from "react";
import axios from "axios";

function ItemList() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [editedData, setEditedData] = useState({ name: "", quantity: "", category: "" });

  const fetchItems = async () => {
    const res = await axios.get("/api/items", {
      headers: { Authorization: localStorage.getItem("token") },
    });
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const deleteItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    await axios.delete(`/api/items/${id}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    fetchItems();
  };

  const startEdit = (item) => {
    setEditingItem(item._id);
    setEditedData({ name: item.name, quantity: item.quantity, category: item.category });
  };

  const saveEdit = async (id) => {
    await axios.put(`/api/items/${id}`, editedData, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    setEditingItem(null);
    fetchItems();
  };

  return (
    <div>
      <h3>Inventory Items</h3>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {editingItem === item._id ? (
              <>
                <input value={editedData.name} onChange={(e) => setEditedData({ ...editedData, name: e.target.value })} />
                <input value={editedData.quantity} onChange={(e) => setEditedData({ ...editedData, quantity: e.target.value })} />
                <input value={editedData.category} onChange={(e) => setEditedData({ ...editedData, category: e.target.value })} />
                <button onClick={() => saveEdit(item._id)}>💾 Save</button>
              </>
            ) : (
              <>
                {item.name} - {item.quantity} - {item.category}
                <button onClick={() => startEdit(item)}>✏️ Edit</button>
              </>
            )}
            <button onClick={() => deleteItem(item._id)}>🗑️ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;
