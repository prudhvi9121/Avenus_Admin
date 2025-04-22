import { motion } from 'framer-motion';

const AboutSection = () => {
   return (
    <section id="about" className="min-h-screen relative overflow-hidden">
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: 'url("/Vector.svg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <div className="px-6 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="aspect-video w-full rounded-xl overflow-hidden shadow-xl"
          >
            <iframe
              src="https://www.youtube.com/embed/VSK6Ohk0lAM"
              title="Educational Video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </motion.div>
          
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-left"
            >
              <h2 className="text-2xl md:text-2xl font-bold bg-gradient-to-r from-[#e32020] via-[#f18721] via-[#00833e] to-[#6cb33f] bg-clip-text text-transparent mb-2">
              WHO WE ARE AND WHAT WE DO 
              </h2>
              <h2 className="text-4xl md:text-4xl font-bold  bg-gradient-to-r from-[#e32020]  via-[#00833e] to-[#6cb33f] bg-clip-text text-transparent  mb-6">
              Passionate & Professional educators
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
              We are a team of dedicated research scholars and educators deeply passionate about unlocking the potential in every child through innovative, high-quality education. Our mission is to provide economically viable education, offering enriching educational experiences that prepare children to lead fulfilling lives.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-left"
            >
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Where world-class faculty and talented students come together to pursue knowledge, conduct groundbreaking research, and produce transformative scholarly work to help create a better world.
              </p>
              <motion.a
                href="#history"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-2 text-[#e32020] hover:text-[#f18721] transition-colors duration-300"
              >
                <span className="text-lg font-medium">Learn more about our history</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </motion.a>
            </motion.div>
          </div> 
        </div> 
      <div className="col-span-2 mt-12 border-b border-black-300"></div>
      </div>
    </section>
  );
};

export default AboutSection;