const Contact = () => {
  return (
    <section className="py-16 px-6 bg-gray-900 text-white text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-8">Contact</h2>
      <p className="mb-4 text-lg text-gray-300">
        Connect with me on any of the plataforms below:
      </p>
      <div className="flex justify-center space-x-6">
        <a
          href="https://linkedin.com/in/gabriel-f-pacheco/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-400 text-xl hover:underline"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/gpPacheco"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-400 text-xl hover:underline"
        >
          GitHub
        </a>
        <a
          href="mailto:contato.gabrielfpacheco@gmail.com"
          className="text-teal-400 text-xl hover:underline"
        >
          Email
        </a>
      </div>
    </section>
  );
};

export default Contact;
