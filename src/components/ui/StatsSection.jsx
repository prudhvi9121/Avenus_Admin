import { useRef, useState, useEffect, memo } from 'react';

const stats = [
  { label: 'Students Enrolled', value: 2500, suffix: '+', description: 'From preschool to high school' },
  { label: 'Faculty Members', value: 300, suffix: '+', description: 'Experienced educators' },
  { label: 'Student-Teacher Ratio', value: 8, suffix: ':1', description: 'Personalized attention' },
  { label: 'Campus Area', value: 16, suffix: ' acres', description: 'Modern facilities' },
];

// Memoized to prevent unnecessary re-renders
const StatsSection = memo(() => {
  const containerRef = useRef(null);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [isVisible, setIsVisible] = useState(false);

  // Use Intersection Observer for better performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  // Simplified counter animation
  useEffect(() => {
    if (!isVisible) return;
    
    stats.forEach((stat, index) => {
      const step = Math.ceil(stat.value / 30); // Reduced number of steps
      const timer = setInterval(() => {
        setCounts(prev => {
          const newCounts = [...prev];
          const newValue = Math.min(newCounts[index] + step, stat.value);
          newCounts[index] = newValue;
          
          if (newValue >= stat.value) {
            clearInterval(timer);
          }
          
          return newCounts;
        });
      }, 50);
      
      return () => clearInterval(timer);
    });
  }, [isVisible]);

  return (
    <div className="bg-gray-50 py-20">
      <div className="px-6">
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-green-500 text-transparent bg-clip-text mb-4">
                {counts[index]}{stat.suffix}
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">{stat.label}</h3>
              <p className="text-gray-600 text-lg">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default StatsSection;