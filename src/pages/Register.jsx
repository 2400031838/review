import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.role) {
      alert("All fields are required!");
      return;
    }

    // Save user in localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Successful!");
    navigate("/login");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "450px" }}>
      <h2 className="text-center">Create Account</h2>

      <div className="card p-4 shadow mt-4">
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Select Role</label>
            <select
              name="role"
              className="form-select"
              value={form.role}
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="donor">Donor</option>
              <option value="recipient">Recipient</option>
              <option value="logistics">Logistics</option>
            </select>
          </div>

          <button className="btn btn-primary w-100">Register</button>

          <p className="mt-3 text-center">
            Already have an account?{" "}
            <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;

