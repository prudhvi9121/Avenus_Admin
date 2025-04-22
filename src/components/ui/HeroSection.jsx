import { useState, useEffect, memo } from 'react';
import GlanceSection from './GlanceSection';

// Memoized to prevent unnecessary re-renders
const HeroSection = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    {
      quote: "Education is not preparation for life; education is life itself.",
      image: "/stock_pics/pexels-emily-ranquist-493228-1205651.jpg"
    },
    {
      quote: "The beautiful thing about learning is that no one can take it away from you.",
      image: "/stock_pics/pexels-goumbik-296301.jpg"
    },
    {
      quote: "Knowledge is power. Information is liberating. Education is the premise of progress.",
      image: "/stock_pics/pexels-rebecca-zaal-252062-764681.jpg"
    }
  ];

  const handlePrevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  // Increase interval time to reduce unnecessary updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section id="home" className="relative w-full pt-[80px] overflow-hidden">
      <div className="w-full flex items-center justify-center">
        <div className="relative w-full h-[650px] overflow-hidden group">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-[#4195d1]/80 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <button
            onClick={handleNextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-[#4195d1]/80 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Image Carousel - Simplified */}
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
                currentIndex === index ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ pointerEvents: currentIndex === index ? 'auto' : 'none' }}
            >
              <img
                src={slide.image}
                alt={`Educational slide ${index + 1}`}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 flex items-center justify-center p-8 bg-black/40">
                <p className="text-4xl md:text-5xl font-medium text-center text-white max-w-4xl mx-auto leading-relaxed">
                  {slide.quote}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <GlanceSection />
    </section>
  );
});

export default HeroSection;