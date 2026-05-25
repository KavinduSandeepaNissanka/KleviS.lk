import React, { useState, useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Check } from 'lucide-react';
import { dummyProducts } from '../../services/dummyData';
import { CartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/WishlistContext';
import ProductCard from '../../components/ProductCard/ProductCard';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const product = dummyProducts.find(p => p.id === parseInt(id));
  
  const { addToCart } = useContext(CartContext);
  const { wishlist, toggleWishlist, isInWishlist } = useContext(WishlistContext);

  const [activeImage, setActiveImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      setSelectedSize(product.sizes ? product.sizes[0] : '');
      setSelectedColor(product.colors ? product.colors[0] : '');
      setQuantity(1);
    }
    window.scrollTo(0, 0);
  }, [product]);

  if (!product) {
    return (
      <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <Link to="/shop" className="btn btn-primary" style={{ marginTop: '20px' }}>Back to Shop</Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const relatedProducts = dummyProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleQuantityChange = (amount) => {
    if (quantity + amount >= 1) {
      setQuantity(prev => prev + amount);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={18} 
          fill={i <= Math.round(rating) ? "var(--accent-color)" : "none"}
          color={i <= Math.round(rating) ? "var(--accent-color)" : "var(--text-light)"}
        />
      );
    }
    return stars;
  };

  return (
    <div className="product-details-page container fade-in">
      <div className="product-details-container">
        
        {/* Gallery */}
        <div className="product-gallery">
          <div className="thumbnail-list">
            {product.images && product.images.map((img, idx) => (
              <button 
                key={idx} 
                className={`thumbnail-btn ${activeImage === img ? 'active' : ''}`}
                onClick={() => setActiveImage(img)}
              >
                <img src={img} alt={`Thumbnail ${idx}`} className="thumbnail-image" />
              </button>
            ))}
          </div>
          <div className="main-image-container">
            <img src={activeImage} alt={product.name} className="main-image" />
          </div>
        </div>

        {/* Info */}
        <div className="product-info-section">
          <div className="product-meta">
            <span>{product.brand}</span>
            <span>|</span>
            <span>{product.category}</span>
          </div>

          <h1 className="product-title">{product.name}</h1>
          
          <div className="product-rating">
            <div className="stars">
              {renderStars(product.rating)}
            </div>
            <span className="review-count">({product.reviews} reviews)</span>
          </div>

          <div className="product-price-large">
            <span>${product.price.toFixed(2)}</span>
            {product.discount > 0 && (
              <span className="old-price">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          <p className="product-description">{product.description}</p>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '20px 0' }} />

          {/* Selections */}
          {product.sizes && (
            <div className="selector-group">
              <span className="selector-title">Size</span>
              <div className="size-options">
                {product.sizes.map(size => (
                  <button 
                    key={size} 
                    className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.colors && (
            <div className="selector-group">
              <span className="selector-title">Color: {selectedColor}</span>
              <div className="color-options">
                {product.colors.map(color => (
                  <button 
                    key={color} 
                    className={`color-btn ${selectedColor === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    onClick={() => setSelectedColor(color)}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="product-actions">
            <div className="qty-selector">
              <button className="qty-btn" onClick={() => handleQuantityChange(-1)}>-</button>
              <input 
                type="text" 
                className="qty-input" 
                value={quantity} 
                readOnly 
              />
              <button className="qty-btn" onClick={() => handleQuantityChange(1)}>+</button>
            </div>
            
            <button className="btn btn-primary add-to-cart-large" onClick={handleAddToCart}>
              <ShoppingCart size={20} />
              {showToast ? 'Added!' : 'Add to Cart'}
            </button>
            
            <button 
              className={`wishlist-large ${inWishlist ? 'active' : ''}`}
              onClick={() => toggleWishlist(product)}
            >
              <Heart size={24} fill={inWishlist ? "currentColor" : "none"} />
            </button>
          </div>

          {/* Toast feedback directly inline for simplicity, or use a proper toast context */}
          {showToast && (
            <div style={{ color: 'var(--success-color)', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '10px' }}>
              <Check size={16} /> Item added to cart successfully
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="related-products">
          <h2 className="related-title">You May Also Like</h2>
          <div className="shop-products-grid">
            {relatedProducts.map(rp => (
              <ProductCard key={rp.id} product={rp} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
