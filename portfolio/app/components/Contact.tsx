const Contact = () => {
    return (
      <section className="py-16 px-6 bg-gray-900 text-white text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">Contato</h2>
        <p className="mb-4 text-lg text-gray-300">Conecte-se comigo em qualquer uma das plataformas abaixo:</p>
        <div className="flex justify-center space-x-6">
          <a href="https://www.linkedin.com/in/seu-linkedin" target="_blank" rel="noopener noreferrer" className="text-teal-400 text-xl hover:underline">
            LinkedIn
          </a>
          <a href="https://github.com/seu-github" target="_blank" rel="noopener noreferrer" className="text-teal-400 text-xl hover:underline">
            GitHub
          </a>
          <a href="mailto:seuemail@dominio.com" className="text-teal-400 text-xl hover:underline">
            seuemail@dominio.com
          </a>
        </div>
      </section>
    );
    };
  
  export default Contact;
  