import React, { useState, useEffect } from "react";

function Inventory() {
  const [form, setForm] = useState({
    item: "",
    quantity: "",
    category: "",
  });

  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("inventory")) || [];
    setItems(stored);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.item || !form.quantity || !form.category) {
      alert("All fields are required!");
      return;
    }

    let updated = [...items];

    if (editIndex !== null) {
      updated[editIndex] = form;
      setEditIndex(null);
    } else {
      updated.push(form);
    }

    setItems(updated);
    localStorage.setItem("inventory", JSON.stringify(updated));

    setForm({ item: "", quantity: "", category: "" });
  };

  const handleEdit = (index) => {
    setForm(items[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
    localStorage.setItem("inventory", JSON.stringify(updated));
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
            {editIndex !== null ? "Update Item" : "Add Item"}
          </button>
        </form>
      </div>

      <h3 className="mt-4">Inventory List</h3>

      {items.length === 0 ? (
        <p>No inventory items added.</p>
      ) : (
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.map((i, index) => (
              <tr key={index}>
                <td>{i.item}</td>
                <td>{i.quantity}</td>
                <td>{i.category}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(index)}
                  >
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

