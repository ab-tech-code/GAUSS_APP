// src/pages/auth/LoginPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../assets/logo.png";
import "./LoginPage.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter your email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/vendor/login", {
        email,
        password,
      });

      login(res.data.vendor, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-root">
      <div className="login-card">
        <img src={logo} alt="GAUSS Logo" className="login-logo" />

        <h2 className="login-title">Vendor Login</h2>
        <p className="login-sub">Welcome back! Please log in to continue.</p>

        <form className="login-form" onSubmit={handleSubmit}>
          {/* EMAIL */}
          <div className="login-field">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="example@business.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="login-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* BUTTON */}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* LINKS */}
          <div className="login-links">
            <a href="#" className="forgot-link">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
