import React, { useEffect } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import './Info.css';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="info-page container fade-in">
      <div className="info-header">
        <h1 className="info-title">Contact Us</h1>
        <p className="info-subtitle">We'd love to hear from you. Get in touch with our team.</p>
      </div>

      <div className="info-content" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div className="contact-details">
          <h3 style={{ textAlign: 'center', marginBottom: 'var(--spacing-sm)' }}>Contact Details</h3>
          <p style={{ textAlign: 'center', color: 'var(--text-light)', marginBottom: 'var(--spacing-lg)' }}>
            Have questions about an order, a product, or just want to say hello? Get in touch with us using any of the channels below.
          </p>

          <div className="contact-item">
            <MapPin className="contact-icon" size={24} />
            <div>
              <h4>Headquarters</h4>
              <p>KleviS.lk<br />Mirigama<br />Sri Lanka</p>
            </div>
          </div>

          <div className="contact-item">
            <Phone className="contact-icon" size={24} />
            <div>
              <h4>Phone</h4>
              <p>0702201060<br />Mon-Sun: 9am - 7pm</p>
            </div>
          </div>

          <div className="contact-item">
            <Mail className="contact-icon" size={24} />
            <div>
              <h4>Email</h4>
              <p>support@klevis.com<br />info@klevis.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
