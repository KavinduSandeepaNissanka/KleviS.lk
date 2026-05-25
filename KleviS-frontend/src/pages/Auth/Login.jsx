import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { refreshUser } = useContext(AuthContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const data = await AuthService.login(formData.email, formData.password);
        refreshUser();
        if (data.user.role === 'ROLE_ADMIN') {
          navigate('/admin');
        } else {
          navigate('/profile');
        }
      } catch (error) {
        setErrors({ email: 'Invalid email or password' });
      }
    }
  };

  return (
    <div className="auth-container fade-in">
      {/* Visual Left Side */}
      <div 
        className="auth-visual" 
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2070')` }}
      >
        <div className="auth-visual-text">
          <h2>KleviS.lk</h2>
          <p>Elevate your everyday style.</p>
        </div>
      </div>

      {/* Form Right Side */}
      <div className="auth-form-container">
        <div className="auth-form-wrapper">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to access your KleviS.lk account</p>
          
          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <button type="submit" className="auth-submit-btn">Sign In</button>
          </form>

          <div className="auth-links">
            <p>Don't have an account? <Link to="/register" className="auth-link">Create Account</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
