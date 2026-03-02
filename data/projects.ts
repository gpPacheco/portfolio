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
    id: "Rita Pacheco Clinic",
    index: "01",
    title: "Rita Pacheco Clinic",
    subtitle: "Medical clinic management system with appointment scheduling",
    description:
      "A comprehensive medical clinic management system that streamlines appointment scheduling, patient records, and billing processes. Built with a user-friendly interface and robust backend to enhance operational efficiency and patient experience.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "REST Api", "Supabase"],
    year: "2025",
    url: "https://www.clinicaritapacheco.com.br",
    color: "#0a0a0a",
    accentColor: "#818cf8",
    tags: ["Web App", "REST Api", "Design Systems"],
  },
  {
    id: "PATU HUB",
    index: "02",
    title: "PATU HUB",
    subtitle: "Real-Time dashboard for monitoring and managing puclicitary services",
    description:
      "A real-time dashboard designed for monitoring and managing public services, providing insights into performance metrics, resource allocation, and citizen engagement. Built with a focus on scalability and user experience to support efficient decision-making.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "REST Api", "Supabase"],
    year: "2025",
    url: "https://patuhub.vercel.app",
    color: "#0a0a0a",
    accentColor: "#34d399",
    tags: ["SaaS", "Real-Time", "Insight Tools"],
  },
  {
    id: "Are You Ok?",
    index: "03",
    title: "Are You Ok?",
    subtitle: "Mobile app for mental health support and resources",
    description:
      "A mobile application designed to provide mental health support and resources to users. Features include mood tracking, guided meditation sessions, crisis support, and personalized wellness recommendations.",
    technologies: ["React Native", "TypeScript", "Firebase", "Node.js"],
    year: "2026",
    url: "https://",
    color: "#0a0a0a",
    accentColor: "#fb923c",
    tags: ["Mobile App", "Mental Health", "Wellness"],
  },
];
