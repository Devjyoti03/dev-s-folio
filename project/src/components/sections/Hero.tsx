import React, { useEffect, useRef } from 'react';
import { ArrowDown, Code, Layout, Zap } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { Section } from '../ui/Section';
import myImage from '../../assets/dev.webp';

export const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const setCanvasDimensions = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Enhanced bouncing particle system
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
      pulse: number;
      pulseSpeed: number;
    }> = [];
    
    const createParticles = () => {
      const particleCount = Math.floor(window.innerWidth / 12);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 4 + 2,
          speedX: (Math.random() - 0.5) * 3,
          speedY: (Math.random() - 0.5) * 3,
          opacity: Math.random() * 0.8 + 0.2,
          color: ['#4F46E5', '#6366F1', '#818CF8', '#A78BFA'][Math.floor(Math.random() * 4)],
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.02,
        });
      }
    };
    
    createParticles();
    
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    let mouseRadius = 120;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      
      // Create burst effect on mouse move
      if (Math.random() > 0.7) {
        for (let i = 0; i < 2; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 3 + 2;
          particles.push({
            x: mouseX,
            y: mouseY,
            radius: Math.random() * 3 + 1,
            speedX: Math.cos(angle) * speed,
            speedY: Math.sin(angle) * speed,
            opacity: 1,
            color: '#4F46E5',
            pulse: Math.random() * Math.PI,
            pulseSpeed: 0.05,
          });
        }
      }
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    
    const animate = () => {
      // Clear canvas completely without trails
      ctx.fillStyle = 'rgb(15, 23, 42)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.pulse += particle.pulseSpeed;
        
        // Bounce off walls
        if (particle.x <= particle.radius || particle.x >= canvas.width - particle.radius) {
          particle.speedX *= -0.8;
          particle.x = Math.max(particle.radius, Math.min(canvas.width - particle.radius, particle.x));
        }
        if (particle.y <= particle.radius || particle.y >= canvas.height - particle.radius) {
          particle.speedY *= -0.8;
          particle.y = Math.max(particle.radius, Math.min(canvas.height - particle.radius, particle.y));
        }
        
        // Mouse interaction
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseRadius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouseRadius - distance) / mouseRadius;
          
          particle.speedX -= Math.cos(angle) * force * 0.3;
          particle.speedY -= Math.sin(angle) * force * 0.3;
        }
        
        // Apply friction
        particle.speedX *= 0.99;
        particle.speedY *= 0.99;
        
        // Minimum speed to keep particles moving
        if (Math.abs(particle.speedX) < 0.1) particle.speedX += (Math.random() - 0.5) * 0.2;
        if (Math.abs(particle.speedY) < 0.1) particle.speedY += (Math.random() - 0.5) * 0.2;
        
        // Fade out burst particles
        if (particle.opacity > 0.8) {
          particle.opacity *= 0.98;
        }
        
        // Draw particle
        const size = particle.radius * (1 + Math.sin(particle.pulse) * 0.3);
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        ctx.closePath();
        
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, size
        );
        gradient.addColorStop(0, `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${particle.color}00`);
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Add glow effect
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // Remove faded particles
        if (particle.opacity < 0.01) {
          particles.splice(index, 1);
        }
      });
      
      // Maintain minimum particle count
      if (particles.length < Math.floor(window.innerWidth / 15)) {
        for (let i = 0; i < 5; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 2,
            speedY: (Math.random() - 0.5) * 2,
            opacity: Math.random() * 0.6 + 0.2,
            color: ['#4F46E5', '#6366F1', '#818CF8', '#A78BFA'][Math.floor(Math.random() * 4)],
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: 0.02 + Math.random() * 0.02,
          });
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const glowVariants = {
    initial: { scale: 1, opacity: 0.5 },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 0.8, 0.5],
      filter: [
        'drop-shadow(0 0 20px #4F46E5)',
        'drop-shadow(0 0 40px #4F46E5)',
        'drop-shadow(0 0 20px #4F46E5)'
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <Section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full z-0"
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0
        }}
      />
      
      {/* Animated background overlay */}
      <motion.div 
        className="absolute inset-0 overflow-hidden z-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="absolute top-40 -left-20 w-40 h-40 rounded-full bg-indigo-600/20 blur-3xl"
          variants={glowVariants}
          initial="initial"
          animate="animate"
        />
        <motion.div 
          className="absolute bottom-40 -right-20 w-60 h-60 rounded-full bg-blue-600/20 blur-3xl"
          variants={glowVariants}
          initial="initial"
          animate="animate"
        />
      </motion.div>
      
      <motion.div 
        className="relative z-10 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Text Content */}
            <div className="lg:col-span-2">
              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6"
                variants={itemVariants}
              >
                <motion.span 
                  className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  Creative Developer
                </motion.span>
                <motion.span 
                  className="block text-white mt-2"
                  variants={itemVariants}
                >
                  Crafting Digital Experiences
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-lg sm:text-xl text-slate-300 mb-8"
                variants={itemVariants}
              >
                I'm Devjyoti Banerjee — a developer, innovator, and writer crafting meaningful digital experiences across web, AI, and Web3. Engineer by degree, creator by passion — I solve real-world problems through clean interfaces and smart tech.
              </motion.p>
              
              <motion.div 
                className="flex gap-4 mb-12"
                variants={itemVariants}
              >
                <Button variant="primary" size="lg">
                  View My Work
                </Button>
                <Button variant="outline" size="lg">
                  Get In Touch
                </Button>
              </motion.div>
            </div>

            {/* Profile Photo Section */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto">
                {/* Wobbling animated background circles */}
                <motion.div
                  className="absolute inset-0 rounded-full opacity-40"
                  style={{
                    background: 'conic-gradient(from 0deg, #4F46E5, #7C3AED, #EC4899, #4F46E5)'
                  }}
                  animate={{
                    scale: [1, 1.3, 1.1, 1.2, 1],
                    rotate: [0, 360],
                    filter: [
                      'hue-rotate(0deg)',
                      'hue-rotate(90deg)',
                      'hue-rotate(180deg)',
                      'hue-rotate(270deg)',
                      'hue-rotate(360deg)'
                    ]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute inset-2 rounded-full opacity-50"
                  style={{
                    background: 'conic-gradient(from 180deg, #06B6D4, #3B82F6, #8B5CF6, #06B6D4)'
                  }}
                  animate={{
                    scale: [1.2, 0.9, 1.3, 1, 1.2],
                    rotate: [360, 0],
                    filter: [
                      'hue-rotate(360deg)',
                      'hue-rotate(270deg)',
                      'hue-rotate(180deg)',
                      'hue-rotate(90deg)',
                      'hue-rotate(0deg)'
                    ]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                {/* Profile image */}
                <img
                  src={myImage}
                  alt="Profile"
                  className="absolute inset-2 rounded-full object-cover z-10 border-4 border-slate-900"
                />
              </div>
            </motion.div>
          </div>
          
          {/* Feature Cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16"
            variants={containerVariants}
          >
            {[
              {
                icon: <Code className="text-indigo-400" />,
                title: "Innovative Coding",
                description: "Built smart apps with AI-driven features and blockchain-based authentication & storage."
              },
              {
                icon: <Layout className="text-blue-400" />,
                title: "Responsive Design",
                description: "Pixel-perfect interfaces with modular, maintainable code using best practices, ensuring long-term scalability."
              },
              {
                icon: <Zap className="text-purple-400" />,
                title: "Performance",
                description: "Experienced with Git, CI/CD, and agile workflows in real-world multi-dev projects."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="glass-card p-4 rounded-xl hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 group"
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  zIndex: 1,
                  transition: { type: "spring", stiffness: 300 }
                }}
                style={{
                  transform: `translateY(${index * 8}px)`
                }}
              >
                <motion.div 
                  className="w-10 h-10 rounded-lg bg-indigo-500/20 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:bg-indigo-500/30 transition-colors border border-indigo-500/30"
                  whileHover={{ rotate: 360 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-lg font-bold mb-1">{feature.title}</h3>
                <p className="text-sm text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute -bottom-10 left-1/2 transform -translate-x-1/2"
          style={{ zIndex: 20 }}
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <a href="#experience" className="text-slate-400 hover:text-white transition-colors">
            <ArrowDown size={24} />
            <span className="sr-only">Scroll down</span>
          </a>
        </motion.div>
      </motion.div>
    </Section>
  );
};