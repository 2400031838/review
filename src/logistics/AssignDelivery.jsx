import React, { useEffect, useState } from "react";

function AssignDelivery() {
  const [assignments, setAssignments] = useState([]);
  const [selection, setSelection] = useState({
    donorItem: "",
    recipientRequest: "",
    deliveryPerson: "",
  });

  const donations = JSON.parse(localStorage.getItem("donations")) || [];
  const requests = JSON.parse(localStorage.getItem("requests")) || [];

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("assignments")) || [];
    setAssignments(stored);
  }, []);

  const handleChange = (e) => {
    setSelection({ ...selection, [e.target.name]: e.target.value });
  };

  const handleAssign = (e) => {
    e.preventDefault();

    if (
      !selection.donorItem ||
      !selection.recipientRequest ||
      !selection.deliveryPerson
    ) {
      alert("All fields are required!");
      return;
    }

    const updated = [...assignments, selection];
    setAssignments(updated);
    localStorage.setItem("assignments", JSON.stringify(updated));

    setSelection({
      donorItem: "",
      recipientRequest: "",
      deliveryPerson: "",
    });
  };

  return (
    <div className="container mt-4">
      <h2>Assign Delivery</h2>

      <div className="card p-3 mt-3 shadow">
        <form onSubmit={handleAssign}>
          <div className="mb-3">
            <label>Select Donor Item</label>
            <select
              className="form-select"
              name="donorItem"
              value={selection.donorItem}
              onChange={handleChange}
            >
              <option value="">Select Item</option>
              {donations.map((d, i) => (
                <option key={i} value={d.item}>
                  {d.item} ({d.quantity})
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label>Select Recipient Request</label>
            <select
              className="form-select"
              name="recipientRequest"
              value={selection.recipientRequest}
              onChange={handleChange}
            >
              <option value="">Select Request</option>
              {requests.map((r, i) => (
                <option key={i} value={r.item}>
                  {r.item} ({r.quantity})
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label>Delivery Person</label>
            <input
              type="text"
              className="form-control"
              name="deliveryPerson"
              value={selection.deliveryPerson}
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-success w-100">
            Assign Delivery
          </button>
        </form>
      </div>

      <h3 className="mt-4">All Assignments</h3>

      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>Donor Item</th>
            <th>Recipient Request</th>
            <th>Delivery Person</th>
          </tr>
        </thead>

        <tbody>
          {assignments.map((a, i) => (
            <tr key={i}>
              <td>{a.donorItem}</td>
              <td>{a.recipientRequest}</td>
              <td>{a.deliveryPerson}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssignDelivery;
