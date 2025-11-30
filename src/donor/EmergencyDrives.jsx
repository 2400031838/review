// src/donor/EmergencyDrives.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

function EmergencyDrives() {
  const [drives, setDrives] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "drives"), (snap) => {
      const active = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .filter((x) => x.status === "Active");

      setDrives(active);
    });

    return () => unsub();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Emergency Donation Drives</h2>

      {drives.length === 0 ? (
        <p>No active drives right now.</p>
      ) : (
        <ul className="list-group mt-3">
          {drives.map((d) => (
            <li key={d.id} className="list-group-item">
              <b>{d.name}</b> — {d.location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EmergencyDrives;
