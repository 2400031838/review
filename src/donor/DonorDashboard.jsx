import React from "react";
import { Link } from "react-router-dom";

function DonorDashboard() {
  return (
    <div className="container mt-5">
      <div
        className="card shadow-lg p-4"
        style={{ background: "#222", color: "white" }}
      >
        <h2 className="text-center mb-3">Donor Dashboard</h2>

        <h5 className="text-center mb-4">Welcome, Donor!</h5>

        <p className="text-center">Choose an action:</p>

        <div className="d-flex flex-column gap-3 mt-3">

          <Link to="/donor/donate" className="btn btn-success btn-lg">
            Donate Items
          </Link>

          <Link to="/donor/history" className="btn btn-primary btn-lg">
            Donation History
          </Link>

          <Link to="/donor/drives" className="btn btn-warning btn-lg text-dark">
            Emergency Drives
          </Link>

        </div>
      </div>
    </div>
  );
}

export default DonorDashboard;
