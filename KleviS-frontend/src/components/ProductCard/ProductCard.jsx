import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { WishlistContext } from '../../context/WishlistContext';
import { CartContext } from '../../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { wishlist, toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  
  const hasMultipleImages = product.images && product.images.length > 1;
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    // Default size and color if not specified
    const defaultSize = product.sizes ? product.sizes[0] : null;
    const defaultColor = product.colors ? product.colors[0] : null;
    addToCart(product, 1, defaultSize, defaultColor);
    // You could trigger a toast here
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card fade-in">
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image primary-image" 
        />
        {hasMultipleImages && (
          <img 
            src={product.images[1]} 
            alt={`${product.name} alternate`} 
            className="product-image hover-image" 
          />
        )}
        
        <div className="product-badges">
          {product.discount > 0 && (
            <span className="badge-item badge-discount">-{product.discount}%</span>
          )}
          {product.isNewArrival && (
            <span className="badge-item badge-new">New</span>
          )}
          {product.isTrending && (
            <span className="badge-item badge-trending">Trending</span>
          )}
        </div>

        <button 
          className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
          onClick={handleWishlistToggle}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={18} fill={inWishlist ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="product-info">
        <span className="product-brand">{product.brand}</span>
        <h3 className="product-name">{product.name}</h3>
        
        <div className="product-rating">
          <Star size={14} className="star-icon" />
          <span>{product.rating} ({product.reviews})</span>
        </div>
        
        <div className="product-price-row">
          <span className="current-price">${product.price.toFixed(2)}</span>
          {product.discount > 0 && (
            <span className="original-price">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
