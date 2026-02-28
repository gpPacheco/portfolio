export interface Project {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  year: string;
  url: string;
  color: string;
  accentColor: string;
  tags: string[];
  image?: string;
}

export const projects: Project[] = [
  {
    id: "Clinica Rita Pacheco",
    index: "01",
    title: "Clinica Rita Pacheco",
    subtitle: "AI-Powered Design System",
    description:
      "A cutting-edge design system platform that leverages machine learning to auto-generate accessible, brand-consistent component libraries at scale. Built for enterprise teams that need design velocity without sacrificing quality or accessibility standards.",
    technologies: ["Next.js", "TypeScript", "Python", "FastAPI", "PostgreSQL", "Redis", "Docker"],
    year: "2025",
    url: "https://www.clinicaritapacheco.com.br",
    color: "#0a0a0a",
    accentColor: "#818cf8",
    tags: ["Web App", "AI/ML", "Design Systems"],
  },
  {
    id: "PATU HUB",
    index: "02",
    title: "PATU HUB",
    subtitle: "Real-Time Collaborative IDE",
    description:
      "A browser-based collaborative IDE with sub-50ms synchronization powered by CRDTs. Supports 40+ languages, live pair programming, integrated AI code completion, and one-click containerized execution environments — entirely in the browser.",
    technologies: ["React", "WebAssembly", "Rust", "WebRTC", "Y.js", "Node.js", "Kubernetes"],
    year: "2025",
    url: "https://vortex.dev",
    color: "#0a0a0a",
    accentColor: "#34d399",
    tags: ["SaaS", "Real-Time", "Developer Tools"],
  },
  {
    id: "Você Está Bem?",
    index: "03",
    title: "Você Está Bem?    ",
    subtitle: "3D E-Commerce Experience Platform",
    description:
      "Redefining online retail with immersive WebGL-powered 3D product configurators and try-on experiences. Integrates seamlessly with Shopify and custom storefronts, delivering photorealistic real-time rendering at 60fps without dedicated GPU requirements.",
    technologies: ["Three.js", "React", "WebGL", "GLSL", "GraphQL", "Shopify API", "Vercel"],
    year: "2026",
    url: "https://prism.store",
    color: "#0a0a0a",
    accentColor: "#fb923c",
    tags: ["E-Commerce", "3D/WebGL", "Creative Tech"],
  },
];
