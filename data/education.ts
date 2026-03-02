export type EducationItem = {
  id: string;
  title: string;
  institution: string;
  year: string;
  logo?: string;
};

export const educationItems: EducationItem[] = [
  {
    id: "ufsc-bsc",
    title: "B.Sc. in Computer Science",
    institution: "Federal University of Santa Catarina",
    year: "2021",
    logo: "/logos/ufsc.svg",
  },
  {
    id: "coursera-cloud",
    title: "Cloud Architecture Specialization",
    institution: "Coursera",
    year: "2023",
    logo: "/logos/coursera.svg",
  },
  {
    id: "aws-saa",
    title: "AWS Certified Solutions Architect — Associate",
    institution: "Amazon Web Services",
    year: "2024",
    logo: "/logos/aws.svg",
  },
  {
    id: "google-ux",
    title: "Advanced UX for Interactive Interfaces",
    institution: "Google Career Certificates",
    year: "2025",
  },
];

export const institutionLogos = [
  { id: "ufsc", name: "UFSC", logo: "/logos/ufsc.svg" },
  { id: "coursera", name: "Coursera", logo: "/logos/coursera.svg" },
  { id: "aws", name: "AWS", logo: "/logos/aws.svg" },
  { id: "udemy", name: "Udemy", logo: "/logos/udemy.svg" },
  { id: "alura", name: "Alura", logo: "/logos/alura.svg" },
  { id: "google", name: "Google", logo: "/logos/google.svg" },
];