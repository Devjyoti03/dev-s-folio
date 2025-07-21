import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import { Section } from '../ui/Section';
import { ParticleBackground } from '../ui/ParticleBackground';

const experiences = [
  {
    title: "Full Stack Developer",
    company: "TechFloww It Solutions",
    location: "Remote",
    duration: "May 2024 - Sept 2024",
    // description: "Leading frontend development for enterprise applications using React, TypeScript, and modern web technologies.",
    achievements: [
      "Built scalable and responsive web applications with clean UI",
      "Worked with teams to fix bugs and improve app performance",
      "Integrated REST APIs and connected to backend databases"
    ]
  },
  {
    title: "Software Developer Intern",
    company: "Systemic Altruism",
    location: "Remote",
    duration: "March 2024 - May 2024",
    // description: "Developed and maintained web applications for various clients using React, Node.js, and cloud technologies.",
    achievements: [
      "Built an automated onboarding system for Solana users",
      "Reduced manual invitation tasks with smart workflow logic",
      "Improved KYC flow through testing and user feedback"
    ]
  },
  {
    title: "Frontend Developer & Content Writer",
    company: "Animetel",
    location: "Remote",
    duration: "May 2023 - May 2024",
    // description: "Created responsive web applications and collaborated with design teams to implement pixel-perfect UIs.",
    achievements: [
      "Built a responsive, mobile-first UI to enhance user engagement",
      "Wrote 15+ anime blogs with detailed character insights",
      "Contributed to content strategy and boosted SEO performance"
    ]
  }
];

export const Experience: React.FC = () => {
  return (
    <Section id="experience">
      <ParticleBackground 
        particleCount={10}
        particleColor="#8B5CF6"
        particleSize={2}
        speed={0.6}
        opacity={0.15}
      />
      
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Experience</h2>
          <p className="section-description mx-auto">
            My professional journey and key achievements.
          </p> 
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 hidden md:block"></div>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative md:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-6 top-6 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-slate-900 hidden md:block"></div>

                <div className="glass-card p-8 hover:shadow-2xl hover:shadow-violet-500/20 transition-all duration-300 rounded-xl">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                      <div className="flex items-center gap-2 text-blue-400 mb-2">
                        <ExternalLink className="w-4 h-4" />
                        <span className="font-semibold">{exp.company}</span>
                      </div>
                    </div>
                    <div className="flex flex-col md:items-end gap-2 text-slate-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* <p className="text-slate-300 mb-6 leading-relaxed">
                    {exp.description}
                  </p> */}

                  <div>
                    <h4 className="text-base font-semibold text-white mb-3">Key Achievements:</h4>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-300">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};