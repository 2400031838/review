
import React, { useState, useEffect } from "react";

function ManageDrives() {
  const [form, setForm] = useState({
    name: "",
    location: "",
    status: "",
  });

  const [drives, setDrives] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("drives")) || [];
    setDrives(stored);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.location || !form.status) {
      alert("All fields are required!");
      return;
    }

    let updated = [...drives];

    if (editIndex !== null) {
      updated[editIndex] = form;
      setEditIndex(null);
    } else {
      updated.push(form);
    }

    setDrives(updated);
    localStorage.setItem("drives", JSON.stringify(updated));

    setForm({ name: "", location: "", status: "" });
  };

  const handleEdit = (index) => {
    setForm(drives[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = drives.filter((_, i) => i !== index);
    setDrives(updated);
    localStorage.setItem("drives", JSON.stringify(updated));
  };

  return (
    <div className="container mt-4">
      <h2>Manage Donation Drives</h2>

      <div className="card p-3 mt-3 shadow">
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label>Drive Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <label>Location</label>
            <input
              type="text"
              className="form-control"
              name="location"
              value={form.location}
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <label>Status</label>
            <select
              className="form-select"
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <button className="btn btn-primary w-100">
            {editIndex !== null ? "Update Drive" : "Add Drive"}
          </button>
        </form>
      </div>

      {/* Display Drives */}
      <h3 className="mt-4">All Drives</h3>

      {drives.length === 0 ? (
        <p>No drives available.</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {drives.map((d, index) => (
              <tr key={index}>
                <td>{d.name}</td>
                <td>{d.location}</td>
                <td>{d.status}</td>
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

export default ManageDrives;
