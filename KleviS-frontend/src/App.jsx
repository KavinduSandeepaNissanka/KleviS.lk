import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Context Providers
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

// Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import IntroScreen from './components/IntroScreen/IntroScreen';
import OutroScreen from './components/OutroScreen/OutroScreen';
import { AnimationProvider, AnimationContext } from './context/AnimationContext';
import { AuthProvider } from './context/AuthContext';

// Pages
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Cart from './pages/Cart/Cart';
import Wishlist from './pages/Wishlist/Wishlist';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Profile from './pages/Profile/Profile';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import About from './pages/Info/About';
import Contact from './pages/Info/Contact';
import NotFound from './pages/NotFound/NotFound';

import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AnimationProvider>
          <CartProvider>
            <WishlistProvider>
              <Router>
                <AppContent />
              </Router>
            </WishlistProvider>
          </CartProvider>
        </AnimationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

// Separate component so we can consume the AnimationContext inside the Router
const AppContent = () => {
  const { isLoggingOut } = React.useContext(AnimationContext);
  
  return (
    <div className="app-container">
      <IntroScreen />
      <OutroScreen isLoggingOut={isLoggingOut} />
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="ROLE_ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
