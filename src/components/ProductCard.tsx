"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import "./ProductCard.css";
import { useCart } from "@/providers/CartProvider";

type ProductProps = {
  product: {
    id: string;
    name: string;
    subtitle: string;
    price: number;
    image: string;
    badge?: string;
  };
};

export default function ProductCard({ product }: ProductProps) {
  const { addToCart } = useCart();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className="product-card group">
        <div className="product-image-container">
          {product.badge && <span className="product-badge">{product.badge}</span>}
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
          />
          <div className="product-actions">
            <button 
              className="quick-view-btn glass-panel" 
              onClick={(e) => {
                e.preventDefault();
                setIsQuickViewOpen(true);
              }}
            >
              Quick View
            </button>
            <button 
              className="add-to-cart-btn" 
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
        <div className="product-info">
          <h3>{product.name}</h3>
          <p className="product-subtitle">{product.subtitle}</p>
          <p className="product-price">${product.price}</p>
        </div>
      </div>

      {mounted && isQuickViewOpen && createPortal(
        <div className="quick-view-modal-overlay" onClick={() => setIsQuickViewOpen(false)}>
          <div className="quick-view-modal glass-panel" onClick={e => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setIsQuickViewOpen(false)}>✕</button>
            <div className="modal-content">
              <div className="modal-image">
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="modal-info">
                <h2>{product.name}</h2>
                <p className="modal-subtitle">{product.subtitle}</p>
                <p className="modal-price">${product.price}</p>
                <p className="modal-desc">This luxurious product is formulated to enhance your natural beauty with advanced ingredients.</p>
                <button 
                  className="btn-primary add-to-cart-modal" 
                  onClick={() => {
                    addToCart(product);
                    setIsQuickViewOpen(false);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
