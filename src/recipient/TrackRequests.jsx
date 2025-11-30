// src/recipient/TrackRequests.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

function TrackRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "requests"), (snap) => {
      setRequests(
        snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      );
    });

    return () => unsub();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Your Requests</h2>

      {requests.length === 0 ? (
        <p>No requests made.</p>
      ) : (
        <ul className="list-group mt-3">
          {requests.map((r) => (
            <li key={r.id} className="list-group-item">
              <b>{r.item}</b> — {r.quantity}
              <br />
              <small>Status: {r.status}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TrackRequests;
