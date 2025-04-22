import { motion } from 'framer-motion';
import StatsSection from './StatsSection';

const GlanceSection = () => {
  return (
    <div className="relative  bg-[#4195d1]/5 mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 10 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2  gap-8 items-start"
      >

        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: 'url("/Vector2.svg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-red-500 via-orange-500 via-green-500 via-blue-500 to-blue-600 text-transparent bg-clip-text">
            Avenues at a glance
          </h2>
        </div>
        <div>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Avenues offers a holistic approach to education, combining academic excellence, and offers specialized preschool services.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-300 group"
          >
            Learn more about our history
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </motion.button>
        </div>
        <div className="col-span-2 mt-12 border-b border-black-300"></div>
      </motion.div>
      <StatsSection />
    </div>
  );
};

export default GlanceSection;