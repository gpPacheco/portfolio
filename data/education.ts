import { SiteLocale } from "@/lib/i18n";

export type EducationItem = {
  id: string;
  title: string;
  institution: string;
  year: string;
  logo?: string;
};

const enUSEducationItems: EducationItem[] = [
  {
    id: "uni-facef",
    title: "Software Engineering",
    institution: "Franca Municipal University Center",
    year: "2026",
  },
  {
    id: "ccbeu",
    title: "Advanced English Course",
    institution: "CCBEU",
    year: "2026",
  },
  {
    id: "aws-saa",
    title: "Cloud Architecting",
    institution: "AWS Academy Graduate",
    year: "2025",
    logo: "/logos/aws.svg",
  },
    {
    id: "aws-saa",
    title: "Cloud Foundations",
    institution: "AWS Academy Graduate",
    year: "2025",
    logo: "/logos/aws.svg",
  },  
  {
    id: "google-cloud",
    title: "Prompt Design in Vertex AI",
    institution: "Google Cloud Skill Boost",
    year: "2025",
  },
  {
    id: "google-cloud",
    title: "Develop GenAI Apps with Gemini and Streamlit",
    institution: "Google Cloud Skill Boost",
    year: "2025",
  },
  {
    id: "oracle",
    title: "Database Design and Programming with SQL",
    institution: "Oracle academy",
    year: "2024",
  },
    {
    id: "isec",
    title: "Fundamentals in computer",
    institution: "IBSEC (Brazilian Institute of Cybersecurity)",
    year: "2023",
  },
];

const ptBREducationItems: EducationItem[] = [
  {
    id: "uni-facef",
    title: "Engenharia de Software",
    institution: "Centro Universitário Municipal de Franca",
    year: "2026",
  },
  {
    id: "ccbeu",
    title: "Curso Avançado de Inglês",
    institution: "CCBEU",
    year: "2026",
  },
  {
    id: "aws-saa",
    title: "Arquitetura em Nuvem",
    institution: "AWS Academy Graduate",
    year: "2025",
    logo: "/logos/aws.svg",
  },
  {
    id: "aws-saa",
    title: "Fundamentos de Cloud",
    institution: "AWS Academy Graduate",
    year: "2025",
    logo: "/logos/aws.svg",
  },
  {
    id: "google-cloud",
    title: "Design de Prompts no Vertex AI",
    institution: "Google Cloud Skill Boost",
    year: "2025",
  },
  {
    id: "google-cloud",
    title: "Desenvolvimento de Apps GenAI com Gemini e Streamlit",
    institution: "Google Cloud Skill Boost",
    year: "2025",
  },
  {
    id: "oracle",
    title: "Modelagem e Programação de Banco de Dados com SQL",
    institution: "Oracle Academy",
    year: "2024",
  },
  {
    id: "isec",
    title: "Fundamentos em Computação",
    institution: "IBSEC (Instituto Brasileiro de Cibersegurança)",
    year: "2023",
  },
];

export const educationItemsByLocale: Record<SiteLocale, EducationItem[]> = {
  "en-US": enUSEducationItems,
  "pt-BR": ptBREducationItems,
};

export const educationItems: EducationItem[] = educationItemsByLocale["en-US"];

export function getEducationItems(locale: SiteLocale): EducationItem[] {
  return educationItemsByLocale[locale];
}

export const institutionLogos = [
  { id: "uni-facef", name: "Uni-FACEF" },
  { id: "oracle", name: "Oracle" },
  { id: "aws", name: "AWS", logo: "/logos/aws.svg" },
  { id: "google", name: "Google Cloud" },
  { id: "google", name: "Google" },
  { id: "fat", name: "FAT Foundation" },
  { id: "ibsec", name: "IBSEC" },
];