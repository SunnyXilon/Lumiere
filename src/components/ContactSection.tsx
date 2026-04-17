"use client";
import React from "react";
import "./ContactSection.css";

export default function ContactSection() {
  return (
    <section className="contact-section container" id="contact">
      <div className="contact-card glass-panel">
        <h2>Contact Us</h2>
        <p>
          Need help choosing the right skincare? Our team is here for product
          guidance, order support, and all your questions.
        </p>

        <div className="contact-grid">
          <div className="contact-item">
            <span>Email</span>
            <a href="mailto:hello@lumiere.com">hello@lumiere.com</a>
          </div>
          <div className="contact-item">
            <span>Phone</span>
            <a href="tel:+1-800-123-4567">+1 (800) 123-4567</a>
          </div>
          <div className="contact-item">
            <span>Address</span>
            <p>120 Bloom Avenue, Los Angeles, CA</p>
          </div>
        </div>
      </div>
    </section>
  );
}
