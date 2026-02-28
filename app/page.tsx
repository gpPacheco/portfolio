"use client";

import Hero from "@/components/Hero";
import ProjectGallery from "@/components/ProjectGallery";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <ProjectGallery />
      <Footer />
    </main>
  );
}
