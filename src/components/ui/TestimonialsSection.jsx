import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Parent',
    content:
      'The school has provided an excellent learning environment for my child. The teachers are dedicated and the facilities are top-notch.',
    avatar:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="%234195d1"/><text x="50" y="50" font-family="Arial" font-size="40" fill="white" text-anchor="middle" dy=".3em">SJ</text></svg>',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Student',
    content:
      'I love the interactive learning approach and the various extracurricular activities. It has helped me develop both academically and personally.',
    avatar:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="%23406ab4"/><text x="50" y="50" font-family="Arial" font-size="40" fill="white" text-anchor="middle" dy=".3em">MC</text></svg>',
  },
  {
    id: 3,
    name: 'Emily Davis',
    role: 'Teacher',
    content:
      'The school provides excellent resources and support for teachers. We can focus on delivering quality education to our students.',
    avatar:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="%234195d1"/><text x="50" y="50" font-family="Arial" font-size="40" fill="white" text-anchor="middle" dy=".3em">ED</text></svg>',
  },
];

const TestimonialCard = ({ testimonial }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white p-6 rounded-xl shadow-lg relative"
    >
      {/* Optional background pattern - comment this out if Vector2.svg doesn't exist */}
      {/* <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: 'url("/Vector2.svg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      /> */}
      <div className="relative z-10">
        <div className="flex items-center mb-4">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h4 className="text-lg font-semibold text-gray-900">{testimonial.name}</h4>
            <p className="text-sm text-gray-500">{testimonial.role}</p>
          </div>
        </div>
        <p className="text-gray-600 italic">{testimonial.content}</p>
      </div>
    </motion.div>
  );
};

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-12 relative">
      <div className="px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text mb-4">
            What People Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from our community of students, parents, and teachers.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 gap-8"
            >
              <TestimonialCard testimonial={testimonials[currentIndex]} />
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-gradient-to-r from-green-500 to-blue-500'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;