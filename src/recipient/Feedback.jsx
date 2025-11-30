// src/recipient/Feedback.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

function Feedback() {
  const [message, setMessage] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "feedback"), (snap) => {
      setList(snap.docs.map((d) => d.data().message));
    });

    return () => unsub();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      alert("Enter feedback!");
      return;
    }

    await addDoc(collection(db, "feedback"), { message });

    setMessage("");
  };

  return (
    <div className="container mt-4">
      <h2>Feedback</h2>

      <div className="card p-3 shadow mt-3">
        <form onSubmit={handleSubmit}>
          <textarea
            className="form-control"
            rows="3"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          <button className="btn btn-primary w-100 mt-3">
            Submit Feedback
          </button>
        </form>
      </div>

      <h3 className="mt-4">Your Previous Feedback</h3>

      <ul className="list-group mt-3">
        {list.map((f, i) => (
          <li key={i} className="list-group-item">
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Feedback;
