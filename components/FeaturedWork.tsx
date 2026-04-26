"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import Image from "next/image";
import { animate, motion, PanInfo, useMotionValue } from "framer-motion";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  X,
} from "lucide-react";
import { Project, getProjects } from "@/data/projects";
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
  const [dragBounds, setDragBounds] = useState<DragBounds>({
    left: 0,
    right: 0,
  });
  const [sidePadding, setSidePadding] = useState(0);
  const [xPosition, setXPosition] = useState(0);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );
  const projects = getProjects(locale);
  const text = uiText[locale].projects;
  const [activeAccent, setActiveAccent] = useState(
    projects[0]?.accentColor ?? "#38bdf8",
  );
  const selectedProject =
    projects.find((project) => project.id === selectedProjectId) ?? null;

  const openProjectModal = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  const closeProjectModal = () => {
    setSelectedProjectId(null);
  };

  const getProjectGalleryImages = (project: Project) => {
    if (project.images.length > 0) return project.images;

    const seed = encodeURIComponent(
      project.title.toLowerCase().replace(/\s+/g, "-"),
    );
    return Array.from(
      { length: 6 },
      (_, index) => `https://picsum.photos/seed/${seed}-${index + 1}/960/720`,
    );
  };

  const buildExpandedDescription = (project: Project) => {
    if (locale === "pt-BR") {
      return `${project.description} O escopo contemplou experiencia de uso, padronizacao visual e fluxos de navegacao para sustentar crescimento com consistencia. O resultado foi uma interface mais clara, com melhor leitura de dados e aumento da eficiencia operacional nas tarefas principais.`;
    }

    return `${project.description} The scope covered UX structure, visual consistency, and navigation flows to support scale without adding complexity. The result was a clearer interface, better content readability, and faster task completion across key user journeys.`;
  };

  const buildProjectFeatures = (project: Project) => {
    if (locale === "pt-BR") {
      return [
        `Arquitetura de interface focada em ${project.tags[0] ?? "produto digital"}`,
        `Implementacao com ${project.technologies.slice(0, 2).join(" e ")}`,
        `Sistema de componentes com acento visual ${project.accentColor}`,
      ];
    }

    return [
      `Interface architecture focused on ${project.tags[0] ?? "digital product"}`,
      `Implementation with ${project.technologies.slice(0, 2).join(" and ")}`,
      `Component system built around accent color ${project.accentColor}`,
    ];
  };

  useEffect(() => {
    setActiveAccent(projects[0]?.accentColor ?? "#38bdf8");
    setHoveredId(null);
    setSelectedProjectId(null);
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

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
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
    <>
      <section
        id="works"
        ref={sectionRef}
        className="relative isolate overflow-visible border-t border-white/[0.03] bg-background px-6 py-28 md:px-10 lg:px-16"
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
                : "cursor-not-allowed text-white/25",
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
                : "cursor-not-allowed text-white/25",
            )}
            data-cursor-hover
          >
            <ChevronRight size={18} />
          </button>

          <div
            ref={viewportRef}
            className="relative overflow-x-hidden overflow-y-visible pb-10"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
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
              {projects.map((project, index) => {
                const isActive = hoveredId === project.id;
                const canVisit =
                  project.url.startsWith("http") && project.url !== "https://";
                const isOverlapped = index > 0;

                return (
                  <motion.article
                    key={project.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -8 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => openProjectModal(project.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        openProjectModal(project.id);
                      }
                    }}
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
                      "h-[480px] w-[352px]",
                    )}
                    style={{
                      width: `${CARD_WIDTH}px`,
                      height: `${CARD_HEIGHT}px`,
                      zIndex: isActive ? 36 : projects.length - index,
                      boxShadow: isActive
                        ? `0 24px 90px rgba(0,0,0,0.45), 0 0 0 1px ${project.accentColor}66, 0 0 65px ${project.accentColor}24`
                        : "0 24px 90px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)",
                    }}
                    tabIndex={0}
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

                    <div className="relative z-10 flex h-full flex-col p-6 pt-8 md:p-7 md:pt-9">
                      <div className="mb-5 flex items-start justify-end">
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

                        <div className="relative z-10 flex h-full items-center justify-center p-5">
                          <h3 className="mx-auto max-w-[12ch] text-center text-2xl font-bold leading-tight tracking-tight text-white text-balance md:text-3xl">
                            {project.title}
                          </h3>
                        </div>
                      </div>

                      <p className="mx-auto line-clamp-3 max-w-[30ch] text-center text-sm leading-7 text-white/46 md:max-w-[34ch]">
                        {project.description}
                      </p>

                      <div className="mt-5 flex flex-wrap justify-center gap-2">
                        {project.technologies.slice(0, 4).map((technology) => (
                          <span
                            key={technology}
                            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[0.64rem] uppercase tracking-[0.18em] text-white/42"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>

                      <div className="mt-5 flex flex-col items-center gap-3 pt-4 text-center">
                        <span className="font-mono text-[0.64rem] uppercase tracking-[0.28em] text-white/28">
                          {text.technologies}
                        </span>

                        {canVisit ? (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.stopPropagation();
                              }
                            }}
                            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[0.68rem] uppercase tracking-[0.24em] text-white/70 transition-colors duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
                            data-cursor-hover
                          >
                            {text.visitSite}
                            <ArrowUpRight size={14} />
                          </a>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              openProjectModal(project.id);
                            }}
                            className="inline-flex cursor-pointer items-center rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[0.68rem] uppercase tracking-[0.24em] text-white/40"
                            data-cursor-hover
                          >
                            {text.openDetails}
                          </button>
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
      <Transition appear as={Fragment} show={Boolean(selectedProject)}>
        <Dialog
          as="div"
          className="relative z-[120]"
          onClose={closeProjectModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogBackdrop className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto px-4 py-6 md:px-6 md:py-10">
            <div className="flex min-h-full items-center justify-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-8 scale-[0.98]"
                enterTo="opacity-100 translate-y-0 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 scale-100"
                leaveTo="opacity-0 translate-y-4 scale-[0.98]"
              >
                <DialogPanel className="relative w-full max-w-5xl overflow-hidden rounded-[30px] border border-white/10 bg-[#121212] p-5 text-white shadow-[0_28px_120px_rgba(0,0,0,0.55)] md:p-8">
                  {selectedProject ? (
                    <>
                      <button
                        type="button"
                        onClick={closeProjectModal}
                        aria-label={text.closeButtonAria}
                        className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white"
                      >
                        <X size={18} />
                      </button>

                      <div className="space-y-6">
                        <div className="pr-12">
                          <p className="mb-2 font-mono text-xs uppercase tracking-[0.24em] text-white/40">
                            {text.detailsTitle}
                          </p>
                          <DialogTitle
                            as="h3"
                            className="text-3xl font-bold leading-tight tracking-tight text-white"
                          >
                            {selectedProject.title}
                          </DialogTitle>
                          <p className="mt-4 max-w-[70ch] text-sm leading-7 text-white/65 md:text-base">
                            {buildExpandedDescription(selectedProject)}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
                          {getProjectGalleryImages(selectedProject)
                            .slice(0, 6)
                            .map((imageSrc, imageIndex) => (
                              <div
                                key={`${selectedProject.id}-image-${imageIndex}`}
                                className="overflow-hidden rounded-2xl border border-white/10 bg-black/20"
                              >
                                <Image
                                  src={imageSrc}
                                  alt={`${text.modalGalleryAlt} ${imageIndex + 1}`}
                                  className="h-32 w-full object-cover md:h-40"
                                  width={960}
                                  height={720}
                                  unoptimized
                                />
                              </div>
                            ))}
                        </div>

                        <div className="grid gap-6 md:grid-cols-[1.25fr_0.75fr]">
                          <div>
                            <p className="mb-3 font-mono text-xs uppercase tracking-[0.24em] text-white/40">
                              {text.featuresTitle}
                            </p>
                            <ul className="space-y-2 text-sm leading-7 text-white/72 md:text-base">
                              {buildProjectFeatures(selectedProject).map(
                                (feature) => (
                                  <li
                                    key={feature}
                                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2"
                                  >
                                    {feature}
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>

                          <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                            <p className="font-mono text-xs uppercase tracking-[0.24em] text-white/40">
                              {text.durationLabel}
                            </p>
                            <p className="text-lg font-semibold text-white">
                              {selectedProject.year}
                            </p>
                            <div className="flex flex-wrap gap-2 pt-1">
                              {selectedProject.technologies
                                .slice(0, 5)
                                .map((technology) => (
                                  <span
                                    key={`${selectedProject.id}-${technology}`}
                                    className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/62"
                                  >
                                    {technology}
                                  </span>
                                ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end border-t border-white/10 pt-5">
                          {selectedProject.url.startsWith("http") &&
                          selectedProject.url !== "https://" ? (
                            <a
                              href={selectedProject.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2.5 text-xs uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:border-white/20 hover:bg-white/20"
                            >
                              {text.visitSite}
                              <ArrowUpRight size={14} />
                            </a>
                          ) : (
                            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-xs uppercase tracking-[0.2em] text-white/45">
                              {text.previewFallback}
                            </span>
                          )}
                        </div>
                      </div>
                    </>
                  ) : null}
                </DialogPanel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
