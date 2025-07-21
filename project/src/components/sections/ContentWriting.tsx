import React from 'react';
import { Section } from '../ui/Section';
import { Twitter, ExternalLink, Heart, MessageCircle, Repeat2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { ParticleBackground } from '../ui/ParticleBackground';

interface ContentItem {
  id: number;
  type: 'twitter' | 'medium';
  title: string;
  excerpt: string;
  date: string;
  link: string;
  engagement?: {
    likes: number;
    retweets?: number;
    comments: number;
  };
}

const contentItems: ContentItem[] = [
  {
    id: 1,
    type: 'twitter',
    title: 'Review of Unhosted Wallet',
    excerpt: '🧵 Tried the latest Unhosted Chrome extension? Here’s my honest breakdown after testing it across devices, chains, and wallets....',
    date: 'June 8, 2025',
    link: 'https://x.com/Dev_Banerjee_0/status/1931586051975635201',
    engagement: {
      likes: 1200,
      retweets: 450,
      comments: 89
    }
  },
  {
    id: 2,
    type: 'twitter',
    title: 'Understanding Chain Abstraction',
    excerpt: '🧵 Tired of juggling wallets, gas fees, and complex bridges? Say hello to Chain Abstraction—the tech making Web3 simple,...',
    date: 'December 15, 2024',
    link: 'https://x.com/Dev_Banerjee_0/status/1868353380088787164',
    engagement: {
      likes: 320,
      retweets: 320,
      comments: 45
    }
  },
  {
    id: 3,
    type: 'medium',
    title: 'Beginner’s Guide to Crypto & Swipe.fun',
    excerpt: 'Cryptocurrency is no longer just a niche market for tech enthusiasts. It’s transforming industries, enabling financial independence...',
    date: 'November 26, 2024',
    link: 'https://medium.com/@banerjeedevjyoti7/a-beginners-guide-to-crypto-memecoins-and-swipe-fun-revolutionizing-the-way-we-trade-9cb5706e61f9',
    engagement: {
      likes: 890,
      comments: 67
    }
  },
  {
    id: 4,
    type: 'medium',
    title: 'Finternet: The Financial Superhighway of the Future',
    excerpt: 'Deep dive into the architecture and security considerations of modern Finternet protocols...',
    date: 'August 17, 2024',
    link: 'https://medium.com/@banerjeedevjyoti7/finternet-the-financial-superhighway-of-the-future-effe667395e8',
    engagement: {
      likes: 567,
      comments: 78
    }
  },
  {
    id: 5,
    type: 'twitter',
    title: 'DeBridge: The Internet of Liquidity',
    excerpt: '🧵 DeFi is evolving, and deBridge is leading the way with innovation, speed, and seamless liquidity. Here’s how...',
    date: 'November 27, 2024',
    link: 'https://x.com/Dev_Banerjee_0/status/1861818137609400428',
    engagement: {
      likes: 1450,
      retweets: 680,
      comments: 123
    }
  },
  {
    id: 6,
    type: 'twitter',
    title: 'CoinEx turns 7',
    excerpt: '🧵 From humble beginnings to global impact, Coinex has redefined what it means to trade crypto...',
    date: 'November 30, 2024',
    link: 'https://x.com/Dev_Banerjee_0/status/1862904241141993630',
    engagement: {
      likes: 445,
      retweets: 400,
      comments: 56
    }
  }
];

const ContentCard: React.FC<{ item: ContentItem; index: number }> = ({ item, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }
    }
  };

  const hoverVariants = {
    hover: {
      y: -10,
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
      className="relative group"
    >
      <motion.div 
        variants={hoverVariants}
        className="glass-card rounded-xl p-6 hover:border-violet-500/50 transition-all duration-500 relative overflow-hidden"
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 via-transparent to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Glowing orb effect */}
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-violet-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div 
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  item.type === 'twitter' 
                    ? 'bg-sky-500/20 border border-sky-500/30' 
                    : 'bg-green-500/20 border border-green-500/30'
                }`}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                {item.type === 'twitter' ? (
                  <Twitter className="text-sky-400" size={20} />
                ) : (
                  <span className="text-green-400 font-bold text-lg">M</span>
                )}
              </motion.div>
              <div>
                <motion.h3 
                  className="font-bold text-lg group-hover:text-violet-400 transition-colors duration-300"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                >
                  {item.title}
                </motion.h3>
                <p className="text-sm text-slate-400">{item.date}</p>
              </div>
            </div>
            {/* <motion.a 
              href={item.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-slate-700/50"
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              <ExternalLink size={18} />
            </motion.a> */}
          </div>
          
          <motion.p 
            className="text-slate-300 mb-6 leading-relaxed"
            initial={{ opacity: 0.9 }}
            whileHover={{ opacity: 1 }}
          >
            {item.excerpt}
          </motion.p>
          
          {/* {item.engagement && (
            <motion.div 
              className="flex gap-6 text-sm text-slate-400 mb-4"
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
            >
              <motion.div 
                className="flex items-center gap-1 hover:text-red-400 transition-colors cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <Heart size={16} />
                <span>{item.engagement.likes.toLocaleString()}</span>
              </motion.div>
              {item.type === 'twitter' && item.engagement.retweets && (
                <motion.div 
                  className="flex items-center gap-1 hover:text-green-400 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  <Repeat2 size={16} />
                  <span>{item.engagement.retweets.toLocaleString()}</span>
                </motion.div>
              )}
              <motion.div 
                className="flex items-center gap-1 hover:text-blue-400 transition-colors cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <MessageCircle size={16} />
                <span>{item.engagement.comments}</span>
              </motion.div>
            </motion.div>
          )} */}
          
          <div className="pt-4 border-t border-slate-700/50">
            <motion.a 
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-2 font-medium"
              whileHover={{ x: 5 }}
            >
              Read full {item.type === 'twitter' ? 'thread' : 'article'}
              <ExternalLink size={16} />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const ContentWriting: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="py-15 relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950">
      <ParticleBackground 
        particleCount={8}
        particleColor="#06B6D4"
        particleSize={2.5}
        speed={0.7}
        opacity={0.18}
      />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-40 -left-20 w-72 h-72 rounded-full bg-violet-900/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-40 -right-20 w-96 h-96 rounded-full bg-blue-900/10 blur-3xl"
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
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-violet-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      <Section id="content" className="relative z-10">
        <motion.div 
          className="text-center mb-16"
          variants={titleVariants}
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
            Content Writing
          </motion.h2>
          <motion.p 
            className="section-description mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Contributing to <span className="text-violet-400 font-semibold">Web3 & Blockchain technologies</span> through engaging Twitter threads and in-depth Medium articles.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {contentItems.map((item, index) => (
            <ContentCard key={item.id} item={item} index={index} />
          ))}
        </motion.div>
        
        {/* Call to action */}
        <motion.div 
          className="text-center mt-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-4 bg-slate-800/50 backdrop-blur-sm rounded-full px-6 py-3 border border-violet-500/30"
            whileHover={{ scale: 1.05, borderColor: 'rgba(139, 92, 246, 0.6)' }}
          >
            <span className="text-slate-300">Follow my journey on</span>
            <motion.a 
              href="https://x.com/Dev_Banerjee_0" 
              className="text-sky-400 hover:text-sky-300 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <Twitter size={20} />
            </motion.a>
            <span className="text-slate-400">and</span>
            <motion.a 
              href="https://medium.com/@banerjeedevjyoti7" 
              className="text-green-400 hover:text-green-300 transition-colors font-bold"
              whileHover={{ scale: 1.1 }}
            >
              Medium
            </motion.a>
          </motion.div>
        </motion.div>
      </Section>
    </div>
  );
};