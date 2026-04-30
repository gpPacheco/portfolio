"use client";

import { useEffect, useRef } from "react";
import { useState } from "react";
import { Building2 } from "lucide-react";
import { gsap } from "gsap";
import Image from "next/image";

type LogoItem = {
  id: string;
  name: string;
  logo?: string;
};

type LogoMarqueeProps = {
  logos: LogoItem[];
};

export default function LogoMarquee({ logos }: LogoMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [failedLogos, setFailedLogos] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!trackRef.current || logos.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(trackRef.current, { x: 0 });

      gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 48,
        ease: "none",
        repeat: -1,
      });
    }, trackRef);

    return () => ctx.revert();
  }, [logos.length]);

  const doubled = [...logos, ...logos];

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-white/[0.02] py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />

      <div ref={trackRef} className="flex w-max items-center gap-12 px-4 will-change-transform">
        {doubled.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="group flex min-w-[140px] items-center gap-3 text-white/50 transition-colors duration-300"
            data-cursor-hover
          >
            <div className="grid h-8 w-8 place-items-center rounded-md border border-white/10 bg-black/30 transition-all duration-300 group-hover:border-accent/50 group-hover:bg-accent/10">
              {item.logo ? (
                !failedLogos[item.id] ? (
                  <Image
                    src={item.logo}
                    alt={item.name}
                    width={20}
                    height={20}
                    className="h-5 w-5 object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
                    onError={() =>
                      setFailedLogos((current) => ({ ...current, [item.id]: true }))
                    }
                  />
                ) : (
                  <Building2 size={16} className="text-white/45 group-hover:text-accent" />
                )
              ) : (
                <Building2 size={16} className="text-white/45 group-hover:text-accent" />
              )}
            </div>

            <span className="font-mono text-xs tracking-[0.2em] uppercase text-white/40 transition-colors duration-300 group-hover:text-accent">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}