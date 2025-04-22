import { motion } from 'framer-motion';

const LoadingAnimation = () => {
  const letters = ['A', 'V', 'E', 'N', 'U', 'E', 'S'];
  const colors = [
    '#e32020', // Red for A
    '#f18721', // Orange for V
    '#00833e', // Green for E
    '#6cb33f', // Light Green for N
    '#4195d1', // Light Blue for U
    '#406ab4', // Blue for E
    '#4195d1', // Light Blue for S
  ];

  const containerVariants = {
    hidden: { opacity: 0, gap: '1rem', scale: 1 },
    visible: {
      opacity: 1,
      gap: 0,
      scale: 0.95,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
        gap: { delay: 0.8, duration: 0.2 },
        scale: { delay: 0.8, duration: 0.3 }
      },
    },
  };

  const letterVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.5 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 12,
        mass: 0.8,
        bounce: 0.6,
        duration: 0.4
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20,
        mass: 0.8,
        delay: 0.6,
        duration: 0.5
      },
    },
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-[1000]">
      <div className="flex flex-col items-center space-y-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-4"
        >
          {letters.map((letter, index) => (
            <div key={index} className="flex items-center">
              <motion.div
                variants={letterVariants}
                className="w-16 h-16 flex items-center justify-center text-3xl font-bold text-white"
                style={{ backgroundColor: colors[index] }}
              >
                {letter}
              </motion.div>
            </div>
          ))}
        </motion.div>
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-gray-600 text-xl font-semibold"
        >
          THE GLOBAL SCHOOL
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingAnimation;