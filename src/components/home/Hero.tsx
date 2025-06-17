import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Cpu, Brain, Layers, Star, Users, Award, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from '@/hooks/useNavigation';

const Hero = () => {
  const navigate = useNavigate();
  const [armPosition, setArmPosition] = useState(0);
  const [codeIndex, setCodeIndex] = useState(0);
  const [particlePositions, setParticlePositions] = useState([]);

  const codeSnippets = [
    { code: "robot.navigate(target)", status: "# Executing path planning", color: "blue" },
    { code: "arm.precision_grasp()", status: "# Object acquired", color: "green" },
    { code: "system.autonomous_mode()", status: "# AI engaged", color: "purple" },
    { code: "sensors.environmental_scan()", status: "# Data collected", color: "cyan" }
  ];

  useEffect(() => {
    // Minimal, professional particle system
    const particles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: 20 + Math.random() * 60,
      y: 20 + Math.random() * 60,
      size: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 0.1 + 0.05,
      opacity: Math.random() * 0.1 + 0.02,
      delay: Math.random() * 10
    }));
    setParticlePositions(particles);

    // Sophisticated arm animation with precise timing
    const armInterval = setInterval(() => {
      setArmPosition(prev => (prev + 1) % 4);
    }, 6000);

    // Professional code rotation
    const codeInterval = setInterval(() => {
      setCodeIndex(prev => (prev + 1) % codeSnippets.length);
    }, 5000);

    // Subtle particle movement
    const particleInterval = setInterval(() => {
      setParticlePositions(prev => 
        prev.map(particle => ({
          ...particle,
          x: (particle.x + particle.speed) % 100,
          y: particle.y + Math.sin(Date.now() * 0.0005 + particle.id) * 0.05
        }))
      );
    }, 100);

    return () => {
      clearInterval(armInterval);
      clearInterval(codeInterval);
      clearInterval(particleInterval);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-dark-900 via-dark-850 to-dark-900 overflow-hidden">
      {/* Sophisticated Background Effects */}
      <div className="absolute inset-0">
        {/* Primary gradient orbs - positioned for depth without interference */}
        <div className="absolute top-1/6 left-1/8 w-80 h-80 bg-primary-500/4 rounded-full blur-3xl animate-pulse" style={{animationDuration: '12s'}}></div>
        <div className="absolute bottom-1/5 right-1/8 w-64 h-64 bg-secondary-500/3 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s', animationDuration: '16s'}}></div>
        <div className="absolute top-2/3 left-2/3 w-48 h-48 bg-accent-500/2 rounded-full blur-2xl animate-pulse" style={{animationDelay: '8s', animationDuration: '20s'}}></div>
      </div>

      {/* Minimal grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.01)_1px,transparent_1px)] bg-[size:120px_120px] opacity-30"></div>
      
      {/* Professional floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particlePositions.map((particle) => (
          <div
            key={particle.id}
            className="absolute bg-gradient-to-r from-primary-400/50 to-secondary-400/50 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animation: `pulse ${4 + particle.id * 0.5}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}
      </div>
      
      {/* Enterprise-grade Robotic Arm */}
      <div className="absolute top-16 right-12 xl:right-20 hidden xl:block z-0">
        <motion.div 
          className="relative w-48 h-64"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {/* Professional base */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-10 bg-gradient-to-t from-dark-700 to-dark-600 rounded-lg shadow-xl border border-dark-500/50">
            <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 w-12 h-1.5 bg-gradient-to-r from-primary-500/80 to-secondary-500/80 rounded-sm"></div>
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
              <div className="w-0.5 h-0.5 bg-success-400 rounded-full animate-pulse"></div>
              <div className="w-0.5 h-0.5 bg-primary-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="w-0.5 h-0.5 bg-accent-400 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
            </div>
          </div>
          
          {/* Precision power core */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-primary-500/90 to-secondary-500/90 rounded-full shadow-lg border border-primary-400/30">
            <div className="absolute inset-2 bg-white/20 rounded-full animate-pulse" style={{animationDuration: '3s'}}></div>
          </div>
          
          {/* First arm segment - professional movement */}
          <motion.div 
            className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-4 h-24 bg-gradient-to-t from-dark-700 to-dark-600 rounded-full origin-bottom shadow-lg border border-dark-500/50"
            animate={{
              rotate: armPosition === 0 ? 0 : 
                     armPosition === 1 ? 20 : 
                     armPosition === 2 ? -15 : 10
            }}
            transition={{ duration: 4, ease: "easeInOut" }}
          >
            {/* Professional joint */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-primary-500/90 to-secondary-600/90 rounded-full shadow-lg border border-primary-400/30">
              <div className="absolute inset-1.5 bg-gradient-to-br from-secondary-400/60 to-primary-500/60 rounded-full animate-pulse" style={{animationDuration: '4s'}}></div>
            </div>
            
            {/* Second arm segment */}
            <motion.div 
              className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-4 h-24 bg-gradient-to-t from-dark-700 to-dark-600 rounded-full origin-bottom shadow-lg border border-dark-500/50"
              animate={{
                rotate: armPosition === 0 ? 0 : 
                       armPosition === 1 ? -30 : 
                       armPosition === 2 ? 25 : -10
              }}
              transition={{ duration: 4, ease: "easeInOut" }}
            >
              {/* Professional end effector */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 flex items-center">
                <motion.div 
                  className="w-3 h-5 bg-gradient-to-b from-primary-500/90 to-primary-600/90 rounded-t-sm mr-0.5 shadow-md"
                  animate={{ rotate: armPosition === 2 ? 8 : 0 }}
                  transition={{ duration: 1 }}
                />
                <motion.div 
                  className="w-3 h-5 bg-gradient-to-b from-primary-500/90 to-primary-600/90 rounded-t-sm shadow-md"
                  animate={{ rotate: armPosition === 2 ? -8 : 0 }}
                  transition={{ duration: 1 }}
                />
                
                {/* Precision sensors */}
                <div className="absolute top-1.5 left-2 w-1.5 h-1.5 bg-secondary-400/80 rounded-full animate-pulse" style={{animationDuration: '2s'}}></div>
                <div className="absolute top-3 left-1 w-0.5 h-0.5 bg-success-400 rounded-full animate-pulse"></div>
                <div className="absolute top-3 left-3 w-0.5 h-0.5 bg-error-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Professional status display */}
          <motion.div 
            className="absolute -top-4 -right-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <div className="bg-dark-800/95 backdrop-blur-sm border border-primary-400/20 rounded-lg p-3 text-xs shadow-lg min-w-[110px]">
              <div className="text-primary-400/90 font-mono font-medium mb-1.5">SYSTEM STATUS</div>
              <motion.div 
                className="font-mono font-medium mb-1.5 text-xs"
                animate={{
                  color: armPosition === 0 ? '#22c55e' :
                         armPosition === 1 ? '#3b82f6' :
                         armPosition === 2 ? '#f59e0b' : '#8b5cf6'
                }}
                transition={{ duration: 1 }}
              >
                {armPosition === 0 ? 'STANDBY' :
                 armPosition === 1 ? 'ACTIVE' :
                 armPosition === 2 ? 'ENGAGED' : 'RESET'}
              </motion.div>
              <div className="flex items-center justify-between mb-1.5">
                <motion.div 
                  className="w-1.5 h-1.5 rounded-full"
                  animate={{
                    backgroundColor: armPosition === 2 ? '#22c55e' : '#3b82f6'
                  }}
                />
                <span className="text-dark-300 text-xs font-mono">
                  {armPosition === 2 ? 'GRIP' : 'IDLE'}
                </span>
              </div>
              <div className="text-dark-400 text-xs font-mono">
                POS: {armPosition + 1}/4
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10 pt-24 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center min-h-[80vh] justify-center">
            {/* Professional Content */}
            <div className="text-center px-4 lg:px-16 xl:px-32 max-w-6xl">
              {/* Professional Badge */}
              <motion.div 
                className="inline-flex items-center px-6 py-3 rounded-full bg-primary-500/8 text-primary-400/90 text-sm font-medium mb-12 backdrop-blur-sm border border-primary-400/20 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <Star size={16} className="mr-2" />
                <span className="tracking-wide">Enterprise-Grade Robotics Simulation</span>
                <div className="ml-2 w-1.5 h-1.5 bg-success-400 rounded-full animate-pulse"></div>
              </motion.div>

              {/* Professional Headline */}
              <motion.div 
                className="relative mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2 }}
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.05] tracking-tight">
                  <div className="text-white mb-6 md:mb-8">Master Robotics</div>
                  <div className="bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent font-black relative pb-6">
                    Without Hardware
                    {/* Subtle professional underline */}
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-primary-400/60 to-secondary-400/60 rounded-full"></div>
                  </div>
                </h1>
                
                {/* Professional floating code element */}
                <div className="absolute -top-8 -right-4 md:-right-12 hidden xl:block">
                  <motion.div 
                    className={`bg-dark-800/90 backdrop-blur-sm rounded-lg p-4 border text-sm font-mono shadow-lg transition-all duration-1000 ${
                      codeSnippets[codeIndex].color === 'blue' ? 'border-primary-400/30' :
                      codeSnippets[codeIndex].color === 'green' ? 'border-success-400/30' :
                      codeSnippets[codeIndex].color === 'purple' ? 'border-accent-400/30' :
                      'border-secondary-400/30'
                    }`} 
                    animate={{ 
                      y: [0, -8, 0],
                      opacity: [0.85, 1, 0.85]
                    }}
                    transition={{ 
                      duration: 8, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    <motion.div 
                      className={`font-medium ${
                        codeSnippets[codeIndex].color === 'blue' ? 'text-primary-400' :
                        codeSnippets[codeIndex].color === 'green' ? 'text-success-400' :
                        codeSnippets[codeIndex].color === 'purple' ? 'text-accent-400' :
                        'text-secondary-400'
                      }`}
                      key={codeIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8 }}
                    >
                      {codeSnippets[codeIndex].code}
                    </motion.div>
                    <div className="text-success-400/80 text-xs mt-1">{codeSnippets[codeIndex].status}</div>
                    <div className="flex mt-2 space-x-1">
                      <div className="w-1 h-1 bg-success-400/60 rounded-full animate-pulse"></div>
                      <div className="w-1 h-1 bg-primary-400/60 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                      <div className="w-1 h-1 bg-accent-400/60 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Professional Subtitle */}
              <motion.p 
                className="text-xl md:text-2xl text-dark-200 mb-16 leading-relaxed max-w-4xl mx-auto font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                Advanced robotics programming through immersive 3D simulations with{' '}
                <span className="text-primary-400 font-medium">real-time feedback</span> and{' '}
                <span className="text-secondary-400 font-medium">AI-powered assistance</span>.{' '}
                Professional-grade training without hardware constraints.
              </motion.p>

              {/* Professional Action Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-6 justify-center mb-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <motion.button 
                  className="group relative bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white text-lg px-10 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/25 border border-primary-400/20"
                  onClick={() => navigate('/simulator')}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-center relative z-10">
                    <Play size={20} className="mr-3" />
                    <span>Launch Simulator</span>
                    <ArrowRight size={20} className="ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </motion.button>
                
                <motion.button 
                  className="group bg-transparent text-primary-400 hover:text-white text-lg px-10 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-primary-500/10 backdrop-blur-sm border border-primary-400/30 hover:border-primary-400/50"
                  onClick={() => navigate('/challenges')}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-center">
                    <Award size={20} className="mr-3" />
                    <span>Explore Challenges</span>
                  </div>
                </motion.button>
              </motion.div>

              {/* Professional social proof */}
              <motion.div 
                className="flex flex-wrap items-center justify-center gap-8 text-dark-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <motion.div 
                  className="flex items-center group hover:text-primary-400 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <Users size={18} className="mr-2 text-primary-400/80" />
                  <span className="font-medium">10,000+ Engineers</span>
                </motion.div>
                <motion.div 
                  className="flex items-center group hover:text-secondary-400 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <Award size={18} className="mr-2 text-secondary-400/80" />
                  <span className="font-medium">Industry Standard</span>
                </motion.div>
                <motion.div 
                  className="flex items-center group hover:text-accent-400 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <Star size={18} className="mr-2 text-accent-400/80" />
                  <span className="font-medium">Enterprise Ready</span>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Professional feature highlights */}
          <motion.div 
            className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            {[
              {
                icon: <Cpu size={28} />, 
                title: 'Advanced Simulation',
                description: 'Physics-accurate 3D environments with multiple robot types, real-time dynamics, and professional-grade precision for enterprise training.', 
                color: 'primary'
              },
              {
                icon: <Brain size={28} />, 
                title: 'AI-Powered Learning',
                description: 'Intelligent code assistance, automated debugging, and adaptive learning paths powered by advanced machine learning algorithms.', 
                color: 'secondary'
              },
              {
                icon: <Layers size={28} />, 
                title: 'Enterprise Curriculum',
                description: 'Comprehensive training modules from basic operations to advanced autonomous systems, designed for professional development.', 
                color: 'accent'
              }
            ].map((feature, index) => (
              <motion.div 
                key={feature.title} 
                className="group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.8 }}
                whileHover={{ y: -4 }}
              >
                <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-dark-700/20 backdrop-blur-sm hover:bg-dark-700/30 transition-all duration-500 h-full border border-dark-600/30 hover:border-dark-500/50">
                  <motion.div 
                    className={`bg-gradient-to-br from-${feature.color}-500/90 to-${feature.color}-600/90 p-5 rounded-2xl mb-6 shadow-lg border border-${feature.color}-400/20`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-white">{feature.icon}</div>
                  </motion.div>
                  <h3 className="font-bold text-white mb-4 text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-dark-300 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Professional scroll indicator */}
          <motion.div 
            className="flex justify-center mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-dark-400 hover:text-primary-400 transition-colors cursor-pointer"
            >
              <ChevronDown size={24} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;