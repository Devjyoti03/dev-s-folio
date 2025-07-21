import React, { useEffect, useState } from 'react';
import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { ContentWriting } from './components/sections/ContentWriting';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';
import { CustomCursor } from './components/ui/CustomCursor';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { AnimatePresence } from './components/ui/AnimatePresence';
import { motion } from 'framer-motion';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative bg-slate-900 text-white overflow-hidden">
      <AnimatePresence>
        {loading ? (
          <motion.div 
            className="fixed inset-0 bg-slate-900 z-50 flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-4xl font-bold relative overflow-hidden">
              <motion.span 
                className="inline-block"
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                animate={{ clipPath: 'inset(0 0 0 0)' }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                Dev's Folio
              </motion.span>
              <motion.div 
                className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-violet-500 to-blue-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2, ease: "linear" }}
                style={{ transformOrigin: 'left' }}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CustomCursor />
            <ScrollProgress />
            <Header />
            <main>
              <Hero />
              <Experience />
              <Projects />
              <ContentWriting />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;