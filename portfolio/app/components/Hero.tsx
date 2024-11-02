import "./style.css";
const Hero = () => {
  const textGradient =
    "bg-gradient-to-br from-teal-300 via-teal-200 to-teal-700 text-transparent bg-clip-text";

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center text-white">
        <h1 className={`text-5xl font-bold ${textGradient} animate-slide-in`}>
          Hi, I'm Gabriel!{" "}
          <span className="inline-block animate-wave text-white emoji-white">
            👋
          </span>
        </h1>

        <h2 className="mt-4 text-3xl animate-fade-in">
          Welcome to my portfolio!
        </h2>
      </div>
    </div>
  );
};

export default Hero;
