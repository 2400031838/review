import React, { useEffect, useState } from "react";

function DonationHistory() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("donations")) || [];
    setDonations(stored);
  }, []);

  return (
    <div className="container mt-4">
      <h2>Your Donation History</h2>

      {donations.length === 0 ? (
        <p>No donations found.</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead className="table-dark">
            <tr>
              <th>Category</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Condition</th>
            </tr>
          </thead>

          <tbody>
            {donations.map((d, i) => (
              <tr key={i}>
                <td>{d.category}</td>
                <td>{d.item}</td>
                <td>{d.quantity}</td>
                <td>{d.condition}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DonationHistory;
