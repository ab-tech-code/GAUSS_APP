// src/pages/products/AddProductPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Button from '../../components/Button';
import Card from '../../components/Card';

export default function AddProductPage() {
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    description: '',
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productData.name || !productData.price || !image) {
      alert('Product name, price, and image are required');
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      Object.entries(productData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append('image', image);

      await api.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Product added successfully!');
      navigate('/products');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">Add New Product</h2>
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

          <label>
            Product Image:
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>

          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Saving...' : 'Add Product'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
