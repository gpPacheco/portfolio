import { SiteLocale } from "@/lib/i18n";

export type EducationItem = {
  id: string;
  title: string;
  institution: string;
  year: string;
  logo?: string;
  image?: string;
  imageAlt?: string;
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
    image: "/ccbeu.jpg",
    imageAlt: "CCBEU advanced English course certificate",
  },
  {
    id: "aws-saa",
    title: "Cloud Architecting",
    institution: "AWS Academy Graduate",
    year: "2025",
    logo: "/logos/aws.svg",
    image:
      "/AWS_Academy_Graduate___Cloud_Architecting___Training_Badge_Badge20260426-31-t49fhn_page-0001.jpg",
    imageAlt: "AWS Academy Graduate Cloud Architecting badge",
  },
    {
    id: "aws-saa",
    title: "Cloud Foundations",
    institution: "AWS Academy Graduate",
    year: "2025",
    logo: "/logos/aws.svg",
    image:
      "/AWS_Academy_Graduate___Cloud_Foundations___Training_Badge_Badge20260426-31-j5cvg9_page-0001.jpg",
    imageAlt: "AWS Academy Graduate Cloud Foundations badge",
  },  
  {
    id: "google-cloud",
    title: "Prompt Design in Vertex AI",
    institution: "Google Cloud Skill Boost",
    year: "2025",
    image: "/prompt design.png",
    imageAlt: "Prompt Design in Vertex AI certificate",
  },
  {
    id: "google-cloud",
    title: "Develop GenAI Apps with Gemini and Streamlit",
    institution: "Google Cloud Skill Boost",
    year: "2025",
    image: "/develop genai apps.png",
    imageAlt: "Develop GenAI Apps with Gemini and Streamlit certificate",
  },
  {
    id: "oracle",
    title: "Database Design and Programming with SQL",
    institution: "Oracle academy",
    year: "2024",
    image: "/oracle database design.jpg",
    imageAlt: "Oracle Database Design and Programming with SQL certificate",
  },
    {
    id: "isec",
    title: "Fundamentals in computer",
    institution: "IBSEC (Brazilian Institute of Cybersecurity)",
    year: "2023",
    image: "/ibsec.jpg",
    imageAlt: "IBSEC fundamentals in computer certificate",
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
    image: "/ccbeu.jpg",
    imageAlt: "Certificado do curso avançado de inglês do CCBEU",
  },
  {
    id: "aws-saa",
    title: "Arquitetura em Nuvem",
    institution: "AWS Academy Graduate",
    year: "2025",
    logo: "/logos/aws.svg",
    image:
      "/AWS_Academy_Graduate___Cloud_Architecting___Training_Badge_Badge20260426-31-t49fhn_page-0001.jpg",
    imageAlt: "Badge de Arquitetura em Nuvem da AWS Academy Graduate",
  },
  {
    id: "aws-saa",
    title: "Fundamentos de Cloud",
    institution: "AWS Academy Graduate",
    year: "2025",
    logo: "/logos/aws.svg",
    image:
      "/AWS_Academy_Graduate___Cloud_Foundations___Training_Badge_Badge20260426-31-j5cvg9_page-0001.jpg",
    imageAlt: "Badge de Fundamentos de Cloud da AWS Academy Graduate",
  },
  {
    id: "google-cloud",
    title: "Design de Prompts no Vertex AI",
    institution: "Google Cloud Skill Boost",
    year: "2025",
    image: "/prompt design.png",
    imageAlt: "Certificado de Design de Prompts no Vertex AI",
  },
  {
    id: "google-cloud",
    title: "Desenvolvimento de Apps GenAI com Gemini e Streamlit",
    institution: "Google Cloud Skill Boost",
    year: "2025",
    image: "/develop genai apps.png",
    imageAlt: "Certificado de desenvolvimento de apps GenAI com Gemini e Streamlit",
  },
  {
    id: "oracle",
    title: "Modelagem e Programação de Banco de Dados com SQL",
    institution: "Oracle Academy",
    year: "2024",
    image: "/oracle database design.jpg",
    imageAlt: "Certificado da Oracle Academy de banco de dados e SQL",
  },
  {
    id: "isec",
    title: "Fundamentos em Computação",
    institution: "IBSEC (Instituto Brasileiro de Cibersegurança)",
    year: "2023",
    image: "/ibsec.jpg",
    imageAlt: "Certificado de Fundamentos em Computação do IBSEC",
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