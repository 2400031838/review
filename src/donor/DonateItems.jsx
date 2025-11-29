import { useState, useEffect } from "react";

function DonateItems() {
  const [form, setForm] = useState({
    category: "",
    item: "",
    quantity: "",
    condition: "",
  });

  const [donations, setDonations] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("donations")) || [];
    setDonations(stored);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.category || !form.item || !form.quantity || !form.condition) {
      alert("All fields are required!");
      return;
    }

    let updated = [...donations];

    if (editIndex !== null) {
      updated[editIndex] = form;
      setEditIndex(null);
    } else {
      updated.push(form);
    }

    setDonations(updated);
    localStorage.setItem("donations", JSON.stringify(updated));

    setForm({ category: "", item: "", quantity: "", condition: "" });
  };

  const handleEdit = (index) => {
    setForm(donations[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = donations.filter((_, i) => i !== index);
    setDonations(updated);
    localStorage.setItem("donations", JSON.stringify(updated));
  };

  return (
    <div className="container mt-4">
      <h2>Donate Items</h2>

      <div className="card p-3 mt-3 shadow">
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label>Category:</label>
            <select
              name="category"
              className="form-select"
              value={form.category}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Food">Food</option>
              <option value="Clothing">Clothing</option>
              <option value="Medicines">Medicines</option>
              <option value="Others">Others</option>
            </select>
          </div>

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
            <label>Condition:</label>
            <select
              name="condition"
              className="form-select"
              value={form.condition}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="New">New</option>
              <option value="Used - Good">Used - Good</option>
            </select>
          </div>

          <button className="btn btn-primary w-100 mt-2">
            {editIndex !== null ? "Update Donation" : "Add Donation"}
          </button>
        </form>
      </div>
 </div>
  );
}

export default DonateItems;