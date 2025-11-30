// src/logistics/AssignDelivery.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
} from "firebase/firestore";

function AssignDelivery() {
  const [deliveries, setDeliveries] = useState([]);
  const [form, setForm] = useState({
    donationId: "",
    vehicle: "",
    driver: "",
  });

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "deliveries"), (snap) => {
      setDeliveries(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    return () => unsub();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAssign = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "deliveries"), form);
    alert("Delivery Assigned!");

    setForm({
      donationId: "",
      vehicle: "",
      driver: "",
    });
  };

  return (
    <div className="container mt-4">
      <h2>Assign Delivery</h2>

      <div className="card p-3 mt-3 shadow">
        <form onSubmit={handleAssign}>
          <div className="mb-2">
            <label>Donation ID</label>
            <input
              name="donationId"
              className="form-control"
              value={form.donationId}
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <label>Vehicle</label>
            <input
              name="vehicle"
              className="form-control"
              value={form.vehicle}
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <label>Driver Name</label>
            <input
              name="driver"
              className="form-control"
              value={form.driver}
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-primary w-100">Assign</button>
        </form>
      </div>

      <h3 className="mt-4">Assigned Deliveries</h3>

      <ul className="list-group">
        {deliveries.map((d) => (
          <li key={d.id} className="list-group-item">
            <b>Donation ID:</b> {d.donationId}
            <br />
            <b>Vehicle:</b> {d.vehicle}
            <br />
            <b>Driver:</b> {d.driver}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AssignDelivery;
