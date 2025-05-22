
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react'; // Using Zap as a dynamic "H" like logo element

const SplashScreen = ({ onLoaded, websiteName }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onLoaded) {
        onLoaded();
      }
    }, 3600); // Splash screen visible for 3.6s, App.jsx handles the 4s total

    return () => clearTimeout(timer);
  }, [onLoaded]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-background to-slate-800"
      aria-hidden={!isVisible}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 10,
          delay: 0.2,
          duration: 0.8,
        }}
        className="p-6 bg-gradient-to-br from-primary to-accent rounded-3xl shadow-2xl mb-8"
      >
        <Zap className="h-20 w-20 md:h-28 md:w-28 text-primary-foreground" />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-center px-4"
      >
        <span className="gradient-text">{websiteName || "HACKERPRO'S APP"}</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-4 text-lg text-muted-foreground"
      >
        Loading awesome content...
      </motion.p>
      <motion.div
        className="absolute bottom-10 w-3/4 max-w-xs h-2 bg-primary/30 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2.5, delay: 1.1, ease: 'linear' }}
        />
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
