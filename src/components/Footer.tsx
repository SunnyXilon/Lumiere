import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <h2 className="footer-logo">Lumière</h2>
          <p>Elevating your daily ritual through science and nature.</p>
        </div>
        
        <div className="footer-links">
          <div className="footer-col">
            <h3>Shop</h3>
            <ul>
              <li><a href="#">All Products</a></li>
              <li><a href="#">Bestsellers</a></li>
              <li><a href="#">Skincare Sets</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Contact</h3>
            <ul>
              <li><a href="#contact">Contact Section</a></li>
              <li><a href="mailto:hello@lumiere.com">hello@lumiere.com</a></li>
              <li><a href="tel:+1-800-123-4567">+1 (800) 123-4567</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Support</h3>
            <ul>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Shipping</a></li>
              <li><a href="#">Returns</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="container">
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Lumière Skincare. All rights reserved.</p>
          <div className="social-links">
            <a href="#">Instagram</a>
            <a href="#">TikTok</a>
            <a href="#">Pinterest</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
