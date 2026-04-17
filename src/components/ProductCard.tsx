"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import gsap from "gsap";
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

  const animateToCart = (sourceEl: HTMLElement | null) => {
    if (!sourceEl || typeof window === "undefined") return;

    const cartButton = document.querySelector(".cart-btn") as HTMLElement | null;
    if (!cartButton) return;

    // Respect reduced-motion preferences and skip intense motion.
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.fromTo(cartButton, { scale: 1 }, { scale: 1.1, duration: 0.18, yoyo: true, repeat: 1 });
      return;
    }

    const sourceRect = sourceEl.getBoundingClientRect();
    const cartRect = cartButton.getBoundingClientRect();
    const clone = sourceEl.cloneNode(true) as HTMLElement;

    clone.style.position = "fixed";
    clone.style.left = `${sourceRect.left}px`;
    clone.style.top = `${sourceRect.top}px`;
    clone.style.width = `${sourceRect.width}px`;
    clone.style.height = `${sourceRect.height}px`;
    clone.style.margin = "0";
    clone.style.zIndex = "1200";
    clone.style.pointerEvents = "none";
    clone.style.borderRadius = "10px";
    clone.style.overflow = "hidden";
    clone.style.boxShadow = "0 16px 40px rgba(0, 0, 0, 0.22)";
    clone.style.transformOrigin = "center center";

    document.body.appendChild(clone);

    const targetX = cartRect.left + cartRect.width / 2 - (sourceRect.left + sourceRect.width / 2);
    const targetY = cartRect.top + cartRect.height / 2 - (sourceRect.top + sourceRect.height / 2);

    const tl = gsap.timeline({
      onComplete: () => {
        clone.remove();
      },
    });

    tl.to(clone, {
      x: targetX,
      y: targetY,
      rotate: 540,
      scale: 0.12,
      opacity: 0.25,
      duration: 0.8,
      ease: "power3.inOut",
    }).to(
      cartButton,
      {
        scale: 1.16,
        duration: 0.15,
        yoyo: true,
        repeat: 1,
        ease: "power2.out",
      },
      "-=0.18"
    );
  };

  const handleAddToCart = (sourceEl: HTMLElement | null) => {
    animateToCart(sourceEl);
    addToCart(product);
  };

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
                const imageContainer = (e.currentTarget.closest(".product-card") as HTMLElement | null)
                  ?.querySelector(".product-image-container") as HTMLElement | null;
                handleAddToCart(imageContainer);
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
                  onClick={(e) => {
                    const modal = (e.currentTarget.closest(".quick-view-modal") as HTMLElement | null);
                    const modalImage = modal?.querySelector(".modal-image") as HTMLElement | null;
                    handleAddToCart(modalImage);
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
