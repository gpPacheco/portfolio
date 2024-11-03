const Projects = () => {
  const projects = [
    { title: "Projeto 1", description: "Descrição do Projeto 1", link: "#" },
    { title: "Projeto 2", description: "Descrição do Projeto 2", link: "#" },
    // Adicione mais projetos conforme necessário
  ];

  return (
    <section className="py-16 px-6 bg-gray-900 text-white">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">Projetos</h2>
      <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
        {projects.map((project, index) => (
          <a
            href={project.link}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 p-6 rounded-lg shadow-lg transition hover:shadow-xl hover:scale-105 transform"
          >
            <h3 className="text-2xl font-semibold text-teal-400">{project.title}</h3>
            <p className="mt-2 text-gray-300">{project.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Projects;