import React, { useEffect, useState } from "react";

function TrackRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("requests")) || [];
    setRequests(stored);
  }, []);

  return (
    <div className="container mt-4">
      <h2>Track Your Requests</h2>

      {requests.length === 0 ? (
        <p>No requests submitted.</p>
      ) : (
        <table className="table table-striped mt-4">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req, i) => (
              <tr key={i}>
                <td>{req.item}</td>
                <td>{req.quantity}</td>
                <td>{req.reason}</td>
                <td>
                  <span className="badge bg-info">Pending</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TrackRequests;

