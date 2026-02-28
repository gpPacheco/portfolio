"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!dot || !ring) return;

    // Start off-screen so cursor doesn't flash in the center
    gsap.set(dot, { x: -100, y: -100, opacity: 0 });
    gsap.set(ring, { x: -100, y: -100, opacity: 0 });

    let mouseX = 0;
    let mouseY = 0;
    let hasMoved = false;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        gsap.set(dot, { x: mouseX, y: mouseY, opacity: 1 });
        gsap.set(ring, { x: mouseX, y: mouseY, opacity: 1 });
        return;
      }

      gsap.to(dot, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: "power2.out",
      });

      gsap.to(ring, {
        x: mouseX,
        y: mouseY,
        duration: 0.35,
        ease: "power2.out",
      });
    };

    const onEnterLink = () => {
      gsap.to(ring, {
        scale: 1.8,
        borderColor: "rgba(56,189,248,0.9)",
        duration: 0.25,
      });
      gsap.to(dot, { scale: 0, duration: 0.2 });
    };

    const onLeaveLink = () => {
      gsap.to(ring, {
        scale: 1,
        borderColor: "rgba(56,189,248,0.5)",
        duration: 0.25,
      });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    document.addEventListener("mousemove", onMove);

    const links = document.querySelectorAll("a, button, [data-cursor-hover]");
    links.forEach((el) => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      links.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterLink);
        el.removeEventListener("mouseleave", onLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
