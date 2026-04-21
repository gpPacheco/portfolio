import { SiteLocale } from "@/lib/i18n";

type HeroText = {
  badge: string;
  title: string;
  cta: string;
  worksBelow: string;
};

type ProjectsText = {
  badge: string;
  title: string;
  description: string;
  scrollHint: string;
  openDetails: string;
  detailsTitle: string;
  featuresTitle: string;
  durationLabel: string;
  modalGalleryAlt: string;
  previewFallback: string;
  closeButtonAria: string;
  previousImageAria: string;
  nextImageAria: string;
  goToImageAria: string;
  technologies: string;
  visitSite: string;
};

type EducationText = {
  badge: string;
  title: string;
};

type FooterText = {
  badge: string;
  title: string;
  description: string;
  linkedinDescription: string;
  githubDescription: string;
  emailDescription: string;
  rights: string;
  builtWith: string;
};

export type SiteText = {
  hero: HeroText;
  projects: ProjectsText;
  education: EducationText;
  footer: FooterText;
};

export const uiText: Record<SiteLocale, SiteText> = {
  "en-US": {
    hero: {
      badge: "Portfolio",
      title: "Software Engineer",
      cta: "SCROLL TO EXPLORE",
      worksBelow: "Works Below",
    },
    projects: {
      badge: "Featured Work",
      title: "Works.",
      description:
        "A curated selection of interfaces and systems focused on clarity, visual rhythm, and product impact.",
      scrollHint: "Drag sideways to explore the full set.",
      openDetails: "Open details",
      detailsTitle: "Project details",
      featuresTitle: "Features",
      durationLabel: "Duration",
      modalGalleryAlt: "Project preview",
      previewFallback: "Project Preview",
      closeButtonAria: "Close",
      previousImageAria: "Previous project image",
      nextImageAria: "Next project image",
      goToImageAria: "Go to image",
      technologies: "Technologies",
      visitSite: "Visit Website",
    },
    education: {
      badge: "Education & Certifications",
      title: "Learning Path.",
    },
    footer: {
      badge: "Let's Connect",
      title: "Say Hello.",
      description:
        "Available for freelance projects, collaborations, and full-time opportunities.",
      linkedinDescription: "Professional network",
      githubDescription: "Open source work",
      emailDescription: "Get in touch",
      rights: "© 2026 Gabriel Pacheco. All rights reserved.",
      builtWith: "Built with Next.js · GSAP · Framer Motion",
    },
  },
  "pt-BR": {
    hero: {
      badge: "Portfólio",
      title: "Engenheiro de Software",
      cta: "ROLE PARA EXPLORAR",
      worksBelow: "Projetos Abaixo",
    },
    projects: {
      badge: "Trabalhos em Destaque",
      title: "Trabalhos.",
      description:
        "Uma selecao de interfaces e sistemas com foco em clareza, ritmo visual e impacto de produto.",
      scrollHint: "Arraste para os lados para explorar tudo.",
      openDetails: "Abrir detalhes",
      detailsTitle: "Detalhes do projeto",
      featuresTitle: "Funcionalidades",
      durationLabel: "Duracao",
      modalGalleryAlt: "Previa do projeto",
      previewFallback: "Prévia do Projeto",
      closeButtonAria: "Fechar",
      previousImageAria: "Imagem anterior do projeto",
      nextImageAria: "Próxima imagem do projeto",
      goToImageAria: "Ir para a imagem",
      technologies: "Tecnologias",
      visitSite: "Visitar Website",
    },
    education: {
      badge: "Formação & Certificações",
      title: "Trilha de Aprendizado.",
    },
    footer: {
      badge: "Vamos nos Conectar",
      title: "Diga Olá.",
      description:
        "Disponível para projetos freelance, colaborações e oportunidades em tempo integral.",
      linkedinDescription: "Rede profissional",
      githubDescription: "Projetos open source",
      emailDescription: "Entre em contato",
      rights: "© 2026 Gabriel Pacheco. Todos os direitos reservados.",
      builtWith: "Construído com Next.js · GSAP · Framer Motion",
    },
  },
};
