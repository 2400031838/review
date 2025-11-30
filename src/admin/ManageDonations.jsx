import React, { useEffect, useState } from "react";

function ManageDonations() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("donations")) || [];
    setDonations(stored);
  }, []);

  const updateStatus = (index, newStatus) => {
    const updated = [...donations];
    updated[index].status = newStatus;

    setDonations(updated);
    localStorage.setItem("donations", JSON.stringify(updated));
  };

  return (
    <div className="container mt-4">
      <h2>Manage Donations</h2>

      {donations.length === 0 ? (
        <p>No donations found.</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead className="table-dark">
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Condition</th>
              <th>Pincode</th>
              <th>City</th>
              <th>State</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {donations.map((d, index) => (
              <tr key={index}>
                <td>{d.item}</td>
                <td>{d.quantity}</td>
                <td>{d.condition}</td>
                <td>{d.pincode}</td>
                <td>{d.city}</td>
                <td>{d.state}</td>

                <td>
                  <span
                    className={`badge ${
                      d.status === "Approved"
                        ? "bg-success"
                        : d.status === "Rejected"
                        ? "bg-danger"
                        : "bg-secondary"
                    }`}
                  >
                    {d.status || "Pending"}
                  </span>
                </td>

                <td>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => updateStatus(index, "Approved")}
                  >
                    Approve
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => updateStatus(index, "Rejected")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ManageDonations;

