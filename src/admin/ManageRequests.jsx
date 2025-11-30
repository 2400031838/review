import React, { useEffect, useState } from "react";

function ManageRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("requests")) || [];
    setRequests(stored);
  }, []);

  const updateStatus = (index, newStatus) => {
    const updated = [...requests];
    updated[index].status = newStatus;

    setRequests(updated);
    localStorage.setItem("requests", JSON.stringify(updated));
  };

  return (
    <div className="container mt-4">
      <h2>Manage Recipient Requests</h2>

      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead className="table-dark">
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Reason</th>
              <th>Pincode</th>
              <th>City</th>
              <th>State</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req, index) => (
              <tr key={index}>
                <td>{req.item}</td>
                <td>{req.quantity}</td>
                <td>{req.reason}</td>
                <td>{req.pincode}</td>
                <td>{req.city}</td>
                <td>{req.state}</td>

                <td>
                  <span
                    className={`badge ${
                      req.status === "Approved"
                        ? "bg-success"
                        : req.status === "Rejected"
                        ? "bg-danger"
                        : "bg-secondary"
                    }`}
                  >
                    {req.status || "Pending"}
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

export default ManageRequests;

