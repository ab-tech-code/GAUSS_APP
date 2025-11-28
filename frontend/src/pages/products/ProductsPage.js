// src/pages/products/ProductsPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Card from '../../components/Card';
import Button from '../../components/Button';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data.products || []);
    } catch (err) {
      console.error(err);
      alert('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await api.delete(`/products/${id}`);

      alert('Product deleted successfully!');
      setProducts(products.filter((product) => product.id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete product');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">Products</h2>
        <Link to="/products/add">
          <Button variant="primary">+ Add Product</Button>
        </Link>
      </div>

      <Card title="All Products">
        {loading ? (
          <p>Loading products...</p>
        ) : products.length === 0 ? (
          <p>No products added yet.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price (₦)</th>
                <th>Stock</th>
                <th>Category</th>
                <th>Date Added</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="table-img"
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                  <td>{product.category}</td>
                  <td>{new Date(product.created_at).toLocaleDateString()}</td>
                  <td style={{ display: "flex", gap: "10px" }}>
                    <Link to={`/products/edit/${product.id}`}>
                      <Button variant="outline" className="small-btn">
                        Edit
                      </Button>
                    </Link>

                    <Button
                      variant="danger"
                      className="small-btn"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
