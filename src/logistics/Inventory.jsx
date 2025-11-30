// src/logistics/Inventory.jsx
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

function Inventory() {
  const [form, setForm] = useState({
    item: "",
    quantity: "",
    category: "",
  });

  const [inventory, setInventory] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "inventory"), (snap) => {
      const list = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setInventory(list);
    });

    return () => unsub();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.item || !form.quantity || !form.category) {
      alert("All fields required!");
      return;
    }

    try {
      if (editId) {
        await updateDoc(doc(db, "inventory", editId), form);
        alert("Item updated!");
        setEditId(null);
      } else {
        await addDoc(collection(db, "inventory"), form);
        alert("Item added!");
      }
    } catch (error) {
      alert("Error saving!");
    }

    setForm({ item: "", quantity: "", category: "" });
  };

  const handleEdit = (i) => {
    setForm(i);
    setEditId(i.id);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "inventory", id));
    alert("Item deleted!");
  };

  return (
    <div className="container mt-4">
      <h2>Inventory Management</h2>

      <div className="card p-3 mt-3 shadow">
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label>Item Name</label>
            <input
              type="text"
              className="form-control"
              name="item"
              value={form.item}
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <label>Quantity</label>
            <input
              type="number"
              className="form-control"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <label>Category</label>
            <input
              type="text"
              className="form-control"
              name="category"
              value={form.category}
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-primary w-100">
            {editId ? "Update Item" : "Add Item"}
          </button>
        </form>
      </div>

      <h3 className="mt-4">Inventory List</h3>

      {inventory.length === 0 ? (
        <p>No items.</p>
      ) : (
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {inventory.map((i) => (
              <tr key={i.id}>
                <td>{i.item}</td>
                <td>{i.quantity}</td>
                <td>{i.category}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(i)}>
                    Edit
                  </button>

                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(i.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Inventory;
