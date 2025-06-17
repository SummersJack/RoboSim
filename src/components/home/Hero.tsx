import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Cpu, Brain, Layers, Star, Users, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from '@/hooks/useNavigation';

const Hero = () => {
  const navigate = useNavigate();
  const [armPosition, setArmPosition] = useState(0);
  const [robotEyesBlink, setRobotEyesBlink] = useState(false);
  const [codeIndex, setCodeIndex] = useState(0);
  const [particlePositions, setParticlePositions] = useState([]);
  const [orbitingElements, setOrbitingElements] = useState([]);

  const codeSnippets = [
    { code: "robot.moveForward()", status: "# Executing...", color: "blue" },
    { code: "arm.grab(object)", status: "# Success!", color: "green" },
    { code: "drone.takeOff()", status: "# Flying...", color: "purple" },
    { code: "sensor.scan()", status: "# Detecting...", color: "cyan" }
  ];

  useEffect(() => {
    // Initialize floating particles with better distribution
    const particles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 0.2 + 0.1,
      opacity: Math.random() * 0.15 + 0.05,
      delay: Math.random() * 5
    }));
    setParticlePositions(particles);

    // Initialize orbiting elements
    const orbits = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      radius: 200 + i * 50,
      speed: 0.5 + i * 0.2,
      angle: (i * Math.PI * 2) / 6,
      size: 4 - i * 0.5,
      opacity: 0.1 - i * 0.015
    }));
    setOrbitingElements(orbits);

    // Robotic arm animation with smoother transitions
    const armInterval = setInterval(() => {
      setArmPosition(prev => (prev + 1) % 5);
    }, 4500);

    // Robot eye blinking with natural timing
    const blinkInterval = setInterval(() => {
      setRobotEyesBlink(true);
      setTimeout(() => setRobotEyesBlink(false), 120);
    }, 4000 + Math.random() * 3000);

    // Code snippet rotation with smooth transitions
    const codeInterval = setInterval(() => {
      setCodeIndex(prev => (prev + 1) % codeSnippets.length);
    }, 4000);

    // Particle animation with physics-like movement
    const particleInterval = setInterval(() => {
      setParticlePositions(prev => 
        prev.map(particle => ({
          ...particle,
          x: (particle.x + particle.speed) % 100,
          y: particle.y + Math.sin(Date.now() * 0.0008 + particle.id) * 0.08
        }))
      );
    }, 80);

    // Orbiting elements animation
    const orbitInterval = setInterval(() => {
      setOrbitingElements(prev =>
        prev.map(orbit => ({
          ...orbit,
          angle: orbit.angle + orbit.speed * 0.01
        }))
      );
    }, 50);

    return () => {
      clearInterval(armInterval);
      clearInterval(blinkInterval);
      clearInterval(codeInterval);
      clearInterval(particleInterval);
      clearInterval(orbitInterval);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Primary background orbs */}
        <div className="absolute top-1/5 left-1/6 w-96 h-96 bg-primary-500/8 rounded-full blur-3xl animate-pulse" style={{animationDuration: '8s'}}></div>
        <div className="absolute bottom-1/4 right-1/5 w-80 h-80 bg-secondary-500/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s', animationDuration: '10s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-500/4 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s', animationDuration: '12s'}}></div>
        
        {/* Secondary accent orbs */}
        <div className="absolute top-3/4 left-1/4 w-48 h-48 bg-success-500/3 rounded-full blur-2xl animate-pulse" style={{animationDelay: '6s', animationDuration: '14s'}}></div>
        <div className="absolute top-1/6 right-1/3 w-32 h-32 bg-warning-500/4 rounded-full blur-2xl animate-pulse" style={{animationDelay: '8s', animationDuration: '16s'}}></div>
      </div>

      {/* Sophisticated grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:100px_100px] opacity-40"></div>
      
      {/* Orbiting elements around the center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {orbitingElements.map((orbit) => (
          <div
            key={orbit.id}
            className="absolute bg-primary-400 rounded-full animate-pulse"
            style={{
              width: `${orbit.size}px`,
              height: `${orbit.size}px`,
              opacity: orbit.opacity,
              transform: `translate(${Math.cos(orbit.angle) * orbit.radius}px, ${Math.sin(orbit.angle) * orbit.radius}px)`,
              animationDelay: `${orbit.id * 0.5}s`,
              animationDuration: `${4 + orbit.id * 0.3}s`
            }}
          />
        ))}
      </div>
      
      {/* Enhanced floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particlePositions.map((particle) => (
          <div
            key={particle.id}
            className="absolute bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${3 + particle.id * 0.2}s`
            }}
          />
        ))}
      </div>
      
      {/* Advanced Robotic Arm - repositioned for better visibility */}
      <div className="absolute top-12 right-8 xl:right-16 hidden xl:block z-0">
        <motion.div 
          className="relative w-56 h-72"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          {/* Enhanced base with power indicators */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-12 bg-gradient-to-t from-dark-700 to-dark-600 rounded-xl shadow-2xl border border-dark-500">
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded animate-pulse"></div>
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
              <div className="w-1 h-1 bg-success-400 rounded-full animate-ping"></div>
              <div className="w-1 h-1 bg-primary-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
              <div className="w-1 h-1 bg-accent-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
          
          {/* Power core with enhanced effects */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full shadow-2xl animate-pulse border-2 border-primary-400">
            <div className="absolute inset-2 bg-white rounded-full animate-ping opacity-40"></div>
            <div className="absolute inset-1 bg-gradient-to-br from-secondary-400 to-primary-500 rounded-full opacity-60"></div>
          </div>
          
          {/* First arm segment with improved animation */}
          <motion.div 
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-5 h-28 bg-gradient-to-t from-dark-700 to-dark-600 rounded-full origin-bottom shadow-xl border border-dark-500"
            animate={{
              rotate: armPosition === 0 ? 0 : 
                     armPosition === 1 ? 25 : 
                     armPosition === 2 ? -20 : 
                     armPosition === 3 ? 15 : -5
            }}
            transition={{ duration: 3, ease: "easeInOut" }}
          >
            {/* Enhanced joint with energy rings */}
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-full shadow-xl border-2 border-primary-400">
              <div className="absolute inset-1 bg-gradient-to-br from-secondary-400 to-primary-500 rounded-full animate-pulse opacity-60"></div>
              <div className="absolute inset-3 bg-white rounded-full animate-ping opacity-30"></div>
            </div>
            
            {/* Second arm segment */}
            <motion.div 
              className="absolute -top-28 left-1/2 transform -translate-x-1/2 w-5 h-28 bg-gradient-to-t from-dark-700 to-dark-600 rounded-full origin-bottom shadow-xl border border-dark-500"
              animate={{
                rotate: armPosition === 0 ? 0 : 
                       armPosition === 1 ? -40 : 
                       armPosition === 2 ? 35 : 
                       armPosition === 3 ? -25 : 10
              }}
              transition={{ duration: 3, ease: "easeInOut" }}
            >
              {/* Advanced end effector */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex items-center">
                <motion.div 
                  className="w-4 h-6 bg-gradient-to-b from-primary-500 to-primary-600 rounded-t-sm mr-1 shadow-lg"
                  animate={{ rotate: armPosition === 2 ? 12 : 0 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div 
                  className="w-4 h-6 bg-gradient-to-b from-primary-500 to-primary-600 rounded-t-sm shadow-lg"
                  animate={{ rotate: armPosition === 2 ? -12 : 0 }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Sensor array */}
                <div className="absolute top-2 left-3 w-2 h-2 bg-secondary-400 rounded-full animate-pulse shadow-glow"></div>
                <div className="absolute top-4 left-2 w-1 h-1 bg-success-400 rounded-full animate-ping"></div>
                <div className="absolute top-4 left-4 w-1 h-1 bg-error-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                
                {/* Object detection indicator */}
                {armPosition === 2 && (
                  <motion.div 
                    className="absolute -top-3 left-1 w-6 h-3 bg-gradient-to-r from-success-400 to-success-500 rounded opacity-90 shadow-glow"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <div className="text-xs text-white text-center font-bold">●</div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
          
          {/* Enhanced status display */}
          <motion.div 
            className="absolute -top-6 -right-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="bg-dark-800/95 backdrop-blur-md border border-primary-400/40 rounded-xl p-4 text-xs shadow-2xl min-w-[130px]">
              <div className="text-primary-400 font-mono font-bold mb-2">ROBOT ARM v2.1</div>
              <motion.div 
                className="font-mono font-bold mb-2"
                animate={{
                  color: armPosition === 0 ? '#22c55e' :
                         armPosition === 1 ? '#3b82f6' :
                         armPosition === 2 ? '#f59e0b' :
                         armPosition === 3 ? '#8b5cf6' : '#06b6d4'
                }}
                transition={{ duration: 0.5 }}
              >
                {armPosition === 0 ? 'STANDBY' :
                 armPosition === 1 ? 'MOVING' :
                 armPosition === 2 ? 'GRASPING' :
                 armPosition === 3 ? 'LIFTING' : 'RESETTING'}
              </motion.div>
              <div className="flex items-center justify-between mb-2">
                <motion.div 
                  className="w-2 h-2 rounded-full animate-pulse"
                  animate={{
                    backgroundColor: armPosition === 2 ? '#22c55e' : '#3b82f6'
                  }}
                />
                <span className="text-dark-300 text-xs font-mono ml-2">
                  {armPosition === 2 ? 'ENGAGED' : 'ACTIVE'}
                </span>
              </div>
              <div className="text-dark-400 text-xs">
                Joint: {armPosition + 1}/5
              </div>
              <div className="mt-2 w-full bg-dark-700 rounded-full h-1">
                <motion.div 
                  className="bg-gradient-to-r from-primary-400 to-secondary-400 h-1 rounded-full"
                  animate={{ width: `${(armPosition + 1) * 20}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Enhanced Floating Robot */}
      <div className="absolute top-16 left-8 xl:left-16 hidden xl:block z-0">
        <motion.div 
          className="relative animate-float"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          {/* Robot body with improved design */}
          <div className="w-24 h-28 bg-gradient-to-b from-dark-600 to-dark-700 rounded-2xl relative shadow-2xl border border-dark-500">
            {/* Enhanced head */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-b from-dark-600 to-dark-700 rounded-full shadow-xl border border-dark-500">
              {/* Eyes with improved animation */}
              <motion.div 
                className="absolute top-5 left-4 w-4 h-4 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full shadow-glow"
                animate={{ 
                  scaleY: robotEyesBlink ? 0 : 1,
                  scaleX: robotEyesBlink ? 0.9 : 1
                }}
                transition={{ duration: 0.15 }}
              >
                <div className="absolute inset-1 bg-white rounded-full opacity-60"></div>
              </motion.div>
              <motion.div 
                className="absolute top-5 right-4 w-4 h-4 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full shadow-glow"
                animate={{ 
                  scaleY: robotEyesBlink ? 0 : 1,
                  scaleX: robotEyesBlink ? 0.9 : 1
                }}
                transition={{ duration: 0.15 }}
              >
                <div className="absolute inset-1 bg-white rounded-full opacity-60"></div>
              </motion.div>
              
              {/* Enhanced antenna system */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-1 h-6 bg-gradient-to-t from-primary-400 to-secondary-500 shadow-sm"></div>
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gradient-to-br from-secondary-400 to-primary-500 rounded-full animate-ping shadow-glow"></div>
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-pulse"></div>
            </div>
            
            {/* Enhanced arms */}
            <div className="absolute top-4 -left-4 w-5 h-12 bg-gradient-to-b from-dark-600 to-dark-700 rounded-full shadow-lg border border-dark-500">
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-primary-400 rounded-full animate-pulse opacity-60"></div>
            </div>
            <div className="absolute top-4 -right-4 w-5 h-12 bg-gradient-to-b from-dark-600 to-dark-700 rounded-full shadow-lg border border-dark-500">
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-primary-400 rounded-full animate-pulse opacity-60"></div>
            </div>
            
            {/* Advanced chest panel */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-14 h-12 bg-dark-800 rounded-xl border border-primary-400/40 shadow-inner p-2">
              <div className="w-full h-1 bg-gradient-to-r from-primary-400 to-secondary-400 mb-1 rounded animate-pulse"></div>
              <div className="w-4/5 h-1 bg-gradient-to-r from-success-400 to-success-500 mb-1 ml-1 rounded animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="w-3/5 h-1 bg-gradient-to-r from-accent-400 to-accent-500 mb-1 ml-1 rounded animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="flex justify-between items-center mt-2">
                <div className="w-1 h-1 bg-success-400 rounded-full animate-ping"></div>
                <div className="w-1 h-1 bg-primary-400 rounded-full animate-ping" style={{animationDelay: '0.3s'}}></div>
                <div className="w-1 h-1 bg-accent-400 rounded-full animate-ping" style={{animationDelay: '0.6s'}}></div>
              </div>
            </div>
          </div>
          
          {/* Enhanced speech bubble */}
          <motion.div 
            className="absolute -top-14 -right-8"
            animate={{ 
              y: [0, -5, 0],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <div className="bg-dark-800/95 backdrop-blur-md border border-primary-400/40 rounded-xl px-4 py-3 shadow-2xl">
              <motion.div 
                className="text-primary-400 text-xs font-mono whitespace-nowrap font-medium"
                animate={{ 
                  color: robotEyesBlink ? '#f59e0b' : 
                         armPosition === 2 ? '#22c55e' : '#3b82f6'
                }}
              >
                {robotEyesBlink ? 'Processing data...' : 
                 armPosition === 2 ? 'Analyzing movement!' :
                 'Systems online!'}
              </motion.div>
              <div className="absolute bottom-0 left-6 transform translate-y-full">
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-primary-400/40"></div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10 pt-20 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center min-h-[85vh] justify-center">
            {/* Main Content */}
            <div className="text-center px-4 lg:px-16 xl:px-32 max-w-6xl">
              {/* Enhanced Badge */}
              <motion.div 
                className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-primary-500/15 to-secondary-500/15 text-primary-400 text-sm font-semibold mb-12 backdrop-blur-md border border-primary-400/30 hover:bg-gradient-to-r hover:from-primary-500/25 hover:to-secondary-500/25 transition-all duration-500 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Star size={18} className="mr-3 animate-spin" style={{animationDuration: '8s'}} />
                <span className="tracking-wide">Built by students, powered by innovation</span>
                <div className="ml-3 w-2 h-2 bg-success-400 rounded-full animate-pulse"></div>
              </motion.div>

              {/* Main Headline */}
              <motion.div 
                className="relative mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] tracking-tight">
                  <div className="text-white mb-6 md:mb-8 drop-shadow-lg">Master Robotics</div>
                  <div className="bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent font-black relative pb-8">
                    Without Hardware
                    {/* Enhanced animated underline */}
                    <div className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 rounded-full opacity-60">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
                    </div>
                  </div>
                </h1>
                
                {/* Enhanced floating code elements */}
                <div className="absolute -top-12 -right-8 md:-right-16 hidden xl:block">
                  <motion.div 
                    className={`bg-dark-800/95 backdrop-blur-md rounded-xl p-5 border-2 text-sm font-mono shadow-2xl transition-all duration-500 ${
                      codeSnippets[codeIndex].color === 'blue' ? 'border-primary-400/50 shadow-primary-500/20' :
                      codeSnippets[codeIndex].color === 'green' ? 'border-success-400/50 shadow-success-500/20' :
                      codeSnippets[codeIndex].color === 'purple' ? 'border-accent-400/50 shadow-accent-500/20' :
                      'border-secondary-400/50 shadow-secondary-500/20'
                    }`} 
                    animate={{ 
                      y: [0, -10, 0],
                      opacity: [0.9, 1, 0.9]
                    }}
                    transition={{ 
                      duration: 6, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    <motion.div 
                      className={`font-bold ${
                        codeSnippets[codeIndex].color === 'blue' ? 'text-primary-400' :
                        codeSnippets[codeIndex].color === 'green' ? 'text-success-400' :
                        codeSnippets[codeIndex].color === 'purple' ? 'text-accent-400' :
                        'text-secondary-400'
                      }`}
                      key={codeIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {codeSnippets[codeIndex].code}
                    </motion.div>
                    <div className="text-success-400 text-xs mt-2 opacity-80">{codeSnippets[codeIndex].status}</div>
                    <div className="flex mt-2 space-x-1">
                      <div className="w-1 h-1 bg-success-400 rounded-full animate-pulse"></div>
                      <div className="w-1 h-1 bg-primary-400 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
                      <div className="w-1 h-1 bg-accent-400 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
                    </div>
                  </motion.div>
                </div>
                
                <div className="absolute -bottom-16 -left-8 md:-left-16 hidden xl:block">
                  <motion.div 
                    className="bg-dark-800/95 backdrop-blur-md rounded-xl p-5 border-2 border-accent-400/50 text-sm font-mono shadow-2xl shadow-accent-500/20" 
                    animate={{ 
                      y: [0, 10, 0],
                      opacity: [0.9, 1, 0.9]
                    }}
                    transition={{ 
                      duration: 6, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: 3
                    }}
                  >
                    <div className="text-accent-400 font-bold">neural_net.train()</div>
                    <div className="text-success-400 text-xs mt-2 opacity-80"># AI Learning...</div>
                    <div className="w-full bg-dark-700 rounded-full h-1 mt-3">
                      <motion.div 
                        className="bg-gradient-to-r from-accent-400 to-secondary-400 h-1 rounded-full"
                        animate={{ width: ['73%', '85%', '73%'] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Enhanced Subtitle */}
              <motion.p 
                className="text-lg md:text-xl lg:text-2xl text-dark-200 mb-16 leading-relaxed tracking-wide max-w-5xl mx-auto font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Learn robotics programming through immersive 3D simulations with{' '}
                <span className="text-primary-400 font-medium">real-time feedback</span> and{' '}
                <span className="text-secondary-400 font-medium">interactive challenges</span>.{' '}
                Master complex robotic systems without expensive hardware.
              </motion.p>

              {/* Enhanced Action Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-8 justify-center mb-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.button 
                  className="group relative overflow-hidden bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white text-lg px-12 py-6 rounded-2xl font-bold transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/30 hover:-translate-y-2 active:translate-y-0 hover:scale-105 border border-primary-400/20"
                  onClick={() => navigate('/simulator')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center justify-center relative z-10">
                    <Play size={24} className="mr-4 group-hover:scale-125 transition-transform duration-300" />
                    <span className="tracking-wide">Start Simulator</span>
                    <ArrowRight size={24} className="ml-4 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </motion.button>
                
                <motion.button 
                  className="group bg-transparent text-primary-400 hover:text-white text-lg px-12 py-6 rounded-2xl font-bold transition-all duration-500 hover:bg-gradient-to-r hover:from-primary-500/20 hover:to-secondary-500/20 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary-500/20 hover:-translate-y-2 active:translate-y-0 border-2 border-primary-400/30 hover:border-primary-400/60"
                  onClick={() => navigate('/challenges')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center justify-center">
                    <Award size={24} className="mr-4 group-hover:scale-125 transition-transform duration-300" />
                    <span className="tracking-wide">View Challenges</span>
                  </div>
                </motion.button>
              </motion.div>

              {/* Enhanced social proof */}
              <motion.div 
                className="flex flex-wrap items-center justify-center gap-12 text-base text-dark-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <motion.div 
                  className="flex items-center group hover:text-primary-400 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  <Users size={20} className="mr-3 text-primary-400 group-hover:scale-125 transition-transform duration-300" />
                  <span className="font-semibold tracking-wide">Growing Community</span>
                </motion.div>
                <motion.div 
                  className="flex items-center group hover:text-secondary-400 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  <Award size={20} className="mr-3 text-secondary-400 group-hover:scale-125 transition-transform duration-300" />
                  <span className="font-semibold tracking-wide">Interactive Learning</span>
                </motion.div>
                <motion.div 
                  className="flex items-center group hover:text-accent-400 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  <Star size={20} className="mr-3 text-accent-400 group-hover:scale-125 transition-transform duration-300" />
                  <span className="font-semibold tracking-wide">Open Source</span>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Enhanced feature highlights */}
          <motion.div 
            className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {[
              {
                icon: <Cpu size={32} />, 
                title: 'Multiple Robot Types',
                description: 'Control robotic arms, mobile robots, drones, and specialized automation systems in physics-accurate 3D simulations with real-world constraints.', 
                color: 'primary'
              },
              {
                icon: <Brain size={32} />, 
                title: 'AI-Powered Learning',
                description: 'Write code in natural language with intelligent suggestions, automated debugging, and personalized learning paths that adapt to your progress.', 
                color: 'secondary'
              },
              {
                icon: <Layers size={32} />, 
                title: 'Progressive Curriculum',
                description: 'Master robotics through carefully structured lessons from basic movements to advanced autonomous systems and machine learning integration.', 
                color: 'accent'
              }
            ].map((feature, index) => (
              <motion.div 
                key={feature.title} 
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8 }}
              >
                <div className="flex flex-col items-center text-center p-10 rounded-3xl bg-gradient-to-br from-dark-700/30 to-dark-800/30 backdrop-blur-md hover:from-dark-700/50 hover:to-dark-800/50 transition-all duration-500 h-full border border-dark-600/40 hover:border-dark-500/60 hover:shadow-2xl cursor-pointer">
                  <motion.div 
                    className={`bg-gradient-to-br from-${feature.color}-500 to-${feature.color}-600 p-6 rounded-3xl mb-8 shadow-xl group-hover:shadow-${feature.color}-500/50 border border-${feature.color}-400/20`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-white">{feature.icon}</div>
                  </motion.div>
                  <h3 className="font-bold text-white mb-6 text-xl group-hover:text-white transition-colors tracking-wide">
                    {feature.title}
                  </h3>
                  <p className="text-dark-300 leading-relaxed group-hover:text-dark-200 transition-colors">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Enhanced CSS for better animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-12px) rotate(1deg); }
          50% { transform: translateY(-8px) rotate(0deg); }
          75% { transform: translateY(-15px) rotate(-1deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .shadow-glow {
          box-shadow: 0 0 20px currentColor;
        }
      `}</style>
    </div>
  );
};

export default Hero;