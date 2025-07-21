import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 py-0 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-violet-600 blur-3xl"></div>
        <div className="absolute top-20 right-20 w-60 h-60 rounded-full bg-blue-600 blur-3xl"></div>
      </div>

      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <a href="#home" className="flex items-center gap-2 group mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 
                            flex items-center justify-center shadow-lg shadow-violet-600/20">
                <span className="text-white font-bold text-lg">DB</span>
              </div>
              <span className="font-bold text-xl bg-clip-text text-transparent 
                             bg-gradient-to-r from-violet-500 to-blue-500">Dev's Folio</span>
            </a>
            <p className="text-slate-400 mb-6">
              Creating digital experiences with creativity and precision, innovating solutions to real life problems.
            </p>
            <div className="flex space-x-4">
              <a href="www.google.com" className="text-slate-400 hover:text-white transition-colors hover:animate-shadow-pulse p-2">
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors hover:animate-shadow-pulse p-2">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors hover:animate-shadow-pulse p-2">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="mailto:contact@example.com" className="text-slate-400 hover:text-white transition-colors hover:animate-shadow-pulse p-2">
                <Mail size={20} />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Navigation</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-slate-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#experience" className="text-slate-400 hover:text-white transition-colors">Experience</a></li>
              <li><a href="#projects" className="text-slate-400 hover:text-white transition-colors">Projects</a></li>
              <li><a href="#content" className="text-slate-400 hover:text-white transition-colors">Contents</a></li>
              <li><a href="#contact" className="text-slate-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Contact</h3>
            <ul className="space-y-2 text-slate-400">
              <li>banerjeedevjyoti7@gmail.com</li>
              <li>+91 7596940680</li>
              <li>West Bengal, India</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500">
          <p>&copy; {currentYear} Devjyoti Banerjee's PortFolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};