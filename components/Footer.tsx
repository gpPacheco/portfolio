"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { uiText } from "@/data/ui-text";
import { SiteLocale } from "@/lib/i18n";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

type FooterProps = {
  locale: SiteLocale;
};

export default function Footer({ locale }: FooterProps) {
  const text = uiText[locale].footer;

  const links = [
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/gabriel-f-pacheco",
      icon: Linkedin,
      description: text.linkedinDescription,
    },
    {
      label: "GitHub",
      href: "https://github.com/gppacheco",
      icon: Github,
      description: text.githubDescription,
    },
    {
      label: "Email",
      href: "mailto:gabrielfppacheco@gmail.com",
      icon: Mail,
      description: text.emailDescription,
    },
  ];

  return (
    <footer className="relative border-t border-white/5 py-24 px-6 md:px-16 lg:px-32 overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(56,189,248,0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-16 text-center">
            <p className="text-accent font-mono text-xs tracking-[0.35em] uppercase mb-4">
              {text.badge}
            </p>
            <h2 className="text-[clamp(2rem,5vw,4rem)] font-black tracking-tighter text-white leading-none">
              {text.title}
            </h2>
            <p className="text-white/40 mt-4 text-sm max-w-md mx-auto leading-relaxed">
              {text.description}
            </p>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row justify-center gap-4 mb-20"
          >
            {links.map(({ label, href, icon: Icon, description }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex items-center gap-4 px-6 py-4 rounded-xl border border-white/8 hover:border-accent/40 hover:bg-accent/5 transition-all duration-300"
                data-cursor-hover
              >
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-accent/10 transition-colors duration-300">
                  <Icon
                    size={18}
                    className="text-white/50 group-hover:text-accent transition-colors duration-300"
                  />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-white text-sm font-medium">{label}</p>
                  <p className="text-white/30 text-xs">{description}</p>
                </div>
                <ArrowUpRight
                  size={14}
                  className="text-white/20 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                />
              </a>
            ))}
          </motion.div>

          {/* Bottom bar */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5"
          >
            <p className="text-white/20 font-mono text-xs tracking-wider">
              {text.rights}
            </p>
            <p className="text-white/20 font-mono text-xs tracking-wider">
              {text.builtWith}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
