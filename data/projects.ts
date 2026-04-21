import { SiteLocale } from "@/lib/i18n";

export interface Project {
  id: string;
  index: string;
  title: string;
  description: string;
  technologies: string[];
  year: string;
  url: string;
  color: string;
  accentColor: string;
  tags: string[];
  images: string[];
}

const enUSProjects: Project[] = [
  {
    id: "Rita Pacheco Clinic",
    index: "01",
    title: "Rita Pacheco Clinic",
    description:
      "A comprehensive medical clinic management system that streamlines appointment scheduling, patient records, and billing processes. Built with a user-friendly interface and robust backend to enhance operational efficiency and patient experience.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "REST Api", "PostgreSQL"],
    year: "2025",
    url: "https://www.clinicaritapacheco.com.br",
    color: "#0a0a0a",
    accentColor: "#818cf8",
    tags: ["Web App", "REST Api", "Design Systems"],
    images: [],
  },
  {
    id: "PATU HUB",
    index: "02",
    title: "PATU HUB",
    description:
      "A real-time dashboard designed for monitoring and managing public services, providing insights into performance metrics, resource allocation, and citizen engagement. Built with a focus on scalability and user experience to support efficient decision-making.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "REST Api", "PostgreSQL"],
    year: "2025",
    url: "https://patuhub.vercel.app",
    color: "#0a0a0a",
    accentColor: "#34d399",
    tags: ["SaaS", "Real-Time", "Insight Tools"],
    images: [],
  },
  {
    id: "Are You Ok?",
    index: "03",
    title: "Are You Ok?",
    description:
      "A mobile application designed to provide mental health support and resources to users. Features include mood tracking, guided meditation sessions, crisis support, and personalized wellness recommendations.",
    technologies: ["Expo go", "TypeScript", "Supabse", "Node.js"],
    year: "2026",
    url: "https://",
    color: "#0a0a0a",
    accentColor: "#fb923c",
    tags: ["Mobile App", "Mental Health", "Wellness"],
    images: [],
  },
    {
    id: "CIPMP",
    index: "04",
    title: "CIPMP",
    description:
      "A landing page created for the CIPMP event, which focuses on health, technology, and innovation. The page features a modern design with interactive elements to engage visitors and provide information about the event's schedule, speakers, and registration process.",
    technologies: ["Next.js", "TypeScript", "Node.js"],
    year: "2026",
    url: "https://cipmp.com.br",
    color: "#0a0a0a",
    accentColor: "#f43f5e",
    tags: ["Landing Page", "Event", "Health Tech"],
    images: [],
  },
];

const ptBRProjects: Project[] = [
  {
    id: "Clinica Rita Pacheco",
    index: "01",
    title: "Clinica Rita Pacheco",
    description:
      "Um sistema completo de gestão para clínica médica que otimiza agendamentos, prontuários e processos de cobrança. Desenvolvido com interface intuitiva e backend robusto para melhorar a eficiência operacional e a experiência dos pacientes.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "REST Api", "PostgreSQL"],
    year: "2025",
    url: "https://www.clinicaritapacheco.com.br",
    color: "#0a0a0a",
    accentColor: "#818cf8",
    tags: ["Aplicação Web", "REST Api", "Design Systems"],
    images: [],
  },
  {
    id: "PATU HUB",
    index: "02",
    title: "PATU HUB",
    description:
      "Um dashboard em tempo real para monitoramento e gestão de serviços públicos, com métricas de desempenho, alocação de recursos e engajamento dos cidadãos. Construído com foco em escalabilidade e experiência do usuário para apoiar decisões mais eficientes.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "REST Api", "PostgreSQL"],
    year: "2025",
    url: "https://patuhub.vercel.app",
    color: "#0a0a0a",
    accentColor: "#34d399",
    tags: ["SaaS", "Tempo Real", "Ferramentas de Insights"],
    images: [],
  },
  {
    id: "Você Está Bem?",
    index: "03",
    title: "Você Está Bem?",
    description:
      "Um aplicativo mobile criado para oferecer suporte e recursos de saúde mental aos usuários. Inclui acompanhamento de humor, meditações guiadas, apoio em crises e recomendações personalizadas de bem-estar.",
    technologies: ["Expo go", "TypeScript", "Supabse", "Node.js"],
    year: "2026",
    url: "https://",
    color: "#0a0a0a",
    accentColor: "#fb923c",
    tags: ["Aplicativo Mobile", "Saúde Mental", "Bem-estar"],
    images: [],
  },
      {
    id: "CIPMP",
    index: "04",
    title: "CIPMP",
    description:
      "Uma landing page criada para o evento CIPMP, que se concentra em saúde, tecnologia e inovação. A página apresenta um design moderno com elementos interativos para engajar visitantes e fornecer informações sobre o cronograma, palestrantes e processo de inscrição.",
    technologies: ["Next.js", "TypeScript", "Node.js"],
    year: "2026",
    url: "https://cipmp.com.br",
    color: "#0a0a0a",
    accentColor: "#f43f5e",
    tags: ["Landing Page", "Evento", "Tecnologia em Saúde"],
    images: [],
  },
];

export const projectsByLocale: Record<SiteLocale, Project[]> = {
  "en-US": enUSProjects,
  "pt-BR": ptBRProjects,
};

export const projects: Project[] = projectsByLocale["en-US"];

export function getProjects(locale: SiteLocale): Project[] {
  return projectsByLocale[locale];
}
