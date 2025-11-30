import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// ⭐ Firestore imports
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const isStrongPassword = (password) => {
    const strongRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$!%*?&]).{8,}$/;
    return strongRegex.test(password);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.role) {
      alert("All fields are required!");
      return;
    }

    if (!isStrongPassword(form.password)) {
      alert(
        "Password must be 8+ characters, include uppercase, lowercase, number, and special symbol."
      );
      return;
    }

    try {
      // ⭐ Save user in Firestore
      await addDoc(collection(db, "users"), {
        ...form,
        createdAt: new Date(),
      });

      alert("Registration Successful!");
      navigate("/login");
    } catch (err) {
      console.error("Firestore Error:", err);
      alert("Something went wrong while saving to Firestore");
    }
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
            <small className="text-muted">
              Must include A-Z, a-z, 0-9, special symbol (@,#,$,!,%).
            </small>
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
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
