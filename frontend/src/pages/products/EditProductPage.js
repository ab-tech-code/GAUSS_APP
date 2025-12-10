// src/pages/products/EditProductPage.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import Button from "../../components/Button";
import Card from "../../components/Card";
import "./EditProductPage.css";

export default function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [productData, setProductData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    image_url: "",
  });

  const [newImage, setNewImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      setProductData(res.data.product);
    } catch (err) {
      alert("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("price", productData.price);
      formData.append("stock", productData.stock);
      formData.append("category", productData.category);
      formData.append("description", productData.description);

      if (newImage) formData.append("image", newImage);

      await api.put(`/products/${id}`, formData);

      alert("Product updated successfully!");
      navigate("/products");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading product...</p>;

  return (
    <div className="edit-product-root">
      <div className="page-header">
        <h2 className="page-title">Edit Product</h2>
        <p className="page-subtitle">Update product details below</p>
      </div>

      <Card className="edit-product-card">
        <form className="product-form" onSubmit={handleSubmit}>
          {/* INPUT GRID */}
          <div className="form-grid">
            <div className="form-group">
              <label>Product Name</label>
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Price (₦)</label>
              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Stock Quantity</label>
              <input
                type="number"
                name="stock"
                value={productData.stock}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                name="category"
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
              value={productData.description}
              rows="4"
              onChange={handleChange}
            />
          </div>

          {/* CURRENT IMAGE */}
          <div className="form-group">
            <label>Current Image</label>
            <div className="current-image-box">
              <img
                src={productData.image_url}
                alt="Current"
                className="current-image"
              />
            </div>
          </div>

          {/* NEW UPLOAD */}
          <div className="form-group">
            <label>Upload New Image (optional)</label>

            <div className="image-upload-box">
              {preview ? (
                <img src={preview} className="preview-img" alt="Preview" />
              ) : (
                <p className="upload-placeholder">Click to select new image</p>
              )}

              <input
                type="file"
                accept="image/*"
                className="image-input"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <Button type="submit" variant="primary" disabled={saving}>
            {saving ? "Saving..." : "Update Product"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
