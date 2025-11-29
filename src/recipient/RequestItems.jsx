import React, { useState, useEffect } from "react";

function RequestItems() {
  const [form, setForm] = useState({
    item: "",
    quantity: "",
    reason: "",
  });

  const [requests, setRequests] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("requests")) || [];
    setRequests(stored);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.item || !form.quantity || !form.reason) {
      alert("All fields are required!");
      return;
    }

    let updated = [...requests];

    if (editIndex !== null) {
      updated[editIndex] = form;
      setEditIndex(null);
    } else {
      updated.push(form);
    }

    setRequests(updated);
    localStorage.setItem("requests", JSON.stringify(updated));

    setForm({ item: "", quantity: "", reason: "" });
  };

  const handleEdit = (index) => {
    setForm(requests[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = requests.filter((_, i) => i !== index);
    setRequests(updated);
    localStorage.setItem("requests", JSON.stringify(updated));
  };

  return (
    <div className="container mt-4">
      <h2>Request Items</h2>

      <div className="card p-3 mt-3 shadow">
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label>Item Name:</label>
            <input
              type="text"
              name="item"
              className="form-control"
              value={form.item}
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <label>Quantity:</label>
            <input
              type="number"
              name="quantity"
              className="form-control"
              value={form.quantity}
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <label>Reason:</label>
            <textarea
              name="reason"
              className="form-control"
              value={form.reason}
              onChange={handleChange}
            ></textarea>
          </div>

          <button className="btn btn-primary w-100 mt-2">
            {editIndex !== null ? "Update Request" : "Submit Request"}
          </button>
        </form>
      </div>

      <h3 className="mt-4">Your Requests</h3>

      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead className="table-dark">
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Reason</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req, index) => (
              <tr key={index}>
                <td>{req.item}</td>
                <td>{req.quantity}</td>
                <td>{req.reason}</td>
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

export default RequestItems;

