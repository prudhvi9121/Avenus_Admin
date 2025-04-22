import { lazy, Suspense, useState, useEffect } from 'react';
import LoadingAnimation from './LoadingAnimation';


// Keep lazy loading for code splitting
const Navbar = lazy(() => import('./Navbar'));
const HeroSection = lazy(() => import('./HeroSection'));
const EventsSection = lazy(() => import('./EventsSection'));
const TestimonialsSection = lazy(() => import('./TestimonialsSection'));
const AboutSection = lazy(() => import('./AboutSection'));
const Footer = lazy(() => import('./Footer'));

const AdmissionButton = () => {

  
  return (
    <div className="container mx-auto px-4 text-center">
      <button className="bg-[#4195d1] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#3784c0] transition-all duration-300">
        Apply for Admission
      </button>
    </div>
  );
};

function PublicView() {
  const [isLoading, setIsLoading] = useState(true);

  // Reduce loading time from 2000ms to 500ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <Suspense fallback={<LoadingAnimation />}>
          <div className="min-h-screen w-full bg-white relative overflow-y-auto flex justify-center">
            <div className="max-w-full w-full relative z-10">
              <Navbar />
              <main>
                <HeroSection />
                <EventsSection />
                <AboutSection />
                <TestimonialsSection />
                <div className="py-16 bg-gray-50">
                  <AdmissionButton />
                </div>
              </main>
              <Footer />
            </div>
          </div>
        </Suspense>
      )}
    </>
  );
}

export default PublicView;