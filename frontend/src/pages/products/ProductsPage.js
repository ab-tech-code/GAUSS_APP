// src/pages/products/ProductsPage.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import Card from "../../components/Card";
import Button from "../../components/Button";
import "./ProductsPage.css";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data.products || []);
    } catch (err) {
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await api.delete(`/products/${id}`);
      alert("Product deleted successfully!");
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      alert("Failed to delete product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="products-root">
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
          <p className="empty-text">No products added yet.</p>
        ) : (
          <>
            {/* DESKTOP TABLE VIEW */}
            <table className="products-table desktop-view">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price (₦)</th>
                  <th>Stock</th>
                  <th>Category</th>
                  <th>Added</th>
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
                    <td>₦{product.price}</td>
                    <td>{product.stock}</td>
                    <td>{product.category}</td>
                    <td>
                      {new Date(product.created_at).toLocaleDateString()}
                    </td>
                    <td className="action-buttons">
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

            {/* MOBILE GRID VIEW */}
            <div className="mobile-view product-grid">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="product-card-img"
                  />

                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">₦{product.price}</p>

                  <div className="product-row">
                    <span className="label">Stock:</span>
                    <span>{product.stock}</span>
                  </div>

                  <div className="product-row">
                    <span className="label">Category:</span>
                    <span>{product.category}</span>
                  </div>

                  <div className="product-actions">
                    <Link to={`/products/edit/${product.id}`}>
                      <Button variant="outline" className="small-btn block-btn">
                        Edit
                      </Button>
                    </Link>

                    <Button
                      variant="danger"
                      className="small-btn block-btn"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
