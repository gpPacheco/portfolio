"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Code2 } from "lucide-react";
import { projects, Project } from "@/data/projects";
import { cn } from "@/lib/utils";

export default function ProjectGallery() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Lock scroll when overlay is open
  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <section id="works" className="relative py-40 px-6 md:px-16 lg:px-32">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-20"
      >
        <p className="text-accent font-mono text-xs tracking-[0.35em] uppercase mb-4">
          Selected Work
        </p>
        <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black tracking-tighter text-white leading-none">
          Works.
        </h2>
        <div className="mt-4 w-20 h-px bg-gradient-to-r from-accent to-transparent" />
      </motion.div>

      {/* Project list */}
      <div className="space-y-0 border-t border-white/5">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            layout
            layoutId={`project-${project.id}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.7,
              delay: i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            onClick={() => setSelected(project)}
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={cn(
              "group relative flex items-center justify-between py-8 border-b border-white/5",
              "cursor-pointer overflow-hidden transition-all duration-500"
            )}
            data-cursor-hover
          >
            {/* Hover background */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: hoveredId === project.id ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: `linear-gradient(90deg, ${project.accentColor}08 0%, transparent 100%)`,
                transformOrigin: "left",
              }}
            />

            <div className="flex items-center gap-8 z-10">
              {/* Index */}
              <span className="text-white/20 font-mono text-sm tabular-nums w-8">
                {project.index}
              </span>

              {/* Title */}
              <div>
                <h3
                  className={cn(
                    "text-[clamp(1.25rem,3vw,2rem)] font-bold text-white tracking-tight",
                    "group-hover:text-accent transition-colors duration-300"
                  )}
                  style={{
                    color: hoveredId === project.id ? project.accentColor : undefined,
                    transition: "color 0.3s ease",
                  }}
                >
                  {project.title}
                </h3>
                <p className="text-white/40 text-sm mt-0.5">{project.subtitle}</p>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-6 z-10">
              {/* Tags (hidden on mobile) */}
              <div className="hidden md:flex gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono text-white/30 border border-white/10 px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Year */}
              <span className="text-white/30 font-mono text-sm">{project.year}</span>

              {/* Arrow */}
              <motion.div
                animate={{
                  x: hoveredId === project.id ? 0 : -8,
                  opacity: hoveredId === project.id ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <ArrowUpRight
                  size={20}
                  style={{ color: project.accentColor }}
                />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expanded project overlay */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
            />

            {/* Panel */}
            <div
              className="fixed inset-0 z-50 p-4 md:p-8 flex items-center justify-center"
              onClick={() => setSelected(null)}
            >
              <motion.div
                key={`panel-${selected.id}`}
                layoutId={`project-${selected.id}`}
                initial={{ opacity: 0, y: 80, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 60, scale: 0.97 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                className={cn(
                  "w-full md:max-w-2xl",
                  "max-h-full overflow-y-auto",
                  "bg-[#111111] border border-white/10 rounded-2xl overflow-x-hidden",
                  "gradient-border"
                )}
                onClick={(e) => e.stopPropagation()}
              >
              {/* Accent line top */}
              <div
                className="h-0.5 w-full"
                style={{
                  background: `linear-gradient(90deg, transparent, ${selected.accentColor}, transparent)`,
                }}
              />

              {/* Project image */}
              {selected.image && (
                <div className="w-full aspect-video bg-black/40 overflow-hidden">
                  <img
                    src={selected.image}
                    alt={selected.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {!selected.image && (
                <div className="w-full aspect-video bg-black/30 flex items-center justify-center border-b border-white/5">
                  <span className="text-white/20 font-mono text-xs uppercase tracking-widest">Project Preview</span>
                </div>
              )}

              <div className="p-8 md:p-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p
                      className="text-xs font-mono tracking-[0.3em] uppercase mb-2"
                      style={{ color: selected.accentColor }}
                    >
                      {selected.index} / {selected.year}
                    </p>
                    <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                      {selected.title}
                    </h3>
                    <p className="text-white/50 mt-1">{selected.subtitle}</p>
                  </div>

                  <button
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelected(null);
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelected(null);
                    }}
                    className={cn(
                      "p-2 rounded-full border border-white/10",
                      "hover:border-white/30 hover:bg-white/5",
                      "transition-all duration-200 ml-4 flex-shrink-0",
                      "relative z-10 pointer-events-auto"
                    )}
                    aria-label="Close"
                    data-cursor-hover
                  >
                    <X size={18} className="text-white/60" />
                  </button>
                </div>

                {/* Description */}
                <p className="text-white/60 leading-relaxed text-sm md:text-base mb-8">
                  {selected.description}
                </p>

                {/* Technologies */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <Code2 size={14} className="text-white/30" />
                    <span className="text-xs font-mono text-white/30 uppercase tracking-widest">
                      Technologies
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selected.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono px-3 py-1.5 rounded-full border"
                        style={{
                          borderColor: `${selected.accentColor}40`,
                          color: selected.accentColor,
                          background: `${selected.accentColor}10`,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <a
                  href={selected.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center gap-2 px-6 py-3 rounded-full",
                    "text-sm font-medium transition-all duration-300",
                    "border hover:gap-3"
                  )}
                  style={{
                    borderColor: `${selected.accentColor}60`,
                    color: selected.accentColor,
                    background: `${selected.accentColor}15`,
                  }}
                  data-cursor-hover
                >
                  Visit Site
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
