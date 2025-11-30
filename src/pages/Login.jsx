import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// ⭐ Firebase Firestore
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    captchaInput: "",
  });

  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaError, setCaptchaError] = useState("");

  function generateCaptcha() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  }

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setCaptchaError("");
    setForm({ ...form, captchaInput: "" });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ⭐ CAPTCHA CHECK
    if (form.captchaInput !== captcha) {
      setCaptchaError("Captcha incorrect! Please try again.");
      refreshCaptcha();
      return;
    }

    try {
      // ⭐ FIREBASE LOGIN CHECK
      const q = query(
        collection(db, "users"),
        where("email", "==", form.email),
        where("password", "==", form.password)
      );

      const querySnap = await getDocs(q);

      if (querySnap.empty) {
        alert("Invalid Email or Password!");
        return;
      }

      const user = querySnap.docs[0].data();

      alert("Login Successful!");

      // ⭐ REDIRECT BASED ON ROLE
      localStorage.setItem("loggedInUser", user.email);
      localStorage.setItem("loggedInRole", user.role);

      if (user.role === "admin") navigate("/admin/dashboard");
      else if (user.role === "donor") navigate("/donor/dashboard");
      else if (user.role === "recipient") navigate("/recipient/dashboard");
      else if (user.role === "logistics") navigate("/logistics/dashboard");
      else navigate("/");
    } catch (error) {
      console.error(error);
      alert("Error while logging in!");
    }
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
          {/* Email */}
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

          {/* Password */}
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

          {/* CAPTCHA */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ color: "white" }}>Captcha</label>

            <div
              style={{ display: "flex", alignItems: "center", marginTop: "5px" }}
            >
              <div
                style={{
                  padding: "10px 15px",
                  background: "#333",
                  color: "#00ffcc",
                  fontSize: "20px",
                  letterSpacing: "3px",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  userSelect: "none",
                }}
              >
                {captcha}
              </div>

              <button
                type="button"
                onClick={refreshCaptcha}
                style={{
                  marginLeft: "10px",
                  padding: "8px 12px",
                  background: "#555",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                ↻
              </button>
            </div>

            <input
              type="text"
              name="captchaInput"
              placeholder="Enter captcha"
              value={form.captchaInput}
              onChange={handleChange}
              style={{
                width: "100%",
                marginTop: "10px",
                background: "#333",
                border: "1px solid #555",
                padding: "10px",
                borderRadius: "5px",
                color: "white",
              }}
            />

            {captchaError && (
              <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
                {captchaError}
              </p>
            )}
          </div>

          {/* Login Button */}
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
