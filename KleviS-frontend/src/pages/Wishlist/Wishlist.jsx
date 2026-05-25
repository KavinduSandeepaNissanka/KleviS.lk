import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { WishlistContext } from '../../context/WishlistContext';
import ProductCard from '../../components/ProductCard/ProductCard';

const Wishlist = () => {
  const { wishlist } = useContext(WishlistContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container fade-in" style={{ padding: 'var(--spacing-xxl) 0', minHeight: '70vh' }}>
      <h1 className="shop-title" style={{ marginBottom: 'var(--spacing-xl)' }}>Your Wishlist</h1>
      
      {wishlist.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 'var(--spacing-xxl) 0' }}>
          <Heart size={64} color="var(--text-light)" />
          <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', margin: 'var(--spacing-md) 0 var(--spacing-xl)' }}>
            Your wishlist is currently empty.
          </p>
          <Link to="/shop" className="btn btn-primary">Discover Products</Link>
        </div>
      ) : (
        <div className="shop-products-grid">
          {wishlist.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
