import React from "react";
import { Link } from "react-router-dom";

function LogisticsDashboard() {
  return (
    <div className="container mt-4">
      <h2>Logistics Dashboard</h2>

      <div className="card p-4 mt-3 shadow">
        <h4>Welcome, Logistics Coordinator!</h4>
        <p>Select an operation:</p>

        <div className="d-grid gap-2 mt-3">
          <Link to="/logistics/inventory" className="btn btn-primary">
            Manage Inventory
          </Link>

          <Link to="/logistics/assign" className="btn btn-success">
            Assign Delivery
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LogisticsDashboard;

