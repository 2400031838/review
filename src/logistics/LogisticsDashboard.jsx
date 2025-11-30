// src/logistics/LogisticsDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";

function LogisticsDashboard() {
  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4" style={{ background: "#222", color: "white" }}>
        <h2 className="text-center">Logistics Dashboard</h2>

        <div className="d-flex flex-column gap-3 mt-4">
          <Link to="/logistics/inventory" className="btn btn-primary btn-lg">
            Manage Inventory
          </Link>

          <Link to="/logistics/assign-delivery" className="btn btn-success btn-lg">
            Assign Deliveries
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LogisticsDashboard;
