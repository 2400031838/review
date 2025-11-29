import React, { useState } from "react";

function Feedback() {
  const [message, setMessage] = useState("");
  const [list, setList] = useState(
    JSON.parse(localStorage.getItem("feedback")) || []
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message) {
      alert("Enter feedback!");
      return;
    }

    const updated = [...list, message];
    setList(updated);

    localStorage.setItem("feedback", JSON.stringify(updated));
    setMessage("");
  };

  return (
    <div className="container mt-4">
      <h2>Feedback</h2>

      <div className="card p-3 shadow mt-3">
        <form onSubmit={handleSubmit}>
          <textarea
            className="form-control"
            rows="3"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          <button className="btn btn-primary w-100 mt-3">
            Submit Feedback
          </button>
        </form>
      </div>

      <h3 className="mt-4">Your Previous Feedback</h3>

      {list.length === 0 ? (
        <p>No feedback submitted.</p>
      ) : (
        <ul className="list-group mt-3">
          {list.map((f, i) => (
            <li key={i} className="list-group-item">
              {f}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Feedback;

