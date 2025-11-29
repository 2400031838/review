import React from "react";

function DonorsList() {
  const donors = JSON.parse(localStorage.getItem("donations")) || [];

  return (
    <div className="container mt-4">
      <h2>All Donors</h2>

      {donors.length === 0 ? (
        <p>No donation records available.</p>
      ) : (
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Category</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Condition</th>
            </tr>
          </thead>

          <tbody>
            {donors.map((d, i) => (
              <tr key={i}>
                <td>{d.category}</td>
                <td>{d.item}</td>
                <td>{d.quantity}</td>
                <td>{d.condition}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DonorsList;

