import React, { useEffect, useState } from "react";

// ⭐ Firestore
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

function RecipientsList() {
  const [recipients, setRecipients] = useState([]);

  // ⭐ LIVE FETCH FROM FIRESTORE
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "requests"), (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecipients(list);
    });

    return () => unsub();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Recipients & Item Requests</h2>

      {recipients.length === 0 ? (
        <p>No recipient requests available.</p>
      ) : (
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Reason</th>
              <th>Pincode</th>
              <th>City</th>
              <th>State</th>
            </tr>
          </thead>

          <tbody>
            {recipients.map((r) => (
              <tr key={r.id}>
                <td>{r.item}</td>
                <td>{r.quantity}</td>
                <td>{r.reason}</td>
                <td>{r.pincode}</td>
                <td>{r.city}</td>
                <td>{r.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RecipientsList;
