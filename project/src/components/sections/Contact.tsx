import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Section } from '../ui/Section';
import { motion } from 'framer-motion';
import { ParticleBackground } from '../ui/ParticleBackground';
import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});

  // EmailJS configuration - Replace these with your actual values
  const EMAILJS_SERVICE_ID = 'service_tz24x6e';
  const EMAILJS_TEMPLATE_ID = 'template_3zhmg2s';
  const EMAILJS_PUBLIC_KEY = '5bO2kXEeBq75_c7hC';
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (formErrors[name as keyof FormData]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Clear submit error when user makes changes
    if (submitError) {
      setSubmitError(null);
    }
  };
  
  const validateForm = (): boolean => {
    const errors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(null);

    // EmailJS template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_name: 'Devjyoti', // Your name
    };

    emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    )
    .then((response) => {
      console.log('Email sent successfully:', response.status, response.text);
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }, 3000);
    })
    .catch((error) => {
      console.error('Failed to send email:', error);
      setIsSubmitting(false);
      setSubmitError('Failed to send message. Please try again or contact me directly via email.');
    });
  };

  const handleDownloadResume = () => {
    // Create a dummy PDF download
    const link = document.createElement('a');
    link.href = '#'; // Replace with actual resume URL
    link.download = 'resume.pdf';
    link.click();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <div className="bg-slate-950 py-18 relative overflow-hidden">
      <ParticleBackground 
        particleCount={14}
        particleColor="#EC4899"
        particleSize={2.8}
        speed={0.9}
        opacity={0.2}
      />
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 -right-20 w-72 h-72 rounded-full bg-violet-900/10 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 -left-20 w-64 h-64 rounded-full bg-blue-900/10 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Solo Leveling character silhouette */}
        <motion.div 
          className="absolute top-1/2 right-10 transform -translate-y-1/2 opacity-5"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 0.05, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <img 
            src="https://images.pexels.com/photos/8721342/pexels-photo-8721342.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&dpr=2" 
            alt="Character silhouette" 
            className="w-64 h-96 object-cover opacity-20 filter grayscale"
          />
        </motion.div>
      </div>
      
      <Section id="contact" className="relative z-10">
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="section-title"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            Get In Touch
          </motion.h2>
          <motion.p 
            className="section-description mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Have a question or want to work together? Reach out using the form below.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Contact information */}
          <motion.div 
            className="flex flex-col justify-between"
            variants={itemVariants}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Contact Information</h3>
              </div>
              
              <p className="text-slate-300 mb-8">
                Feel free to contact me. I'm always open to discussing new projects and creative ideas.
              </p>
              
              <div className="space-y-6">
                <motion.div 
                  className="flex items-start gap-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="w-12 h-12 rounded-lg bg-violet-500/20 flex items-center justify-center shrink-0 border border-violet-500/30"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Mail className="text-violet-400" />
                  </motion.div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Email</h4>
                    <a href="mailto:banerjeedevjyoti7@gmail.com" className="text-slate-300 hover:text-white transition-colors">
                      banerjeedevjyoti7@gmail.com
                    </a>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start gap-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0 border border-blue-500/30"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                  >
                    <Phone className="text-blue-400" />
                  </motion.div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Phone</h4>
                    <a href="tel:+917596940680" className="text-slate-300 hover:text-white transition-colors">
                      +91 7596940680
                    </a>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start gap-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="w-12 h-12 rounded-lg bg-teal-500/20 flex items-center justify-center shrink-0 border border-teal-500/30"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <MapPin className="text-teal-400" />
                  </motion.div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Location</h4>
                    <p className="text-slate-300">
                      West Bengal, India
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Social media links */}
            <motion.div 
              className="mt-0"
              variants={itemVariants}
            >
              <h4 className="text-lg font-medium mb-4">Connect with me</h4>
              <div className="flex space-x-4">
                {[
                  { icon: "github", color: "hover:bg-violet-600" , link: "https://github.com/Devjyoti03"},
                  { icon: "linkedin", color: "hover:bg-blue-600", link: "https://linkedin.com/in/devjyoti-banerjee-31a3b1255/" },
                  { icon: "twitter", color: "hover:bg-sky-600", link: "https://x.com/Dev_Banerjee_0" }
                ].map((social, index) => (
                  <motion.a 
                    key={social.icon}
                    href={social.link} 
                    className={`w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 ${social.color} hover:text-white transition-all duration-300`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      {social.icon === "github" && (
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                      )}
                      {social.icon === "linkedin" && (
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                      )}
                      {social.icon === "twitter" && (
                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                      )}
                    </svg>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          {/* Contact form */}
          <motion.div 
            className="glass-card rounded-xl p-6 relative overflow-hidden"
            variants={itemVariants}
          >
            {/* Glowing border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-transparent to-blue-600/20 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            {isSubmitted ? (
              <motion.div 
                className="flex flex-col items-center justify-center text-center py-12"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4 border border-green-500/30"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <CheckCircle className="text-green-400" size={32} />
                </motion.div>
                <motion.h3 
                  className="text-2xl font-bold mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Message Sent!
                </motion.h3>
                <motion.p 
                  className="text-slate-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </motion.p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="relative z-10">
                {/* Error message */}
                {submitError && (
                  <motion.div 
                    className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle className="text-red-400" size={16} />
                    <p className="text-red-400 text-sm">{submitError}</p>
                  </motion.div>
                )}
                
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">
                    Your Name
                  </label>
                  <motion.input 
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-slate-700/50 border ${
                      formErrors.name ? 'border-red-500' : 'border-slate-600'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-white transition-all duration-300`}
                    placeholder="John Doe"
                    whileFocus={{ scale: 1.02 }}
                  />
                  {formErrors.name && (
                    <motion.p 
                      className="mt-1 text-sm text-red-500"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {formErrors.name}
                    </motion.p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
                    Email Address
                  </label>
                  <motion.input 
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-slate-700/50 border ${
                      formErrors.email ? 'border-red-500' : 'border-slate-600'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-white transition-all duration-300`}
                    placeholder="john@example.com"
                    whileFocus={{ scale: 1.02 }}
                  />
                  {formErrors.email && (
                    <motion.p 
                      className="mt-1 text-sm text-red-500"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {formErrors.email}
                    </motion.p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-1">
                    Subject
                  </label>
                  <motion.input 
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-slate-700/50 border ${
                      formErrors.subject ? 'border-red-500' : 'border-slate-600'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-white transition-all duration-300`}
                    placeholder="Project Inquiry"
                    whileFocus={{ scale: 1.02 }}
                  />
                  {formErrors.subject && (
                    <motion.p 
                      className="mt-1 text-sm text-red-500"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {formErrors.subject}
                    </motion.p>
                  )}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1">
                    Your Message
                  </label>
                  <motion.textarea 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full px-4 py-3 bg-slate-700/50 border ${
                      formErrors.message ? 'border-red-500' : 'border-slate-600'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-white resize-none transition-all duration-300`}
                    placeholder="Hello, I'd like to discuss a project..."
                    whileFocus={{ scale: 1.02 }}
                  />
                  {formErrors.message && (
                    <motion.p 
                      className="mt-1 text-sm text-red-500"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {formErrors.message}
                    </motion.p>
                  )}
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    type="submit"
                    variant="primary"
                    fullWidth
                    icon={<Send size={16} />}
                    className="py-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </motion.div>
              </form>
            )}
          </motion.div>
        </motion.div>
      </Section>
    </div>
  );
};