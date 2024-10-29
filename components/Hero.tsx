"use client"
import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const Hero = () => {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Hi, I'm Gabriel", "Great pleasure;)"],
      typeSpeed: 50,
      backSpeed: 50,
      showCursor: true,
      cursorChar: '|',
      loop: false,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-green-400">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-2xl w-full border border-gray-700">
        <h1 className="text-4xl font-mono font-bold text-center">
          <span ref={el} />
        </h1>
        <p className="text-center text-gray-400 mt-4 font-mono">Great pleasure!</p>
      </div>
    </div>
  );
}

export default Hero;
