import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h3 className="footer-col-title">KleviS.lk</h3>
            <p className="footer-col-text">
              Premium fashion and lifestyle brand offering the latest trends with uncompromising quality and sustainable practices.
            </p>
            <div className="social-icons">
              <a href="#" className="social-icon" aria-label="Facebook">FB</a>
              <a href="#" className="social-icon" aria-label="Twitter">TW</a>
              <a href="#" className="social-icon" aria-label="Instagram">IG</a>
              <a href="#" className="social-icon" aria-label="YouTube">YT</a>
            </div>
          </div>
          
          <div>
            <h3 className="footer-col-title">Shop</h3>
            <ul className="footer-links">
              <li><Link to="/shop?category=men" className="footer-link">Men's Collection</Link></li>
              <li><Link to="/shop?category=women" className="footer-link">Women's Collection</Link></li>
              <li><Link to="/shop?category=kids" className="footer-link">Kids' Collection</Link></li>
              <li><Link to="/shop?category=accessories" className="footer-link">Accessories</Link></li>
              <li><Link to="/shop?sale=true" className="footer-link">Sale & Offers</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="footer-col-title">Company</h3>
            <ul className="footer-links">
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
              <li><Link to="/careers" className="footer-link">Careers</Link></li>
              <li><Link to="/terms" className="footer-link">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="footer-col-title">Newsletter</h3>
            <p className="footer-col-text">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="newsletter-input"
                required
              />
              <button type="submit" className="newsletter-btn">Subscribe</button>
            </form>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} KleviS.lk. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
