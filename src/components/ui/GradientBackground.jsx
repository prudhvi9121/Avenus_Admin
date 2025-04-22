const GradientBackground = () => {
    return (
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="schoolGradient" gradientTransform="rotate(0)">
            <stop offset="0%" stopColor="#e32020" />
            <stop offset="25%" stopColor="#f18721" />
            <stop offset="50%" stopColor="#00833e" />
            <stop offset="70%" stopColor="#6cb33f" />
            <stop offset="85%" stopColor="#406ab4" />
            <stop offset="100%" stopColor="#4195d1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#schoolGradient)" />
      </svg>
    );
  };
  
  export default GradientBackground;
  