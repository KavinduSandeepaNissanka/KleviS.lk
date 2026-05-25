import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import ProductCard from '../../components/ProductCard/ProductCard';
import { dummyProducts } from '../../services/dummyData';
import './Shop.css';

const Shop = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || 'All';

  const [products, setProducts] = useState(dummyProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortOption, setSortOption] = useState('newest');
  const [priceRange, setPriceRange] = useState(200);

  const categories = ['All', 'Men', 'Women', 'Kids', 'Accessories'];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (initialCategory !== selectedCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [location.search]);

  useEffect(() => {
    let filtered = dummyProducts;

    // Filter by Category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Filter by Search
    if (searchQuery) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Filter by Price
    filtered = filtered.filter(p => p.price <= priceRange);

    // Sort
    if (sortOption === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'newest') {
      filtered.sort((a, b) => (b.isNewArrival === a.isNewArrival) ? 0 : b.isNewArrival ? 1 : -1);
    } else if (sortOption === 'popular') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setProducts(filtered);
  }, [searchQuery, selectedCategory, sortOption, priceRange]);

  return (
    <div className="shop-page container fade-in">
      <div className="shop-header">
        <h1 className="shop-title">{selectedCategory === 'All' ? 'Our Collection' : selectedCategory}</h1>
        
        <div className="shop-controls">
          <div className="search-bar">
            <Search size={18} color="var(--text-light)" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <select 
            className="sort-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="newest">Newest Arrivals</option>
            <option value="popular">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="shop-container">
        <aside className="shop-sidebar">
          <div className="filter-group">
            <h3 className="filter-title">Categories</h3>
            <div className="filter-list">
              {categories.map(cat => (
                <label key={cat} className="filter-item">
                  <input 
                    type="radio" 
                    name="category" 
                    checked={selectedCategory.toLowerCase() === cat.toLowerCase()}
                    onChange={() => setSelectedCategory(cat)}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h3 className="filter-title">Max Price: ${priceRange}</h3>
            <input 
              type="range" 
              min="0" 
              max="200" 
              step="10"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
        </aside>

        <main className="shop-content">
          {products.length > 0 ? (
            <div className="shop-products-grid">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-products">
              <p>No products found matching your criteria.</p>
              <button className="btn btn-primary" onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setPriceRange(200);
              }} style={{ marginTop: '20px' }}>
                Clear Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
