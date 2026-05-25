import React, { useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, Heart, User, Menu, X, Sun, Moon, Search } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';
import { CartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/WishlistContext';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { cartItemCount } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const { user } = useContext(AuthContext);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          Klevi<span>S.lk</span>
        </Link>

        <nav className="navbar-links">
          <NavLink to="/" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
          <NavLink to="/shop" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Shop</NavLink>
          <NavLink to="/about" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>About Us</NavLink>
          <NavLink to="/contact" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Contact</NavLink>
          
          {/* Only show Admin link if logged in user is an ADMIN */}
          {user?.role === 'ROLE_ADMIN' && (
            <NavLink to="/admin" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} style={{color: 'var(--primary-color)', fontWeight: 'bold'}}>Admin</NavLink>
          )}
        </nav>

        <div className="navbar-actions">
          <button className="action-btn" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <Link to="/shop" className="action-btn" aria-label="Search">
            <Search size={20} />
          </Link>
          <Link to="/profile" className="action-btn" aria-label="Profile">
            <User size={20} />
          </Link>
          <Link to="/wishlist" className="action-btn" aria-label="Wishlist">
            <Heart size={20} />
            {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
          </Link>
          <Link to="/cart" className="action-btn" aria-label="Cart">
            <ShoppingBag size={20} />
            {cartItemCount > 0 && <span className="badge">{cartItemCount}</span>}
          </Link>
          
          <button className="action-btn mobile-menu-btn" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <Link to="/" className="nav-link" onClick={toggleMobileMenu}>Home</Link>
        <Link to="/shop" className="nav-link" onClick={toggleMobileMenu}>Shop</Link>
        <Link to="/about" className="nav-link" onClick={toggleMobileMenu}>About Us</Link>
        <Link to="/contact" className="nav-link" onClick={toggleMobileMenu}>Contact</Link>
      </div>
    </header>
  );
};

export default Navbar;
