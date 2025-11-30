// src/recipient/RequestItems.jsx
import React, { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

function RequestItems() {
  const [form, setForm] = useState({
    item: "",
    quantity: "",   // ⭐ Now text type
    reason: "",
    houseNo: "",
    street: "",
    pincode: "",
    city: "",
    state: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const fetchLocation = async (pin) => {
    const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
    const data = await res.json();

    if (data[0].Status !== "Success") return null;

    const office = data[0].PostOffice[0];
    return { city: office.District, state: office.State };
  };

  const handlePincode = async (e) => {
    const pin = e.target.value;
    setForm({ ...form, pincode: pin });

    if (pin.length === 6) {
      const loc = await fetchLocation(pin);
      if (loc) {
        setForm((prev) => ({
          ...prev,
          city: loc.city,
          state: loc.state,
        }));
      } else {
        alert("Invalid pincode!");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.item ||
      !form.quantity ||
      !form.reason ||
      !form.houseNo ||
      !form.street ||
      !form.pincode ||
      !form.city ||
      !form.state
    ) {
      alert("All fields including full address are required!");
      return;
    }

    await addDoc(collection(db, "requests"), {
      ...form,
      status: "Pending",
      createdAt: new Date(),
    });

    alert("Request submitted!");

    setForm({
      item: "",
      quantity: "",
      reason: "",
      houseNo: "",
      street: "",
      pincode: "",
      city: "",
      state: "",
    });
  };

  return (
    <div className="container mt-4">
      <h2>Request Items</h2>

      <div className="card p-3 shadow mt-3">
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label>Item Needed</label>
            <input
              className="form-control"
              name="item"
              value={form.item}
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <label>Quantity (example: 5kg, 2 packets)</label>
            <input
              className="form-control"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              placeholder="Ex: 5kg, 2 packets"
            />
          </div>

          <div className="mb-2">
            <label>Reason</label>
            <textarea
              className="form-control"
              name="reason"
              value={form.reason}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* ⭐ FULL ADDRESS */}
          <h5 className="mt-3">Delivery Address</h5>

          <div className="mb-2">
            <label>House No</label>
            <input
              className="form-control"
              name="houseNo"
              value={form.houseNo}
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <label>Street</label>
            <input
              className="form-control"
              name="street"
              value={form.street}
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <label>Pincode</label>
            <input
              className="form-control"
              name="pincode"
              value={form.pincode}
              onChange={handlePincode}
            />
          </div>

          <div className="mb-2">
            <label>City</label>
            <input className="form-control" value={form.city} disabled />
          </div>

          <div className="mb-2">
            <label>State</label>
            <input className="form-control" value={form.state} disabled />
          </div>

          <button className="btn btn-primary w-100 mt-2">Submit Request</button>
        </form>
      </div>
    </div>
  );
}

export default RequestItems;
