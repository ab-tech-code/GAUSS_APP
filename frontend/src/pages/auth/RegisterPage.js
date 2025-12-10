import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";
import api from "../../services/api";
import logo from "../../assets/logo.png";
import { FiUser, FiMail, FiLock, FiBriefcase, FiList } from "react-icons/fi";

export default function RegisterPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    businessName: "",
    category: "",
    customCategory: "",
    logoFile: null,
  });

  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);

  const CATEGORIES = [
    "Food & Restaurant",
    "Fashion & Clothing",
    "Electronics",
    "Logistics",
    "Others",
  ];

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
    setForm((p) => ({
      ...p,
      [e.target.name]: e.target.value,
    }));
    setErrors((p) => ({ ...p, [e.target.name]: undefined }));
  };

  const handleFileSelect = (file) => {
    if (!file) return;
    setForm((p) => ({ ...p, logoFile: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
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
      data.append(
        "category",
        form.category === "Others" ? form.customCategory : form.category
      );
      if (form.logoFile) data.append("logo", form.logoFile);

      const res = await api.post("/vendor/register-pending", data);

      alert(
        res?.data?.message ||
          "Registration submitted! You will be able to log in after admin approval."
      );

      navigate("/pending-approval");
    } catch (err) {
      alert(err?.response?.data?.message || "Could not submit registration.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="register-root">
      <div className="register-card">
        <img src={logo} alt="GAUSS" className="reg-logo" />

        <h2 className="reg-title">Vendor Registration</h2>
        <p className="reg-sub">
          Submit your details. Admin will review and approve your account.
        </p>

        <form className="reg-form" onSubmit={handleSubmit}>
          {/* Left Column */}
          <div className="reg-grid">

            {/* Full Name */}
            <div className="field">
              <label>Full Name</label>
              <div className="input-icon">
                <FiUser />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              {errors.name && <div className="field-error">{errors.name}</div>}
            </div>

            {/* Email */}
            <div className="field">
              <label>Business Email</label>
              <div className="input-icon">
                <FiMail />
                <input
                  type="email"
                  name="email"
                  placeholder="example@domain.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && (
                <div className="field-error">{errors.email}</div>
              )}
            </div>

            {/* Password */}
            <div className="field">
              <label>Password</label>
              <div className="input-icon">
                <FiLock />
                <input
                  type="password"
                  name="password"
                  placeholder="Minimum 6 characters"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
              {errors.password && (
                <div className="field-error">{errors.password}</div>
              )}
            </div>

            {/* Business Name */}
            <div className="field">
              <label>Business Name</label>
              <div className="input-icon">
                <FiBriefcase />
                <input
                  type="text"
                  name="businessName"
                  placeholder="Your Business Name"
                  value={form.businessName}
                  onChange={handleChange}
                />
              </div>
              {errors.businessName && (
                <div className="field-error">{errors.businessName}</div>
              )}
            </div>

            {/* Category */}
            <div className="field">
              <label>Business Category</label>
              <div className="input-icon">
                <FiList />
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  {CATEGORIES.map((cat, idx) => (
                    <option key={idx} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              {errors.category && (
                <div className="field-error">{errors.category}</div>
              )}
            </div>

            {/* Custom category if "Others" */}
            {form.category === "Others" && (
              <div className="field">
                <label>Specify Category</label>
                <input
                  type="text"
                  name="customCategory"
                  placeholder="Enter your category"
                  value={form.customCategory}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>

          {/* Logo Upload */}
          <div
            className={`upload-box ${dragActive ? "drag-active" : ""}`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleFileDrop}
            onClick={() => fileInputRef.current.click()}
          >
            {preview ? (
              <img src={preview} alt="Preview" className="upload-preview" />
            ) : (
              <p>Drag & Drop Logo or Click to Upload</p>
            )}

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handleFileSelect(e.target.files[0])}
            />
          </div>

          {/* Submit */}
          <button type="submit" className="reg-btn" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit for Approval"}
          </button>
        </form>
      </div>
    </div>
  );
}
