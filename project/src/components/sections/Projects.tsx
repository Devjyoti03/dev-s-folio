import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Code, Layout, Zap, ChevronDown, Eye } from 'lucide-react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { ParticleBackground } from '../ui/ParticleBackground';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  links: {
    demo?: string;
    code?: string;
  };
}

const projects: Project[] = [
    {
    id: 1,
    title: "Oswald",
    description: "Oswald improves security and efficiency for developers, making Web3 integrations into DevOps workflows easier.",
    image: "https://miro.medium.com/v2/resize:fit:1200/1*_Xb5C8RrE1dfTWhROrTcQg.jpeg",
    tags: ["React", "Solidity", "Slither", "DevOps", "AI"],
    links: {
      demo: "https://devfolio.co/projects/oswald-d79a",
      code: "https://github.com/Devjyoti03/Oswald"
    }
  },
    {
    id: 2,
    title: "BlockMorph",
    description: "Turn Web2 apps into Web3 with guided onboarding, wallet auth, and smart contract generation.",
    image: "https://moralis.io/wp-content/uploads/2022/07/2022_07_web2_to_web3_bridging_web2_and_web3-2.jpeg",
    tags: ["React", "Web3", "Solidity", "AI", "Hardhat"],
    links: {
      demo: "https://devfolio.co/projects/blockmorph-1b3b",
      code: "https://github.com/Snedit/blockmorph"
    }
  },
  {
    id: 3,
    title: "Jarvis.ai",
    description: "AI-based desktop assistant like Iron Man's Jarvis using Python and Tkinter.",
    image: "https://repository-images.githubusercontent.com/367071568/a0833ac3-dfd7-4386-951f-b59e0caa8c96",
    tags: ["Python", "Tkinter", "Speech Recognition", "Pandas", "Web Scraping"],
    links: {
      demo: "https://devfolio.co/projects/jarvisai-b97c",
      code: "https://github.com/ArgyPorgy/jarvis.ai"
    }
  },
    {
    id: 4,
    title: "TecHETC25 Website",
    description: "Official website for HETC's tech fest with dynamic sections and mobile-first design.",
    image: "https://i.ytimg.com/vi/Zu5byEMTVbc/maxresdefault.jpg",
    tags: ["React", "MUI", "TailwindCSS", "TypeScript", "Design"],
    links: {
      demo: "https://www.hetc.ac.in/TECHetc2K25",
      code: "https://github.com/debjitmitra000/tecHETC25"
    }
  },
    {
    id: 5,
    title: "Stock Market Analyzer",
    description: "ML-based analyzer to predict trends using historical stock data and indicators.",
    image: "https://cdn.mos.cms.futurecdn.net/bfx3YMfJ3nojGCcXv2JgqJ-1200-80.jpg",
    tags: ["Python", "Streamlit", "Scikit-learn", "Matplotlib", "NumPy"],
    links: {
      demo: "https://github.com/Devjyoti03/Stock-Market-Analyzer",
      code: "https://github.com/Devjyoti03/Stock-Market-Analyzer"
    }
  },
    {
    id: 6,
    title: "EstateHub",
    description: "Real estate platform with listing, booking, and property dashboard functionality.",
    image: "https://wallpapercave.com/wp/wp4110685.jpg",
    tags: ["MERN", "Prisma", "Cloudinary", "TailwindCSS", "Design"],
    links: {
      demo: "https://github.com/Devjyoti03/estate_mern",
      code: "https://github.com/Devjyoti03/estate_mern"
    }
  },
    {
    id: 7,
    title: "LegalTech Alchemy",
    description: "Smart contract builder for legal docs aimed at startups and DAOs. Decentralized and easy to use.",
    image: "https://moralis.io/wp-content/uploads/2022/12/user-and-blockchain-storage-company.png",
    tags: ["HTML5", "JavaScript", "Python-Flask", "AI", "Solidity"],
    links: {
      demo: "https://devfolio.co/projects/ltalchemy-11a5",
      code: "https://github.com/ArgyPorgy/LTAlchemy"
    }
  },
    {
    id: 8,
    title: "Phantom Hacks",
    description: "Hackathon landing page built for GDG-HETC's first Hackathon with sleek UI and countdown timer.",
    image: "https://static.vecteezy.com/system/resources/previews/001/331/268/original/happy-halloween-from-the-spooky-castle-free-vector.jpg",
    tags: ["HTML5", "TailwindCSS", "JavaScript", "GSAP", "Design"],
    links: {
      demo: "https://phantomhacks.onrender.com/",
      code: "https://github.com/GDG-HETC/Phantom-Hacks"
    }
  },
  {
    id: 9,
    title: "Crime Diesel",
    description: "Decentralized crime reporting app built during ETHIndia23 with smart contract evidence tracking.",
    image: "https://thumbs.dreamstime.com/z/police-men-security-bank-crime-stickup-policeman-caught-criminals-near-bank-building-cartoon-vector-illustration-police-179837047.jpg",
    tags: ["Solidity", "HTML5", "Push Protocol", "Polygon zkEVM", "LightHouse"],
    links: {
      demo: "https://devfolio.co/projects/crime-diesel-4e0f",
      code: "https://github.com/ArgyPorgy/ETHIndia23-Crime-DIesel"
    }
  },
  {
    id: 10,
    title: "Movie Recommender",
    description: "AI-based movie recommendation engine using similarity and metadata features.",
    image: "https://user-images.githubusercontent.com/80545634/252039752-ef3a8152-7b02-46ab-bba2-8221eefc9ef7.png",
    tags: ["Python", "Pandas", "Flask", "Scikit-learn", "Streamlit"],
    links: {
      demo: "https://github.com/Devjyoti03/Movie_Recommendor",
      code: "https://github.com/Devjyoti03/Movie_Recommendor"
    }
  },
  //   {
  //   id: 11,
  //   title: "Meet App",
  //   description: "Basic meeting scheduling app with user and event management capabilities.",
  //   image: "https://i.gadgets360cdn.com/large/iStock-1213470242-1200-1588586597057.jpg",
  //   tags: ["React", "Node.js", "MongoDB"],
  //   links: {
  //     demo: "https://github.com/Devjyoti03/meet_app",
  //     code: "https://github.com/Devjyoti03/meet_app"
  //   }
  // },
  {
    id: 11,
    title: "Dash",
    description: "Designing a website for a startup providing Marketing, Development and Security Services for both Web2 and Web3 company.",
    image: "https://brandlume.com/wp-content/uploads/2022/10/cyber-security-concept-login-user-identification-information-security-encryption-secure-internet-access-cybersecurity-secure-access-users-personal-information.jpg",
    tags: ["Figma", "React.js", "Design", "Framer"],
    links: {
      demo: "https://dash-hq.vercel.app",
      code: "https://github.com/Devjyoti03/dash"
    }
  },
      {
    id: 12,
    title: "BookMyShow Clone",
    description: "Frontend and backend clone of BookMyShow with booking logic and movie listings.",
    image: "https://inc42.com/wp-content/uploads/2023/03/BookMyShow-FY22_1200.jpg",
    tags: ["React", "Flask", "Bootstrap", "MongoDB", 'Design'],
    links: {
      demo: "https://bookourshow.onrender.com",
      code: "https://github.com/Devjyoti03/BookMyShow"
    }
  },
];

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => (
  <div 
    className="group relative overflow-hidden rounded-xl hover-effect cursor-pointer transition-all duration-500 glass-card"
    onClick={() => onClick(project)}
  >
    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent opacity-60 group-hover:opacity-80 transition-opacity z-10"></div>
    
    <img 
      src={project.image} 
      alt={project.title} 
      className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
    />
    
    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
      <h3 className="text-xl font-bold mb-2 group-hover:text-violet-400 transition-colors">
        {project.title}
      </h3>
      
      <div className="flex flex-wrap gap-2 mb-3">
        {project.tags.slice(0, 3).map((tag, index) => (
          <span 
            key={index}
            className="text-xs px-2 py-1 rounded-full bg-slate-800/80 text-slate-300"
          >
            {tag}
          </span>
        ))}
        {project.tags.length > 3 && (
          <span className="text-xs px-2 py-1 rounded-full bg-slate-800/80 text-slate-300">
            +{project.tags.length - 3} more
          </span>
        )}
      </div>
      
      <p className="text-slate-300 mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {project.description}
      </p>
      
      <div className="flex gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        {project.links.demo && (
          <a 
            href={project.links.demo} 
            className="text-white bg-violet-600/80 hover:bg-violet-600 rounded-full p-2 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={16} />
            <span className="sr-only">View Demo</span>
          </a>
        )}
        {project.links.code && (
          <a 
            href={project.links.code} 
            className="text-white bg-slate-700/80 hover:bg-slate-700 rounded-full p-2 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Github size={16} />
            <span className="sr-only">View Code</span>
          </a>
        )}
      </div>
    </div>
  </div>
);

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
      onClick={onClose}
    >
      <div 
        className="glass-card rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/50"
        onClick={(e) => e.stopPropagation()}
      >
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-72 object-cover"
        />
        
        <div className="p-6 sm:p-8">
          <h3 className="text-2xl font-bold mb-2 text-white">{project.title}</h3>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, index) => (
              <span 
                key={index}
                className="text-xs px-2 py-1 rounded-full bg-slate-700 text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <p className="text-slate-300 mb-8">
            {project.description}
          </p>
          
          <div className="flex gap-3">
            {project.links.demo && (
              <Button variant="primary" icon={<ExternalLink size={16} />}>
                <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                  View Live Demo
                </a>
              </Button>
            )}
            {project.links.code && (
              <Button variant="outline" icon={<Github size={16} />}>
                <a href={project.links.code} target="_blank" rel="noopener noreferrer">
                  View Source Code
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [showAllProjects, setShowAllProjects] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'web') return project.tags.some(tag => 
      ['React', 'Next.js', 'JavaScript', 'HTML5', 'CSS', 'TaiwindCSS'].includes(tag)
    );
    // if (activeFilter === 'mobile') return project.tags.some(tag => 
    //   ['React Native', 'Flutter', 'Swift', 'Kotlin'].includes(tag)
    // );
    // <Button 
    //         variant={activeFilter === 'mobile' ? 'primary' : 'ghost'} 
    //         size="sm"
    //         onClick={() => {
    //           setActiveFilter('mobile');
    //           setShowAllProjects(false);
    //         }}
    //       >
    //         Mobile Apps
    //       </Button>
    if (activeFilter === 'design') return project.tags.some(tag => 
      ['UI/UX', 'Figma', 'Design', 'Photoshop'].includes(tag)
    );
    if (activeFilter === 'web3') return project.tags.some(tag => 
      ['Solidity'].includes(tag)
    );
    if (activeFilter === 'ai') return project.tags.some(tag => 
      ['Pandas', 'AI', 'NumPy', 'Scikit-learn'].includes(tag)
    );
    return true;
  });
  
  // Determine which projects to show based on device and state
  const projectsToShow = () => {
    if (!isMobile) {
      return filteredProjects; // Show all projects on desktop
    }
    
    if (showAllProjects) {
      return filteredProjects; // Show all projects when "View More" is clicked
    }
    
    return filteredProjects.slice(0, 4); // Show only first 4 on mobile
  };
  
  const shouldShowViewMore = isMobile && !showAllProjects && filteredProjects.length > 4;
  
  return (
    <div className="py-15 relative overflow-hidden">
      <ParticleBackground 
        particleCount={12}
        particleColor="#6366F1"
        particleSize={3}
        speed={0.8}
        opacity={0.2}
      />
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 -left-20 w-60 h-60 rounded-full bg-indigo-600/10 blur-3xl"></div>
        <div className="absolute bottom-40 -right-20 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl"></div>
      </div>
      
      <Section id="projects" className="relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-title">My Projects</h2>
          <p className="section-description mx-auto">
            A showcase of my best work across various technologies and domains.
          </p>
        </div>
        
        {/* Featured project categories */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          <Button 
            variant={activeFilter === 'all' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => {
              setActiveFilter('all');
              setShowAllProjects(false); // Reset view more when filter changes
            }}
          >
            All Projects
          </Button>
          <Button 
            variant={activeFilter === 'web' ? 'primary' : 'ghost'} 
            size="sm"
            onClick={() => {
              setActiveFilter('web');
              setShowAllProjects(false);
            }}
          >
            Web Development
          </Button>
          
          <Button 
            variant={activeFilter === 'design' ? 'primary' : 'ghost'} 
            size="sm"
            onClick={() => {
              setActiveFilter('design');
              setShowAllProjects(false);
            }}
          >
            UI/UX Design
          </Button>
          <Button 
            variant={activeFilter === 'web3' ? 'primary' : 'ghost'} 
            size="sm"
            onClick={() => {
              setActiveFilter('web3');
              setShowAllProjects(false);
            }}
          >
            Blockchain / Web3
          </Button>
          <Button 
            variant={activeFilter === 'ai' ? 'primary' : 'ghost'} 
            size="sm"
            onClick={() => {
              setActiveFilter('ai');
              setShowAllProjects(false);
            }}
          >
            AI-ML / Data Analytics
          </Button>
        </div>
        
        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {projectsToShow().map((project) => (
            <ProjectCard 
              key={project.id}
              project={project}
              onClick={setSelectedProject}
            />
          ))}
        </div>
        
        {/* View More Projects Button - Only shown on mobile */}
        {shouldShowViewMore && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAllProjects(true)}
              className="group relative overflow-hidden rounded-full px-8 py-4 bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-md border border-slate-600/50 hover:border-violet-400/50 transition-all duration-500 hover:shadow-lg hover:shadow-violet-400/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center gap-3 text-white group-hover:text-violet-300 transition-colors">
                <Eye size={20} />
                <span className="font-medium">View More Projects</span>
                <ChevronDown 
                  size={20} 
                  className="transition-transform duration-300 group-hover:translate-y-1"
                />
              </div>
              
              {/* Subtle glow effect */}
              <div className="absolute -inset-px rounded-full bg-gradient-to-r from-violet-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            </button>
          </div>
        )}
        
        {/* Show fewer projects button - Only shown on mobile when all projects are visible */}
        {isMobile && showAllProjects && filteredProjects.length > 4 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAllProjects(false)}
              className="group relative overflow-hidden rounded-full px-6 py-3 bg-gradient-to-r from-slate-700/60 to-slate-600/60 backdrop-blur-md border border-slate-500/40 hover:border-slate-400/60 transition-all duration-300"
            >
              <div className="relative flex items-center gap-2 text-slate-300 group-hover:text-white transition-colors text-sm">
                <ChevronDown 
                  size={16} 
                  className="rotate-180 transition-transform duration-300 group-hover:-translate-y-0.5"
                />
                <span>Show Less</span>
              </div>
            </button>
          </div>
        )}
        
        {/* <ProjectModal
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        /> */}
      </Section>
    </div>
  );
};