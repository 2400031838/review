import React from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="container mt-5">
      <div
        className="card shadow-lg p-4"
        style={{ background: "#222", color: "white" }}
      >
        <h2 className="text-center mb-3">Admin Dashboard</h2>

        <h4 className="text-center mb-3">Welcome, Admin!</h4>
        <p className="text-center">Choose a management option:</p>

        <div className="d-flex flex-column gap-3 mt-3">

          <Link to="/admin/donors" className="btn btn-primary btn-lg">
            View Donors
          </Link>

          <Link to="/admin/recipients" className="btn btn-secondary btn-lg">
            View Recipients
          </Link>

          <Link to="/admin/manage" className="btn btn-success btn-lg">
            Manage Donation Drives
          </Link>

          <Link to="/admin/reports" className="btn btn-warning btn-lg text-dark">
            View Reports
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
