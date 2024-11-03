import Hero from './components/Hero';
import Skills from './components/Skills';
import Learning from './components/Learning';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';

export default function Home() {
  return (
    <main className="bg-gray-900 text-white">
      <Hero />
      <Skills />
      <Learning />
      <Projects />
      <Certifications />
      <Contact />
    </main>
  );
}
