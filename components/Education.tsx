"use client";

import { useEffect, useRef, useState } from "react";
import { GraduationCap } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import LogoMarquee from "@/components/LogoMarquee";
import { getEducationItems, institutionLogos } from "@/data/education";
import { uiText } from "@/data/ui-text";
import { SiteLocale } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

type EducationProps = {
  locale: SiteLocale;
};

export default function Education({ locale }: EducationProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const [failedLogos, setFailedLogos] = useState<Record<string, boolean>>({});
  const educationItems = getEducationItems(locale);
  const text = uiText[locale].education;

  useEffect(() => {
    if (!sectionRef.current) return;

    const cleanupListeners: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

      gsap.from(cards, {
        y: 36,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          toggleActions: "play none none reverse",
        },
      });

      cards.forEach((card) => {
        const glowTween = gsap.to(card, {
          boxShadow: "0 0 0 1px rgba(56,189,248,0.35), 0 0 28px rgba(56,189,248,0.2)",
          borderColor: "rgba(56,189,248,0.55)",
          duration: 0.35,
          paused: true,
          ease: "power2.out",
        });

        const rotateXTo = gsap.quickTo(card, "rotateX", {
          duration: 0.2,
          ease: "power2.out",
        });

        const rotateYTo = gsap.quickTo(card, "rotateY", {
          duration: 0.2,
          ease: "power2.out",
        });

        const onMove = (event: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const px = (event.clientX - rect.left) / rect.width;
          const py = (event.clientY - rect.top) / rect.height;
          const rotateY = (px - 0.5) * 8;
          const rotateX = (0.5 - py) * 8;

          rotateXTo(rotateX);
          rotateYTo(rotateY);
        };

        const onEnter = () => glowTween.play();
        const onLeave = () => {
          glowTween.reverse();
          rotateXTo(0);
          rotateYTo(0);
        };

        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);

        cleanupListeners.push(() => {
          card.removeEventListener("mousemove", onMove);
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
        });

        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            onLeaveBack: () => {
              glowTween.reverse();
              rotateXTo(0);
              rotateYTo(0);
            },
          },
        });
      });
    }, sectionRef);

    return () => {
      cleanupListeners.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative px-6 py-40 md:px-16 lg:px-32"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mb-16">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-accent">
          {text.badge}
        </p>
        <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-none tracking-tighter text-white">
          {text.title}
        </h2>
        <div className="mt-4 h-px w-24 bg-gradient-to-r from-accent to-transparent" />
      </div>

      <div className="relative z-10 grid gap-5 md:grid-cols-2">
        {educationItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            ref={(element) => {
              cardsRef.current[index] = element;
            }}
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#0f0f0f]/70 p-5 transition-colors duration-300"
            style={{
              transformStyle: "preserve-3d",
              perspective: "900px",
              willChange: "transform",
              backfaceVisibility: "hidden",
            }}
            data-cursor-hover
          >
            <div className="pointer-events-none absolute inset-y-4 left-4 w-3 text-accent/45">
              [
            </div>
            <div className="pointer-events-none absolute inset-y-4 right-4 w-3 text-right text-accent/45">
              ]
            </div>

            <div className="mb-4 flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-md border border-white/10 bg-black/35">
                {item.logo ? (
                  !failedLogos[item.id] ? (
                    <Image
                      src={item.logo}
                      alt={item.institution}
                      width={20}
                      height={20}
                      className="h-5 w-5 object-contain"
                      onError={() =>
                        setFailedLogos((current) => ({ ...current, [item.id]: true }))
                      }
                    />
                  ) : (
                    <GraduationCap size={16} className="text-accent" />
                  )
                ) : (
                  <GraduationCap size={16} className="text-accent" />
                )}
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/35">
                {item.year}
              </span>
            </div>

            <h3 className="pr-3 text-lg font-semibold tracking-tight text-white">{item.title}</h3>
            <p className="mt-2 text-sm text-white/55">{item.institution}</p>
          </div>
        ))}
      </div>

      <div className="relative z-10 mt-14">
        <LogoMarquee logos={institutionLogos} />
      </div>
    </section>
  );
}