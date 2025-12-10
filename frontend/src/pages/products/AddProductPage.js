// src/pages/products/AddProductPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Button from "../../components/Button";
import Card from "../../components/Card";
import "./AddProductPage.css";

export default function AddProductPage() {
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productData.name || !productData.price || !image) {
      alert("Product name, price, and image are required");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      Object.entries(productData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("image", image);

      await api.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product added successfully!");
      navigate("/products");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-root">
      <div className="page-header">
        <h2 className="page-title">Add New Product</h2>
        <p className="page-subtitle">Fill the details below to add a product</p>
      </div>

      <Card className="add-product-card">
        <form className="product-form" onSubmit={handleSubmit}>
          {/* INPUTS GRID */}
          <div className="form-grid">
            <div className="form-group">
              <label>Product Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter product name"
                value={productData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Price (₦)</label>
              <input
                type="number"
                name="price"
                placeholder="5000"
                value={productData.price}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Stock Quantity</label>
              <input
                type="number"
                name="stock"
                placeholder="100"
                value={productData.stock}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                name="category"
                placeholder="Snacks, Drinks, Electronics..."
                value={productData.category}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Short description about the product..."
              rows="4"
              value={productData.description}
              onChange={handleChange}
            />
          </div>

          {/* IMAGE UPLOAD WITH PREVIEW */}
          <div className="form-group">
            <label>Product Image</label>

            <div className="image-upload-box">
              {preview ? (
                <img src={preview} alt="Preview" className="preview-img" />
              ) : (
                <p className="upload-placeholder">Click to upload product image</p>
              )}

              <input
                type="file"
                accept="image/*"
                className="image-input"
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Saving..." : "Add Product"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
