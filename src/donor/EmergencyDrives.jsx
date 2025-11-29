import React, { useEffect, useState } from "react";

function EmergencyDrives() {
  const [drives, setDrives] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("drives")) || [];
    setDrives(stored);
  }, []);

  return (
    <div className="container mt-4">
      <h2>Emergency Donation Drives</h2>

      {drives.length === 0 ? (
        <p>No active drives available.</p>
      ) : (
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {drives.map((d, i) => (
              <tr key={i}>
                <td>{d.name}</td>
                <td>{d.location}</td>
                <td>
                  {d.status === "Active" ? (
                    <span className="badge bg-success">Active</span>
                  ) : (
                    <span className="badge bg-secondary">Completed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EmergencyDrives;
