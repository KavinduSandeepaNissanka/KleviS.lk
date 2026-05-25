import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Users, Package } from 'lucide-react';
import { ProductService, AuthService } from '../../services/api';
import './AdminDashboard.css';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('products');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: '', category: '', price: '', originalPrice: '', 
    brand: '', description: '', image: '', discount: 0
  });

    useEffect(() => {
    // Basic auth check
    const user = AuthService.getCurrentUser();
    if (!user || user.role !== 'ROLE_ADMIN') {
      // navigate('/login');
    }
    if (activeTab === 'products') {
      fetchProducts();
    } else {
      fetchUsers();
    }
  }, [navigate, activeTab]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await ProductService.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await AuthService.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData(product);
    } else {
      setEditingProduct(null);
      setFormData({
        name: '', category: '', price: '', originalPrice: '', 
        brand: '', description: '', image: '', discount: 0
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create empty arrays for fields not fully managed in this basic form
      const productPayload = {
        ...formData,
        sizes: formData.sizes || ["S", "M", "L"],
        colors: formData.colors || ["Black"],
        images: formData.images || [formData.image]
      };

      if (editingProduct) {
        await ProductService.updateProduct(editingProduct.id, productPayload);
      } else {
        await ProductService.createProduct(productPayload);
      }
      closeModal();
      fetchProducts();
    } catch (error) {
      alert("Failed to save product. Ensure backend is running.");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await ProductService.deleteProduct(id);
        fetchProducts();
      } catch (error) {
        alert("Failed to delete product");
      }
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to completely delete this user? This cannot be undone.")) {
      try {
        await AuthService.deleteUser(id);
        fetchUsers();
      } catch (error) {
        alert("Failed to delete user");
      }
    }
  };

  return (
    <div className="admin-dashboard container fade-in">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        {activeTab === 'products' && (
          <button className="btn btn-primary" onClick={() => openModal()}>
            <Plus size={18} style={{ marginRight: '5px' }} /> Add New Product
          </button>
        )}
      </div>

      <div className="admin-tabs">
        <button 
          className={`admin-tab ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          <Package size={18} /> Manage Products
        </button>
        <button 
          className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <Users size={18} /> Manage Users
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : activeTab === 'products' ? (
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img src={product.image} alt={product.name} className="product-img-thumbnail" />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>${product.price}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon edit" onClick={() => openModal(product)}>
                        <Edit2 size={18} />
                      </button>
                      <button className="btn-icon delete" onClick={() => handleDelete(product.id || product._id)}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email Address</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`role-badge ${user.role === 'ROLE_ADMIN' ? 'admin' : 'user'}`}>
                      {user.role === 'ROLE_ADMIN' ? 'Admin' : 'Customer'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon delete" onClick={() => handleDeleteUser(user.id)} disabled={user.email === 'admin@klevis.lk'}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Product Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button className="btn-icon" onClick={closeModal}><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label className="form-label">Product Name</label>
                <input type="text" name="name" className="form-input" value={formData.name} onChange={handleInputChange} required style={{width: '100%'}}/>
              </div>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label className="form-label">Category</label>
                  <input type="text" name="category" className="form-input" value={formData.category} onChange={handleInputChange} required style={{width: '100%'}}/>
                </div>
                <div style={{ flex: 1 }}>
                  <label className="form-label">Brand</label>
                  <input type="text" name="brand" className="form-input" value={formData.brand} onChange={handleInputChange} required style={{width: '100%'}}/>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label className="form-label">Price ($)</label>
                  <input type="number" step="0.01" name="price" className="form-input" value={formData.price} onChange={handleInputChange} required style={{width: '100%'}}/>
                </div>
                <div style={{ flex: 1 }}>
                  <label className="form-label">Original Price ($)</label>
                  <input type="number" step="0.01" name="originalPrice" className="form-input" value={formData.originalPrice} onChange={handleInputChange} style={{width: '100%'}}/>
                </div>
              </div>

              <div>
                <label className="form-label">Image URL</label>
                <input type="text" name="image" className="form-input" value={formData.image} onChange={handleInputChange} required style={{width: '100%'}}/>
              </div>

              <div>
                <label className="form-label">Description</label>
                <textarea name="description" className="form-input" value={formData.description} onChange={handleInputChange} rows="3" required style={{width: '100%', resize: 'vertical'}}></textarea>
              </div>

              <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" className="btn btn-outline" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editingProduct ? 'Update Product' : 'Save Product'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
