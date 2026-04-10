"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, PanInfo, useMotionValue } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { getProjects } from "@/data/projects";
import { uiText } from "@/data/ui-text";
import { SiteLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const sectionVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.12,
      type: "spring",
      stiffness: 120,
      damping: 18,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 160,
      damping: 20,
    },
  },
};

type FeaturedWorkProps = {
  locale: SiteLocale;
};

type DragBounds = {
  left: number;
  right: number;
};

const CARD_WIDTH = 352;
const CARD_HEIGHT = 480;
const CARD_GAP = 24;
const CARD_STEP = CARD_WIDTH + CARD_GAP;

function clampX(value: number, bounds: DragBounds) {
  return Math.max(bounds.left, Math.min(bounds.right, value));
}

export default function FeaturedWork({ locale }: FeaturedWorkProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [dragBounds, setDragBounds] = useState<DragBounds>({ left: 0, right: 0 });
  const [sidePadding, setSidePadding] = useState(0);
  const [xPosition, setXPosition] = useState(0);
  const projects = getProjects(locale);
  const text = uiText[locale].projects;
  const [activeAccent, setActiveAccent] = useState(
    projects[0]?.accentColor ?? "#38bdf8"
  );

  useEffect(() => {
    setActiveAccent(projects[0]?.accentColor ?? "#38bdf8");
    setHoveredId(null);
    x.set(0);
  }, [locale, projects, x]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const updateBounds = () => {
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      const nextSidePadding = isDesktop
        ? 0
        : Math.max((viewport.clientWidth - CARD_WIDTH) / 2, 0);
      setSidePadding(nextSidePadding);
      const nextLeft = Math.min(viewport.clientWidth - track.scrollWidth, 0);
      const nextBounds = { left: nextLeft, right: 0 };
      setDragBounds(nextBounds);
      x.set(clampX(x.get(), nextBounds));
    };

    updateBounds();

    const resizeObserver = new ResizeObserver(updateBounds);
    resizeObserver.observe(viewport);
    resizeObserver.observe(track);
    window.addEventListener("resize", updateBounds);

    return () => {
      window.removeEventListener("resize", updateBounds);
      resizeObserver.disconnect();
    };
  }, [locale, projects.length, x]);

  useEffect(() => {
    const unsubscribe = x.on("change", (latest) => {
      setXPosition(latest);
    });

    return () => unsubscribe();
  }, [x]);

  const moveCarousel = (direction: 1 | -1) => {
    const nextX = clampX(x.get() + direction * CARD_STEP, dragBounds);

    animate(x, nextX, {
      type: "spring",
      stiffness: 240,
      damping: 32,
      mass: 0.72,
    });
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const projectedX = x.get() + info.velocity.x * 0.12;
    const snappedX = Math.round(projectedX / CARD_STEP) * CARD_STEP;
    const nextX = clampX(snappedX, dragBounds);

    animate(x, nextX, {
      type: "spring",
      stiffness: 240,
      damping: 32,
      mass: 0.75,
    });
  };

  const canMovePrev = xPosition < -2;
  const canMoveNext = xPosition > dragBounds.left + 2;

  return (
    <section
      id="works"
      ref={sectionRef}
      className="relative isolate overflow-visible border-t border-white/[0.03] backdrop-blur-sm bg-[#0d0d0d]/80 px-6 py-28 md:px-10 lg:px-16"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        aria-hidden="true"
      >
        <div className="absolute left-[-12%] top-[-6%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.22)_0%,_rgba(56,189,248,0.08)_30%,_transparent_70%)] blur-3xl" />
        <div className="absolute right-[-10%] top-[10%] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.09)_0%,_rgba(56,189,248,0.05)_35%,_transparent_72%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.05),_transparent_42%)]" />
      </div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col gap-10"
      >
        <motion.div variants={itemVariants} className="max-w-3xl">
          <p className="mb-4 inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.38em] text-white/45">
            <Sparkles size={12} className="text-[#38bdf8]" />
            {text.badge}
          </p>
          <h2 className="text-[clamp(2.6rem,6vw,5.8rem)] font-black leading-[0.92] tracking-tighter text-white text-balance">
            {text.title}
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/48 md:text-base">
            {text.description}
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center gap-3 text-[0.7rem] uppercase tracking-[0.28em] text-white/35"
        >
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
            {projects.length.toString().padStart(2, "0")} featured works
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
            Drag Carousel
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
            Framer Motion
          </span>
        </motion.div>
      </motion.div>

      <div className="group relative z-10 mt-14">
        <button
          type="button"
          onClick={() => moveCarousel(1)}
          disabled={!canMovePrev}
          aria-label="Previous works"
          className={cn(
            "absolute left-1 top-1/2 z-[90] -translate-y-1/2 rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur-xl transition-all duration-300 md:left-3",
            "opacity-90 md:opacity-0 md:group-hover:opacity-100",
            canMovePrev
              ? "text-white/85 hover:scale-105 hover:border-white/25 hover:bg-white/15"
              : "cursor-not-allowed text-white/25"
          )}
          data-cursor-hover
        >
          <ChevronLeft size={18} />
        </button>

        <button
          type="button"
          onClick={() => moveCarousel(-1)}
          disabled={!canMoveNext}
          aria-label="Next works"
          className={cn(
            "absolute right-1 top-1/2 z-[90] -translate-y-1/2 rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur-xl transition-all duration-300 md:right-3",
            "opacity-90 md:opacity-0 md:group-hover:opacity-100",
            canMoveNext
              ? "text-white/85 hover:scale-105 hover:border-white/25 hover:bg-white/15"
              : "cursor-not-allowed text-white/25"
          )}
          data-cursor-hover
        >
          <ChevronRight size={18} />
        </button>

        <div
          ref={viewportRef}
          className="relative overflow-x-hidden overflow-y-visible pb-10"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          }}
        >
        <div
          ref={orbRef}
          className="pointer-events-none absolute left-1/2 top-1/2 z-[2] h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl mix-blend-screen"
          style={{
            background: `radial-gradient(circle, ${activeAccent}33 0%, ${activeAccent}14 24%, transparent 70%)`,
          }}
          aria-hidden="true"
        />

        <motion.div
          ref={trackRef}
          drag="x"
          dragConstraints={dragBounds}
          dragElastic={0.1}
          dragMomentum
          onDragEnd={handleDragEnd}
          style={{
            x,
            willChange: "transform",
            paddingLeft: `${sidePadding}px`,
            paddingRight: `${sidePadding}px`,
          }}
          className="relative z-[12] flex w-max touch-pan-y items-start gap-6 pb-6 pt-5"
          initial={false}
        >
          <motion.article
            variants={itemVariants}
            whileHover={{ scale: 1.04, y: -6 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
            className={cn(
              "group relative flex shrink-0 flex-col justify-between overflow-hidden rounded-[34px] border border-white/10 bg-white/5 p-6 shadow-[0_24px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
            )}
            style={{
              width: "352px",
              height: "480px",
              zIndex: projects.length + 4,
              boxShadow:
                "0 24px 90px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-90"
              aria-hidden="true"
              style={{
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01) 38%, rgba(255,255,255,0.05) 100%)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-70"
              aria-hidden="true"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div
              className="pointer-events-none absolute -right-16 top-10 h-44 w-44 rounded-full blur-3xl"
              style={{ background: `${activeAccent}22` }}
              aria-hidden="true"
            />

            <div className="relative z-10 flex h-full flex-col justify-between gap-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.32em] text-white/35">
                    01
                  </p>
                  <p className="mt-2 max-w-[16rem] text-sm leading-6 text-white/55 md:text-base">
                    {text.scrollHint}
                  </p>
                </div>

                <span className="rounded-full border border-white/10 bg-black/25 px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.28em] text-white/35">
                  {locale}
                </span>
              </div>

              <div className="space-y-4">
                <h3 className="max-w-[14ch] text-[clamp(2rem,5vw,4rem)] font-black leading-[0.9] tracking-tighter text-white">
                  Digital gallery
                </h3>
                <p className="max-w-[24rem] text-sm leading-7 text-white/50 md:text-base">
                  Bento cards float over a dark field while vertical scroll drives a
                  lateral composition.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-white/45">
                  03 projects
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-white/45">
                  2025-2026
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-white/45">
                  Horizontal motion
                </span>
              </div>
            </div>
          </motion.article>

          {projects.map((project, index) => {
            const isActive = hoveredId === project.id;
            const canVisit = project.url.startsWith("http") && project.url !== "https://";
            const isOverlapped = index > 0;

            return (
              <motion.article
                key={project.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.985 }}
                onHoverStart={() => {
                  setHoveredId(project.id);
                  setActiveAccent(project.accentColor);
                }}
                onHoverEnd={() => {
                  setHoveredId(null);
                  setActiveAccent(projects[0]?.accentColor ?? "#38bdf8");
                }}
                transition={{ type: "spring", stiffness: 240, damping: 22 }}
                className={cn(
                  "group relative shrink-0 overflow-hidden rounded-[34px] border border-white/10 bg-white/5 shadow-[0_24px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl",
                  isOverlapped && "-ml-3 md:-ml-4",
                  isActive ? "z-[36]" : "z-[14]",
                  "h-[480px] w-[352px]"
                )}
                style={{
                  width: `${CARD_WIDTH}px`,
                  height: `${CARD_HEIGHT}px`,
                  zIndex: isActive ? 36 : projects.length - index,
                  boxShadow: isActive
                    ? `0 24px 90px rgba(0,0,0,0.45), 0 0 0 1px ${project.accentColor}66, 0 0 65px ${project.accentColor}24`
                    : "0 24px 90px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
                data-cursor-hover
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                  style={{
                    background: `linear-gradient(160deg, ${project.accentColor}1f 0%, rgba(13,13,13,0.14) 38%, rgba(13,13,13,0.4) 100%)`,
                  }}
                />

                <div
                  className="pointer-events-none absolute inset-0 opacity-40"
                  aria-hidden="true"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
                    backgroundSize: "36px 36px",
                  }}
                />

                <div
                  className="pointer-events-none absolute -left-12 top-10 h-36 w-36 rounded-full blur-3xl"
                  style={{ background: `${project.accentColor}2a` }}
                  aria-hidden="true"
                />

                <div className="relative z-10 flex h-full flex-col p-6 md:p-7">
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-white/35">
                        {project.index}
                      </p>
                      <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/28">
                        {project.year}
                      </p>
                    </div>

                    <motion.div
                      animate={{
                        x: isActive ? 0 : -6,
                        y: isActive ? 0 : 4,
                        opacity: isActive ? 1 : 0.75,
                      }}
                      transition={{ duration: 0.25 }}
                    >
                      <ArrowUpRight size={18} color={project.accentColor} />
                    </motion.div>
                  </div>

                  <div className="relative mb-5 flex-1 overflow-hidden rounded-[28px] border border-white/10 bg-black/25">
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `radial-gradient(circle at 20% 20%, ${project.accentColor}40 0%, transparent 34%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.08) 0%, transparent 26%), linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01) 55%, rgba(13,13,13,0.22))`,
                      }}
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.06),_transparent_55%)] opacity-70" />
                    <div className="absolute left-6 top-6 h-14 w-14 rounded-full border border-white/10" />
                    <div className="absolute right-6 bottom-6 h-20 w-20 rounded-full border border-white/10" />

                    <div className="relative z-10 flex h-full flex-col justify-end p-5">
                      <div className="mb-3 flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 font-mono text-[0.64rem] uppercase tracking-[0.18em] text-white/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="max-w-[12ch] text-[clamp(1.8rem,4vw,3.1rem)] font-black leading-[0.92] tracking-tighter text-white">
                        {project.title}
                      </h3>
                      <p className="mt-3 max-w-[24ch] text-sm leading-6 text-white/55 line-clamp-3">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="line-clamp-3 text-sm leading-7 text-white/46">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[0.64rem] uppercase tracking-[0.18em] text-white/42"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-4 pt-4">
                    <span className="font-mono text-[0.64rem] uppercase tracking-[0.28em] text-white/28">
                      {text.technologies}
                    </span>

                    {canVisit ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[0.68rem] uppercase tracking-[0.24em] text-white/70 transition-colors duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
                        data-cursor-hover
                      >
                        {text.visitSite}
                        <ArrowUpRight size={14} />
                      </a>
                    ) : (
                      <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[0.68rem] uppercase tracking-[0.24em] text-white/30">
                        {text.previewFallback}
                      </span>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
        </div>
      </div>
    </section>
  );
}