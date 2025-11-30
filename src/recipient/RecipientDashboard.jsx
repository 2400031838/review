// src/recipient/RecipientDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";

function RecipientDashboard() {
  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4" style={{ background: "#222", color: "white" }}>
        <h2 className="text-center">Recipient Dashboard</h2>

        <div className="d-flex flex-column gap-3 mt-4">
          <Link to="/recipient/request" className="btn btn-primary btn-lg">
            Request Items
          </Link>

          <Link to="/recipient/track" className="btn btn-success btn-lg">
            Track Requests
          </Link>

          <Link to="/recipient/feedback" className="btn btn-warning btn-lg text-dark">
            Give Feedback
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RecipientDashboard;
