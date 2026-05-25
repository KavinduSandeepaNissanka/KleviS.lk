import React, { useEffect } from 'react';
import './Info.css';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="info-page container fade-in">
      <div className="info-header">
        <h1 className="info-title">About KleviS.lk</h1>
        <p className="info-subtitle">Our story, our mission, our values.</p>
      </div>

      <div className="info-content">
        <img
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1920"
          alt="About KleviS.lk"
          style={{ width: '100%', borderRadius: 'var(--radius-md)', marginBottom: 'var(--spacing-xl)' }}
        />

        <h2>Our Story</h2>
        <p>Founded in 2026, KleviS.lk started with a simple vision: to create premium, minimalist clothing that transcends seasonal trends. We believe that true style lies in simplicity and quality, which is why every piece in our collection is meticulously crafted to last.</p>

        <h2>Our Mission</h2>
        <p>Our mission is to redefine modern fashion by offering timeless pieces that empower our customers to express their unique style with confidence. We are committed to ethical manufacturing practices and sourcing sustainable materials wherever possible.</p>

        <h2>Quality & Craftsmanship</h2>
        <p>We work with some of the world's best factories and artisans to ensure that every garment meets our rigorous standards. From the initial design sketch to the final stitch, our focus is on flawless execution and attention to detail.</p>
      </div>
    </div>
  );
};

export default About;
