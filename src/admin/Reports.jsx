import React from "react";

function Reports() {
  const donations = JSON.parse(localStorage.getItem("donations")) || [];
  const requests = JSON.parse(localStorage.getItem("requests")) || [];
  const drives = JSON.parse(localStorage.getItem("drives")) || [];

  return (
    <div className="container mt-4">
      <h2>Reports & Analytics</h2>

      <div className="card p-3 mt-3 shadow">
        <h4>Total Donations: {donations.length}</h4>
        <h4>Total Requests: {requests.length}</h4>
        <h4>Total Drives: {drives.length}</h4>
      </div>
    </div>
  );
}

export default Reports;

