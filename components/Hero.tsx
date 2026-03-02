"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import SignatureDisplay from "@/components/SignatureDisplay";
import MistCanvas from "@/components/MistCanvas";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade out scroll hint on scroll
      gsap.to(scrollHintRef.current, {
        opacity: 0,
        y: -20,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center min-h-screen overflow-hidden"
    >
      {/* Liquid Mist / Fog canvas */}
      <MistCanvas />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(10,10,10,0.85) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 select-none"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Label */}
        <motion.p
          variants={itemVariants}
          className="text-accent text-xs tracking-[0.35em] uppercase mb-8 font-mono"
        >
          Portfolio
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-[clamp(3rem,10vw,8rem)] font-black leading-none tracking-tighter text-white glow-text"
        >
          Gabriel Pacheco
        </motion.h1>

        {/* Title */}
        <motion.h2
          variants={itemVariants}
          className="text-[clamp(1rem,3vw,1.75rem)] font-light tracking-[0.2em] uppercase text-white/70"
        >
          Software Engineer
        </motion.h2>

        {/* ASCII Signature */}
        <motion.div variants={itemVariants} className="my-6">
          <SignatureDisplay />
        </motion.div>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          className="mt-10 w-px h-16 bg-gradient-to-b from-transparent via-accent to-transparent"
        />

        {/* CTA */}
        <motion.a
          variants={itemVariants}
          href="#works"
          className="mt-8 inline-flex items-center gap-2 text-sm text-white/50 hover:text-accent transition-colors duration-300 font-mono tracking-wider"
          data-cursor-hover
        >
          <span>SCROLL TO EXPLORE</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-bounce"
          >
            <path
              d="M7 1v12M1 7l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.a>
      </motion.div>

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/20 tracking-widest font-mono uppercase">
          Works Below
        </span>
      </div>
    </section>
  );
}
