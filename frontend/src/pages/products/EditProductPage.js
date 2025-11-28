// src/pages/products/EditProductPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Button from '../../components/Button';
import Card from '../../components/Card';

export default function EditProductPage() {
  const { id } = useParams(); // product ID from URL
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [productData, setProductData] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    description: '',
    image_url: '',
  });

  const [newImage, setNewImage] = useState(null);

  // Fetch product by ID
  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      setProductData(res.data.product);
    } catch (err) {
      console.error(err);
      alert('Failed to load product');
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
    setNewImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append('name', productData.name);
      formData.append('price', productData.price);
      formData.append('stock', productData.stock);
      formData.append('category', productData.category);
      formData.append('description', productData.description);

      if (newImage) formData.append('image', newImage);

      await api.put(`/products/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Product updated successfully!');
      navigate('/products');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to update product');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading product...</p>;

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">Edit Product</h2>
      </div>

      <Card>
        <form className="form" onSubmit={handleSubmit}>
          <label>
            Product Name:
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
            />
          </label>

          <label>
            Price (₦):
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
            />
          </label>

          <label>
            Stock Quantity:
            <input
              type="number"
              name="stock"
              value={productData.stock}
              onChange={handleChange}
            />
          </label>

          <label>
            Category:
            <input
              type="text"
              name="category"
              value={productData.category}
              onChange={handleChange}
            />
          </label>

          <label>
            Description:
            <textarea
              name="description"
              value={productData.description}
              onChange={handleChange}
            />
          </label>

          <div className="current-image-preview">
            <p>Current Image:</p>
            <img
              src={productData.image_url}
              alt="Current product"
              className="product-preview"
            />
          </div>

          <label>
            Upload New Image (optional):
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>

          <Button type="submit" variant="primary" disabled={saving}>
            {saving ? 'Saving...' : 'Update Product'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
