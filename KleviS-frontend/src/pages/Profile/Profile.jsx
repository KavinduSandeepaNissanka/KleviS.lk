import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Package, MapPin, CreditCard, LogOut } from 'lucide-react';
import { AuthService } from '../../services/api';
import { AnimationContext } from '../../context/AnimationContext';
import { AuthContext } from '../../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('account');
  const navigate = useNavigate();
  const { user, refreshUser } = useContext(AuthContext);
  const { triggerLogoutAnimation, resetAnimation } = useContext(AnimationContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogout = () => {
    // 1. Trigger the doors to close
    triggerLogoutAnimation();

    // 2. Wait 3 seconds for doors to fully close and screen to fade to black
    setTimeout(() => {
      AuthService.logout();
      refreshUser();
      navigate('/login');
      resetAnimation();
    }, 3000);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <div className="fade-in">
            <h3 style={{ marginBottom: '20px' }}>Account Details</h3>
            <div className="profile-details-grid">
              <div className="detail-item">
                <span className="detail-label">First Name</span>
                <span className="detail-value">{user?.firstName || 'Not provided'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Last Name</span>
                <span className="detail-value">{user?.lastName || 'Not provided'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Email Address</span>
                <span className="detail-value">{user?.email || 'Not provided'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Account Role</span>
                <span className="detail-value">{user?.role === 'ROLE_ADMIN' ? 'Store Admin' : 'Customer'}</span>
              </div>
            </div>
            <button className="btn btn-outline" style={{ marginTop: '20px' }}>Edit Details</button>
          </div>
        );
      case 'orders':
        return (
          <div className="fade-in">
            <h3 style={{ marginBottom: '20px' }}>Order History</h3>
            <p style={{ color: 'var(--text-light)' }}>You haven't placed any orders yet.</p>
          </div>
        );
      case 'addresses':
        return (
          <div className="fade-in">
            <h3 style={{ marginBottom: '20px' }}>Saved Addresses</h3>
            <div style={{ padding: '15px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
              <strong>Home</strong>
              <p>123 Fashion Street, Suite 100</p>
              <p>New York, NY 10001</p>
              <p>United States</p>
            </div>
            <button className="btn btn-outline" style={{ marginTop: '20px' }}>Add New Address</button>
          </div>
        );
      case 'payment':
        return (
          <div className="fade-in">
            <h3 style={{ marginBottom: '20px' }}>Payment Methods</h3>
            <p style={{ color: 'var(--text-light)' }}>No saved payment methods.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="profile-page container fade-in">
      <h1 className="shop-title" style={{ marginBottom: 'var(--spacing-xl)' }}>My Account</h1>
      
      <div className="profile-container">
        <aside className="profile-sidebar">
          <div className="profile-header">
            <div className="profile-avatar">{user ? user.firstName.charAt(0) + user.lastName.charAt(0) : 'U'}</div>
            <div className="profile-info">
              <h2>{user ? `${user.firstName} ${user.lastName}` : 'User'}</h2>
              <p>{user?.role === 'ROLE_ADMIN' ? 'Store Administrator' : 'Member since 2024'}</p>
            </div>
          </div>
          
          <nav className="profile-nav">
            <button 
              className={`profile-nav-item ${activeTab === 'account' ? 'active' : ''}`}
              onClick={() => setActiveTab('account')}
            >
              <User size={18} /> Account Details
            </button>
            <button 
              className={`profile-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <Package size={18} /> Orders
            </button>
            <button 
              className={`profile-nav-item ${activeTab === 'addresses' ? 'active' : ''}`}
              onClick={() => setActiveTab('addresses')}
            >
              <MapPin size={18} /> Addresses
            </button>
            <button 
              className={`profile-nav-item ${activeTab === 'payment' ? 'active' : ''}`}
              onClick={() => setActiveTab('payment')}
            >
              <CreditCard size={18} /> Payment Methods
            </button>
            <button className="profile-nav-item" onClick={handleLogout} style={{ color: 'var(--error-color)', marginTop: '20px' }}>
              <LogOut size={18} /> Logout
            </button>
          </nav>
        </aside>

        <main className="profile-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Profile;
