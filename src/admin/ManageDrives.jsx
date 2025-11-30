import React, { useState, useEffect } from "react";

// ⭐ Firestore Imports
import { db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot
} from "firebase/firestore";

function ManageDrives() {
  const [form, setForm] = useState({
    name: "",
    location: "",
    status: "",
  });

  const [drives, setDrives] = useState([]);
  const [editId, setEditId] = useState(null);

  // ⭐ REAL-TIME FIRESTORE LISTENER
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "drives"), (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDrives(list);
    });

    return () => unsub();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ⭐ ADD OR UPDATE DRIVE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.location || !form.status) {
      alert("All fields are required!");
      return;
    }

    try {
      if (editId) {
        // UPDATE
        await updateDoc(doc(db, "drives", editId), form);
        alert("Drive updated successfully!");
        setEditId(null);
      } else {
        // CREATE
        await addDoc(collection(db, "drives"), {
          ...form,
          createdAt: new Date(),
        });
        alert("Drive added successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving drive!");
    }

    setForm({ name: "", location: "", status: "" });
  };

  // ⭐ EDIT DRIVE
  const handleEdit = (drive) => {
    setForm({
      name: drive.name,
      location: drive.location,
      status: drive.status,
    });
    setEditId(drive.id);
  };

  // ⭐ DELETE DRIVE
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "drives", id));
      alert("Drive deleted!");
    } catch (err) {
      console.error(err);
      alert("Error deleting drive!");
    }
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
            {editId ? "Update Drive" : "Add Drive"}
          </button>
        </form>
      </div>

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
            {drives.map((d) => (
              <tr key={d.id}>
                <td>{d.name}</td>
                <td>{d.location}</td>
                <td>{d.status}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(d)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(d.id)}
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
