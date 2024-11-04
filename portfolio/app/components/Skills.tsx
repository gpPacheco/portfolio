const Skills = () => {
    const skills = ["React", "Next.js", "Tailwind CSS", "Oracle DB", "PostgreSQL", "English", "Git", "GitHub", "VsCode", "SEO"];
  
    return (
      <section className="py-16 px-6 bg-gray-900 text-white">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">Skills</h2>
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-blue-500 text-gray-900 font-semibold shadow-md hover:scale-105 transform transition"
            >
              {skill}
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default Skills;
  