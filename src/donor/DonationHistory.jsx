// src/donor/DonationHistory.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

function DonationHistory() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "donations"), (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setDonations(list);
    });

    return () => unsub();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Your Donation History</h2>

      {donations.length === 0 ? (
        <p>No donations found.</p>
      ) : (
        <ul className="list-group mt-3">
          {donations.map((d) => (
            <li key={d.id} className="list-group-item">
              <b>{d.item}</b> ({d.category}) — {d.quantity}
              <br />
              <small>
                {d.city}, {d.state} ({d.pincode})
              </small>
              <br />
              <small>Status: {d.status}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DonationHistory;
