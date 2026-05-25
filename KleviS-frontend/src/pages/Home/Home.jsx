import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import { dummyProducts, getFeaturedCategories } from '../../services/dummyData';
import './Home.css';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const trendingProducts = dummyProducts.filter(p => p.isTrending).slice(0, 4);
  const newArrivals = dummyProducts.filter(p => p.isNewArrival).slice(0, 4);
  const categories = getFeaturedCategories();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section fade-in">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Live In Style</h1>
          <p className="hero-subtitle">Discover the new season's collection. Premium quality, minimalist design.</p>
          <Link to="/shop" className="btn btn-primary" style={{ padding: '15px 40px', fontSize: '1.1rem' }}>
            Shop Collection
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section container">
        <h2 className="section-title">Shop by Category</h2>
        <div className="categories-grid">
          {categories.map(category => (
            <Link to={`/shop?category=${category.id}`} key={category.id} className="category-card fade-in">
              <img src={category.image} alt={category.name} className="category-image" />
              <div className="category-overlay">
                <span className="category-name">{category.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="products-section">
        <div className="container">
          <h2 className="section-title">Trending Now</h2>
          <div className="products-grid">
            {trendingProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="promo-section fade-in">
        <div className="container">
          <h2 className="promo-title">Special Offer</h2>
          <p style={{ marginBottom: '20px', fontSize: '1.2rem' }}>Get 20% off all new arrivals this weekend only!</p>
          <Link to="/shop" className="btn btn-outline" style={{ color: 'white', borderColor: 'white' }}>
            Shop New Arrivals
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="products-section" style={{ backgroundColor: 'transparent' }}>
        <div className="container">
          <h2 className="section-title">New Arrivals</h2>
          <div className="products-grid">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
