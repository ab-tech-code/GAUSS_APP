// src/pages/auth/RegisterPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";
import api from "../../services/api";
import logo from "../../assets/logo.png";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    businessName: "",
    category: "",
    logoFile: null,
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = "Name is required";
    if (!form.email.trim()) err.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      err.email = "Invalid email format";
    if (!form.password || form.password.length < 6)
      err.password = "Password must be at least 6 characters";
    if (!form.businessName.trim()) err.businessName = "Business name required";
    if (!form.category.trim()) err.category = "Category is required";
    return err;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((p) => ({
      ...p,
      [name]: files ? files[0] : value,
    }));
    setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    setSubmitting(true);

    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("email", form.email);
      data.append("password", form.password);
      data.append("business_name", form.businessName);
      data.append("category", form.category);
      if (form.logoFile) data.append("logo", form.logoFile);

      const res = await api.post("/vendor/register-pending", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(
        res?.data?.message ||
          "Registration submitted! You will be able to log in after admin approval."
      );

      navigate("/pending-approval");
    } catch (err) {
      console.error(err);
      alert(
        err?.response?.data?.message ||
          "Could not submit registration. Try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="register-root">
      <div className="register-card">
        <img src={logo} alt="GAUSS" className="reg-logo" />

        <h2>Vendor Registration</h2>
        <p className="reg-sub">
          Submit your details. Admin will review and approve your account.
        </p>

        <form className="reg-form" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <div className="field-error">{errors.name}</div>}
          </div>

          <div className="field">
            <input
              type="email"
              name="email"
              placeholder="Business Email"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <div className="field-error">{errors.email}</div>}
          </div>

          <div className="field">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && (
              <div className="field-error">{errors.password}</div>
            )}
          </div>

          <div className="field">
            <input
              type="text"
              name="businessName"
              placeholder="Business Name"
              value={form.businessName}
              onChange={handleChange}
            />
            {errors.businessName && (
              <div className="field-error">{errors.businessName}</div>
            )}
          </div>

          <div className="field">
            <input
              type="text"
              name="category"
              placeholder="Business Category"
              value={form.category}
              onChange={handleChange}
            />
            {errors.category && (
              <div className="field-error">{errors.category}</div>
            )}
          </div>

          <label className="file-label">
            Upload Logo (optional)
            <input
              type="file"
              name="logoFile"
              accept="image/*"
              onChange={handleChange}
            />
          </label>

          <button type="submit" className="reg-btn" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit for Approval"}
          </button>
        </form>
      </div>
    </div>
  );
}
