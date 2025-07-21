import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink } from '../ui/NavLink';
import { motion } from 'framer-motion';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <motion.header 
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          isScrolled 
            ? 'bg-slate-900/90 backdrop-blur-md py-3 shadow-lg shadow-violet-500/10' 
            : 'bg-transparent py-5'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.a 
              href="#home" 
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 
                          flex items-center justify-center shadow-lg shadow-violet-600/20
                          group-hover:shadow-violet-600/40 transition-all duration-300"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-white font-bold text-lg">DB</span>
              </motion.div>
              <motion.span 
                className="font-bold text-xl bg-clip-text text-transparent 
                           bg-gradient-to-r from-violet-500 to-blue-500
                           group-hover:from-violet-400 group-hover:to-blue-400
                           transition-all duration-300"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                Dev's Folio
              </motion.span>
            </motion.a>

            {/* Desktop Navigation */}
            <motion.nav 
              className="hidden md:flex items-center space-x-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <NavLink href="#home">Home</NavLink>
              <NavLink href="#experience">Experience</NavLink>
              <NavLink href="#projects">Projects</NavLink>
              <NavLink href="#content">Content</NavLink>
              <NavLink href="#contact">Contact</NavLink>
            </motion.nav>

            {/* Mobile Menu Button */}
            <motion.button 
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full 
                       bg-slate-800 text-white hover:bg-slate-700 transition-colors"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu - Moved outside header */}
      {isMenuOpen && (
        <>
          {/* Backdrop blur */}
          <motion.div
            className="fixed inset-0 backdrop-blur-xl z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMenu}
          />
          
          {/* Mobile Menu */}
          <motion.div 
            className="fixed inset-y-0 right-0 w-80 bg-slate-900 backdrop-blur-md z-50 md:hidden border-l border-slate-700 shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Close button */}
            <div className="flex justify-end p-5">
              <motion.button
                onClick={toggleMenu}
                className="w-10 h-10 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={20} />
              </motion.button>
            </div>
            <div className="flex flex-col h-full pt-8 px-8">
              <motion.nav 
                className="flex flex-col space-y-8 text-xl"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <a href="#home" onClick={toggleMenu} className="relative font-medium text-slate-300 hover:text-white transition-colors duration-300 group">
                  Home
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                </a>
                <a href="#experience" onClick={toggleMenu} className="relative font-medium text-slate-300 hover:text-white transition-colors duration-300 group">
                  Experience
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                </a>
                <a href="#projects" onClick={toggleMenu} className="relative font-medium text-slate-300 hover:text-white transition-colors duration-300 group">
                  Projects
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                </a>
                <a href="#content" onClick={toggleMenu} className="relative font-medium text-slate-300 hover:text-white transition-colors duration-300 group">
                  Content
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                </a>
                <a href="#contact" onClick={toggleMenu} className="relative font-medium text-slate-300 hover:text-white transition-colors duration-300 group">
                  Contact
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              </motion.nav>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
};