"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import "./Hero.css";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        0.2
      );
    }
    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        0.5
      );
    }
    if (btnRef.current) {
      tl.fromTo(
        btnRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        0.7
      );
    }
    if (imageRef.current) {
      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
        0.4
      );
    }
  }, []);

  return (
    <section className="hero">
      <div className="hero-bg" ref={imageRef}>
        <img
          src="/hero-model.png"
          alt="Beautiful Skincare Model"
          className="hero-image"
        />
        <div className="hero-bg-overlay"></div>
      </div>

      <div className="hero-content container">
        <div className="hero-text-area glass-panel">
          <h1 ref={titleRef}>Reveal your natural glow.</h1>
          <p ref={subtitleRef}>
            Science-backed, botanically derived skincare formulated to nourish
            and protect all skin types.
          </p>
          <a href="#shop" className="btn-primary" ref={btnRef}>
            Shop the Collection
          </a>
        </div>
      </div>
    </section>
  );
}
