"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";
import "./FeaturedProducts.css";

export default function FeaturedProducts() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // A simple intersection observer for elegant scroll entrance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tl = gsap.timeline();
            tl.fromTo(
              titleRef.current,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
            );

            if (gridRef.current) {
              const cards = gridRef.current.children;
              tl.fromTo(
                cards,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" },
                "-=0.4"
              );
            }
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="featured-section container" id="bestsellers" ref={sectionRef}>
      <div className="section-header">
        <h2 ref={titleRef} style={{ opacity: 0 }}>Curated Bestsellers</h2>
        <a href="#shop" className="view-all">View All Products</a>
      </div>
      
      <div className="products-grid" ref={gridRef}>
        {products.map((product) => (
          <div key={product.id} style={{ opacity: 0 }}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
