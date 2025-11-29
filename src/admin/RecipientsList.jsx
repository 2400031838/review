import React from "react";

function RecipientsList() {
  const recipients = JSON.parse(localStorage.getItem("requests")) || [];

  return (
    <div className="container mt-4">
      <h2>Recipients & Item Requests</h2>

      {recipients.length === 0 ? (
        <p>No recipient requests available.</p>
      ) : (
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Reason</th>
            </tr>
          </thead>

          <tbody>
            {recipients.map((r, i) => (
              <tr key={i}>
                <td>{r.item}</td>
                <td>{r.quantity}</td>
                <td>{r.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RecipientsList;

