import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container fade-in" style={{ padding: '100px 0', textAlign: 'center', minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ fontSize: '6rem', color: 'var(--primary-color)', marginBottom: '0' }}>404</h1>
      <h2 style={{ fontSize: '2rem', marginBottom: 'var(--spacing-lg)' }}>Page Not Found</h2>
      <p style={{ color: 'var(--text-light)', marginBottom: 'var(--spacing-xl)', maxWidth: '500px' }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </div>
  );
};

export default NotFound;
