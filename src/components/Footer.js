import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div>
            <h3 className="footer-section-title">About WebWorkers</h3>
            <p className="footer-text">
              A modern user directory application with beautiful UI and smooth interactions.
            </p>
          </div>
          
          
          <div>
            <h3 className="footer-section-title">Connect With Us</h3>
            <div className="social-links">
              <button className="social-button facebook">
                <span>f</span>
              </button>
              <button className="social-button twitter">
                <span>t</span>
              </button>
              <button className="social-button instagram">
                <span>i</span>
              </button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 WebWorkers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
