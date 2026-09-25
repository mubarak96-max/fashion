"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";

const slides = [
  { city: "Kampala", src: "/campaign/kampala-hero.webp", portrait: "/campaign/kampala-hero-mobile.webp", alt: "Three children in ivory and cocoa occasionwear walking on a sunlit Kampala pavement" },
  { city: "London", src: "/campaign/london-hero-v2.webp", portrait: "/campaign/london-hero-mobile.webp", alt: "A boy in a navy tunic suit and a girl in a rose dress beside London's Westminster riverside" },
  { city: "New York", src: "/campaign/newyork-hero-v2.webp", portrait: "/campaign/newyork-hero-mobile.webp", alt: "A boy with an afro wearing a terracotta and olive tunic set beside a SoHo brick pillar" },
];

function nextLoaded(current: number, direction: number, loaded: boolean[]) {
  for (let offset = 1; offset < slides.length; offset++) {
    const index = (current + direction * offset + slides.length) % slides.length;
    if (loaded[index]) return index;
  }
  return current;
}

export default function HeroCarousel({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [loaded, setLoaded] = useState<boolean[]>(slides.map(() => false));

  // Depends on `active` so a manual arrow click restarts the 3s countdown.
  useEffect(() => {
    if (hovered) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        setActive((current) => nextLoaded(current, 1, loaded));
      }
    }, 3000);
    return () => window.clearInterval(timer);
  }, [hovered, loaded, active]);

  function move(direction: number) {
    setActive((current) => nextLoaded(current, direction, loaded));
  }

  return (
    <section
      className="hero"
      aria-labelledby="hero-title"
      aria-roledescription="carousel"
      // Touch taps fire enter without a matching leave, which would pause mobile forever.
      onPointerEnter={(event) => event.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={(event) => event.pointerType === "mouse" && setHovered(false)}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.city}
          className={`hero-slide${index === active ? " is-active" : ""}`}
          role="group"
          aria-roledescription="slide"
          aria-label={`${index + 1} of ${slides.length}: ${slide.city}`}
          aria-hidden={index !== active}
        >
          <picture>
            <source media="(max-width: 767px)" srcSet={slide.portrait} />
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              unoptimized
              loading="eager"
              fetchPriority={index === 0 ? "high" : "auto"}
              className="hero-photo"
              onLoad={() => setLoaded((current) => current.map((ready, i) => i === index || ready))}
            />
          </picture>
        </div>
      ))}
      <div className="hero-shade" />
      {children}
      <div className="hero-controls" aria-label="Hero slideshow controls">
        <button type="button" onClick={() => move(-1)} aria-label="Previous hero image">←</button>
        <button type="button" onClick={() => move(1)} aria-label="Next hero image">→</button>
      </div>
    </section>
  );
}
