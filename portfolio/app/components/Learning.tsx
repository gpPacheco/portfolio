const Learning = () => {
    const learning = ["TypeScript", "Oracle DB", "English", "Artificial Intelligence", "Machine Learning"];
  
    return (
      <section className="py-16 px-6 bg-gray-800 text-white">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">O que estou aprendendo</h2>
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {learning.map((item, index) => (
            <div
              key={index}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-gray-900 font-semibold shadow-md hover:scale-105 transform transition"
            >
              {item}
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default Learning;
  