import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/api';
import { User, Shield } from 'lucide-react';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'ROLE_USER', // Default to normal user
    adminCode: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleRoleChange = (role) => {
    setFormData({ ...formData, role });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    if (formData.role === 'ROLE_ADMIN' && formData.adminCode !== 'KleviS2026') {
      newErrors.adminCode = 'Invalid Admin Verification Code';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        await AuthService.register({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          role: formData.role
        });
        console.log(`Registration successful as ${formData.role}`);
        // Optionally you could set a success state here instead of an alert
        navigate('/login');
      } catch (error) {
        setErrors({ email: 'Registration failed. Email might exist.' });
      }
    }
  };

  return (
    <div className="auth-container fade-in">
      {/* Visual Left Side */}
      <div 
        className="auth-visual" 
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=2071')` }}
      >
        <div className="auth-visual-text">
          <h2>KleviS.lk</h2>
          <p>Join the movement.</p>
        </div>
      </div>

      {/* Form Right Side */}
      <div className="auth-form-container">
        <div className="auth-form-wrapper" style={{ padding: '2rem 3rem' }}>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join KleviS.lk for exclusive access to new arrivals</p>
          
          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            
            {/* Custom Role Selector */}
            <div className="form-group">
              <label>Account Type (For Testing)</label>
              <div className="role-selector">
                <div className="role-option">
                  <input 
                    type="radio" 
                    id="role-user" 
                    name="role" 
                    value="ROLE_USER" 
                    checked={formData.role === 'ROLE_USER'} 
                    onChange={() => handleRoleChange('ROLE_USER')}
                  />
                  <label htmlFor="role-user" className="role-label">
                    <User size={24} />
                    <span>Customer</span>
                  </label>
                </div>
                <div className="role-option">
                  <input 
                    type="radio" 
                    id="role-admin" 
                    name="role" 
                    value="ROLE_ADMIN" 
                    checked={formData.role === 'ROLE_ADMIN'} 
                    onChange={() => handleRoleChange('ROLE_ADMIN')}
                  />
                  <label htmlFor="role-admin" className="role-label">
                    <Shield size={24} />
                    <span>Store Admin</span>
                  </label>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First" />
                {errors.firstName && <span className="error-text">{errors.firstName}</span>}
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last" />
                {errors.lastName && <span className="error-text">{errors.lastName}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Create a password" />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" />
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
            </div>

            {formData.role === 'ROLE_ADMIN' && (
              <div className="auth-form-group fade-in" style={{ marginTop: '15px' }}>
                <label className="auth-label">Admin Verification Code</label>
                <input
                  type="password"
                  name="adminCode"
                  className={`auth-input ${errors.adminCode ? 'error' : ''}`}
                  placeholder="Enter the secret admin key"
                  value={formData.adminCode}
                  onChange={handleChange}
                />
                {errors.adminCode && <span className="auth-error-text">{errors.adminCode}</span>}
              </div>
            )}

            <button type="submit" className="auth-submit-btn">Create Account</button>
          </form>

          <div className="auth-links">
            <p>Already have an account? <Link to="/login" className="auth-link">Sign In</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
