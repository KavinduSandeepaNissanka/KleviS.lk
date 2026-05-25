import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2 } from 'lucide-react';
import { CartContext } from '../../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useContext(CartContext);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleApplyCoupon = () => {
    if (coupon.toUpperCase() === 'KLEVIS20') {
      setDiscount(cartTotal * 0.2);
    } else {
      setDiscount(0);
      alert('Invalid coupon code');
    }
  };

  const finalTotal = cartTotal - discount;

  if (cart.length === 0) {
    return (
      <div className="cart-page container">
        <h1 className="cart-title">Your Cart</h1>
        <div className="cart-empty fade-in">
          <ShoppingBag size={64} color="var(--text-light)" />
          <p className="cart-empty-text">Your cart is currently empty.</p>
          <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page container fade-in">
      <h1 className="cart-title">Your Cart</h1>
      
      <div className="cart-container">
        <div className="cart-items">
          <div className="cart-items-header">
            <div>Product</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Total</div>
          </div>
          
          {cart.map((item, index) => (
            <div className="cart-item" key={`${item.id}-${item.size}-${item.color}-${index}`}>
              <div className="cart-item-product">
                <Link to={`/product/${item.id}`}>
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                </Link>
                <div className="cart-item-details">
                  <span className="cart-item-brand">{item.brand}</span>
                  <Link to={`/product/${item.id}`} className="cart-item-name">{item.name}</Link>
                  {item.size && <span className="cart-item-variant">Size: {item.size}</span>}
                  {item.color && <span className="cart-item-variant">Color: {item.color}</span>}
                  <button 
                    className="cart-item-remove"
                    onClick={() => removeFromCart(item.id, item.size, item.color)}
                  >
                    <Trash2 size={14} style={{ display: 'inline', marginRight: '4px' }} />
                    Remove
                  </button>
                </div>
              </div>
              
              <div className="cart-item-price">
                ${item.price.toFixed(2)}
              </div>
              
              <div className="cart-item-quantity">
                <button 
                  className="qty-btn" 
                  onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                >-</button>
                <input 
                  type="text" 
                  className="qty-input-cart" 
                  value={item.quantity} 
                  readOnly 
                />
                <button 
                  className="qty-btn" 
                  onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                >+</button>
              </div>
              
              <div className="cart-item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2 className="summary-title">Order Summary</h2>
          
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          {discount > 0 && (
            <div className="summary-row" style={{ color: 'var(--success-color)' }}>
              <span>Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}

          <div className="coupon-section">
            <input 
              type="text" 
              placeholder="Coupon code (KLEVIS20)" 
              className="coupon-input"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button className="btn btn-outline" onClick={handleApplyCoupon}>Apply</button>
          </div>
          
          <div className="summary-row total">
            <span>Total</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>
          
          <button className="btn btn-primary checkout-btn">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
