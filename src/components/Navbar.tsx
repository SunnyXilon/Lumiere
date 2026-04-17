"use client";
import React, { useState, useEffect } from "react";
import { ShoppingBag, Menu, Search, X } from "lucide-react";
import { useCart } from "@/providers/CartProvider";
import "./Navbar.css";

export default function Navbar() {
  const { cart, cartCount, cartTotal, isCartOpen, setIsCartOpen, removeFromCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar container ${isScrolled ? "scrolled glass-panel" : ""}`}>
        <div className="navbar-left">
          <button className="icon-btn hide-desktop"><Menu size={24} strokeWidth={1.5} /></button>
          <ul className="nav-links hide-mobile">
            <li><a href="#shop">Shop</a></li>
            <li><a href="#bestsellers">Bestsellers</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="navbar-center">
          <a href="/" className="logo">Lumière</a>
        </div>

        <div className="navbar-right">
          <button className="icon-btn hide-mobile"><Search size={22} strokeWidth={1.5} /></button>
          <div className="cart-btn" onClick={() => setIsCartOpen(true)}>
            <ShoppingBag size={22} strokeWidth={1.5} />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </div>
        </div>
      </nav>

      {/* Cart Sidebar */}
      <div className={`cart-overlay ${isCartOpen ? "open" : ""}`} onClick={() => setIsCartOpen(false)}>
        <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
          <div className="cart-header">
            <h2>Your Cart ({cartCount})</h2>
            <button className="close-btn" onClick={() => setIsCartOpen(false)}>
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>

          <div className="cart-items">
            {cart.length === 0 ? (
              <p className="empty-cart">Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-img">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <p>${item.price} x {item.quantity}</p>
                    <button className="remove-item" onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                  <div className="cart-item-price">
                    ${item.price * item.quantity}
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="cart-footer">
              <div className="cart-total">
                <span>Total</span>
                <span>${cartTotal}</span>
              </div>
              <button className="btn-primary checkout-btn">Checkout</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
