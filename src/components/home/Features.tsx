import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Code, 
  Brain, 
  Zap, 
  Shield, 
  Target,
  Users,
  Award,
  BookOpen,
  Rocket,
  Globe,
  Star
} from 'lucide-react';

const Features: React.FC = () => {
  const mainFeatures = [
    {
      icon: <Cpu size={32} />,
      title: 'Advanced 3D Simulation',
      description: 'Industry-grade physics engine with realistic robot behavior and environmental interactions.',
      color: 'blue',
      stats: '6 Robot Types'
    },
    {
      icon: <Brain size={32} />,
      title: 'AI-Powered Learning',
      description: 'Intelligent tutoring system that adapts to your learning pace and provides personalized guidance.',
      color: 'purple',
      stats: 'Smart Assistance'
    },
    {
      icon: <Code size={32} />,
      title: 'Multi-Language Support',
      description: 'Program in Python, JavaScript, or use visual blocks. Natural language programming coming soon.',
      color: 'emerald',
      stats: '3 Languages'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Active Students', icon: <Users size={24} /> },
    { number: '100+', label: 'Challenges', icon: <Award size={24} /> },
    { number: '50+', label: 'Universities', icon: <Globe size={24} /> },
    { number: '4.9★', label: 'Rating', icon: <Star size={24} /> }
  ];

  const capabilities = [
    {
      title: 'Real-time Physics',
      description: 'Accurate collision detection and realistic movement dynamics',
      icon: <Zap size={20} />
    },
    {
      title: 'Cloud Sync',
      description: 'Your progress syncs across all devices automatically',
      icon: <Shield size={20} />
    },
    {
      title: 'Collaborative Learning',
      description: 'Share projects and learn from the community',
      icon: <Users size={20} />
    },
    {
      title: 'Industry Standards',
      description: 'Learn with tools used by professional roboticists',
      icon: <Target size={20} />
    }
  ];

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            <Rocket size={16} className="mr-2" />
            <span>Powerful Features</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white leading-tight">
            Everything you need to
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              master robotics
            </span>
          </h2>
          
          <p className="text-xl text-slate-300 leading-relaxed">
            Our comprehensive platform provides all the tools and resources 
            necessary to become proficient in robotics programming.
          </p>
        </motion.div>
        
        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-800/50 hover:border-slate-700/50 transition-all duration-500 group-hover:-translate-y-2 h-full">
                {/* Icon */}
                <div className={`bg-${feature.color}-500/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 text-${feature.color}-400 border border-${feature.color}-500/20 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                
                {/* Stats badge */}
                <div className={`inline-flex items-center px-3 py-1 rounded-full bg-${feature.color}-500/10 text-${feature.color}-400 text-xs font-medium mb-4 border border-${feature.color}-500/20`}>
                  {feature.stats}
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-white transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="bg-slate-800/30 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-400 border border-slate-700/50 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-slate-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Capabilities Grid */}
        <motion.div
          className="bg-slate-900/30 backdrop-blur-xl rounded-3xl border border-slate-800/50 p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Built for Performance & Scale
            </h3>
            <p className="text-slate-300 text-lg">
              Enterprise-grade infrastructure trusted by educators worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {capabilities.map((capability, index) => (
              <motion.div
                key={capability.title}
                className="text-center group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="bg-slate-800/50 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 text-blue-400 border border-slate-700/50 group-hover:scale-110 transition-transform duration-300">
                  {capability.icon}
                </div>
                <h4 className="font-semibold text-white mb-2">{capability.title}</h4>
                <p className="text-sm text-slate-400">{capability.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;