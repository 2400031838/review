import React from "react";
import { Link } from "react-router-dom";

function RecipientDashboard() {
  return (
    <div className="container mt-4">
      <h2>Recipient Dashboard</h2>

      <div className="card p-4 mt-3 shadow">
        <h4>Welcome, Recipient!</h4>
        <p>Choose an option:</p>

        <div className="d-grid gap-2 mt-3">
          <Link to="/recipient/request" className="btn btn-primary">
            Request Items
          </Link>

          <Link to="/recipient/track" className="btn btn-success">
            Track Requests
          </Link>

          <Link to="/recipient/feedback" className="btn btn-secondary">
            Give Feedback
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RecipientDashboard;

