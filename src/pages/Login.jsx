import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === form.email && u.password === form.password
    );

    if (!user) {
      alert("Invalid email or password!");
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));

    // Navigate based on role
    navigate(`/${user.role}/dashboard`);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#1b1b1b",
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "30px",
          borderRadius: "12px",
          background: "#222",
          border: "1px solid #444",
          boxShadow: "0 0 15px rgba(0,0,0,0.4)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "white",
            marginBottom: "20px",
          }}
        >
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ color: "white" }}>Email</label>
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              style={{
                width: "100%",
                background: "#333",
                border: "1px solid #555",
                padding: "10px",
                borderRadius: "5px",
                color: "white",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ color: "white" }}>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              style={{
                width: "100%",
                background: "#333",
                border: "1px solid #555",
                padding: "10px",
                borderRadius: "5px",
                color: "white",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              background: "#28a745",
              color: "white",
              borderRadius: "5px",
              fontWeight: "bold",
              border: "none",
              marginTop: "10px",
            }}
          >
            Login
          </button>
        </form>

        <p style={{ color: "white", marginTop: "15px", textAlign: "center" }}>
          Don’t have an account?{" "}
          <Link to="/register" className="text-info">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
