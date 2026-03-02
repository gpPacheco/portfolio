"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type AnimationProviderProps = {
  children: React.ReactNode;
};

export default function AnimationProvider({ children }: AnimationProviderProps) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  return <>{children}</>;
}