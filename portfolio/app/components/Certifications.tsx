const Certifications = () => {
    const certifications = [
      { title: "Database Design", issuer: "Oracle Academy", date: "2024" },
      { title: "NLW Journey - React.js", issuer: "Rocketseat", date: "2024" },
      { title: "Computer Fundamentals", issuer: "IBSEC (Instituto Brasileiro de Cibersegurança", date: "2023" },
    ];
  
    return (
      <section className="py-16 px-6 bg-gray-800 text-white">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">Certificações</h2>
        <div className="space-y-6 max-w-4xl mx-auto">
          {certifications.map((cert, index) => (
            <div key={index} className="bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transform transition hover:scale-105">
              <h3 className="text-2xl font-semibold text-purple-400">{cert.title}</h3>
              <p className="text-teal-400">{cert.issuer}</p>
              <p className="text-gray-500">{cert.date}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };
   
  export default Certifications;
  