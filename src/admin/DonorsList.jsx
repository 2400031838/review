import React, { useEffect, useState } from "react";

// ⭐ Firestore
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

function DonorsList() {
  const [donors, setDonors] = useState([]);

  // ⭐ LIVE FETCH FROM FIRESTORE
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "donations"), (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDonors(list);
    });

    return () => unsub();
  }, []);

  return (
    <div className="container mt-4">
      <h2>All Donors</h2>

      {donors.length === 0 ? (
        <p>No donation records available.</p>
      ) : (
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Category</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Condition</th>
              <th>Pincode</th>
              <th>City</th>
              <th>State</th>
            </tr>
          </thead>

          <tbody>
            {donors.map((d) => (
              <tr key={d.id}>
                <td>{d.category}</td>
                <td>{d.item}</td>
                <td>{d.quantity}</td>
                <td>{d.condition}</td>
                <td>{d.pincode}</td>
                <td>{d.city}</td>
                <td>{d.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DonorsList;
