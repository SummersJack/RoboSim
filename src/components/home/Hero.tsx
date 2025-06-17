import React, { useState, useEffect } from 'react'; import { ArrowRight, Play, Cpu, Brain, Layers, Star, Users, Award } from 'lucide-react'; import { motion } from 'framer-motion'; import { useNavigate } from '@/hooks/useNavigation';

const Hero = () => {
const navigate = useNavigate();
const [armPosition, setArmPosition] = useState(0);
const [robotEyesBlink, setRobotEyesBlink] = useState(false);
const [codeIndex, setCodeIndex] = useState(0);
const [particlePositions, setParticlePositions] = useState([]);

const codeSnippets = [
{ code: "robot.moveForward()", status: "# Executing...", color: "blue" },
{ code: "arm.grab(object)", status: "# Success!", color: "green" },
{ code: "drone.takeOff()", status: "# Flying...", color: "purple" },
{ code: "sensor.scan()", status: "# Detecting...", color: "cyan" }
];

useEffect(() => {
// Initialize particle positions
const particles = Array.from({ length: 8 }, (_, i) => ({
id: i,
x: Math.random() * 100,
y: Math.random() * 100,
size: Math.random() * 1.5 + 0.5,
speed: Math.random() * 0.3 + 0.1,
opacity: Math.random() * 0.2 + 0.05
}));
setParticlePositions(particles);


// Robotic arm animation
const armInterval = setInterval(() => {
  setArmPosition(prev => (prev + 1) % 4);
}, 4000);

// Robot eye blinking
const blinkInterval = setInterval(() => {
  setRobotEyesBlink(true);
  setTimeout(() => setRobotEyesBlink(false), 150);
}, 4000 + Math.random() * 2000);

// Code snippet rotation
const codeInterval = setInterval(() => {
  setCodeIndex(prev => (prev + 1) % codeSnippets.length);
}, 3500);

// Particle animation
const particleInterval = setInterval(() => {
  setParticlePositions(prev => 
    prev.map(particle => ({
      ...particle,
      x: (particle.x + particle.speed) % 100,
      y: particle.y + Math.sin(Date.now() * 0.001 + particle.id) * 0.05
    }))
  );
}, 100);

return () => {
  clearInterval(armInterval);
  clearInterval(blinkInterval);
  clearInterval(codeInterval);
  clearInterval(particleInterval);
};
}, []);

return (
<div className="relative min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 overflow-hidden">
{/* Subtle Background effects - positioned to not interfere with content */}
<div className="absolute bottom-1/6 right-1/6 w-64 h-64 bg-secondary-500/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
<div className="absolute top-2/3 left-2/3 w-48 h-48 bg-accent-500/4 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>

  {/* Subtle grid pattern */}
  <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.015)_1px,transparent_1px)] bg-[size:120px_120px] opacity-30"></div>
  
  {/* Floating particles - very subtle */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {particlePositions.map((particle) => (
      <div
        key={particle.id}
        className="absolute bg-primary-400 rounded-full animate-pulse"
        style={{
          left: `${particle.x}%`,
          top: `${particle.y}%`,
          width: `${particle.size}px`,
          height: `${particle.size}px`,
          opacity: particle.opacity,
          animationDelay: `${particle.id * 0.8}s`,
          animationDuration: `${4 + particle.id * 0.3}s`
        }}
      />
    ))}
  </div>
  
  {/* Robotic Arm Animation - positioned to not overlap content */}
  <div className="absolute top-16 right-4 xl:right-12 hidden xl:block z-0 opacity-80">
    <div className="relative w-48 h-64">
      {/* Base */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-10 bg-gradient-to-t from-dark-700 to-dark-600 rounded-lg shadow-lg border border-dark-500">
        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-12 h-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded animate-pulse"></div>
        <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 flex space-x-0.5">
          <div className="w-0.5 h-0.5 bg-success-400 rounded-full animate-ping"></div>
          <div className="w-0.5 h-0.5 bg-primary-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
          <div className="w-0.5 h-0.5 bg-accent-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        </div>
      </div>
      
      {/* Power core */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full shadow-lg animate-pulse border border-primary-400">
        <div className="absolute inset-1.5 bg-white rounded-full animate-ping opacity-30"></div>
      </div>
      
      {/* First arm segment */}
      <div 
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-4 h-24 bg-gradient-to-t from-dark-700 to-dark-600 rounded-full transition-all duration-3000 ease-in-out origin-bottom shadow-lg border border-dark-500"
        style={{
          transform: `translateX(-50%) rotate(${
            armPosition === 0 ? 0 : 
            armPosition === 1 ? 20 : 
            armPosition === 2 ? -15 : 
            10
          }deg)`
        }}
      >
        {/* Joint */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full shadow-lg border border-primary-400">
          <div className="absolute inset-1 bg-gradient-to-br from-secondary-400 to-primary-500 rounded-full animate-pulse opacity-60"></div>
        </div>
        
        {/* Second arm segment */}
        <div 
          className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-4 h-24 bg-gradient-to-t from-dark-700 to-dark-600 rounded-full transition-all duration-3000 ease-in-out origin-bottom shadow-lg border border-dark-500"
          style={{
            transform: `translateX(-50%) rotate(${
              armPosition === 0 ? 0 : 
              armPosition === 1 ? -30 : 
              armPosition === 2 ? 25 : 
              -15
            }deg)`
          }}
        >
          {/* End effector */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 flex items-center">
            <div className={`w-3 h-5 bg-gradient-to-b from-primary-500 to-primary-600 rounded-t-sm mr-0.5 shadow-md transition-all duration-500 ${
              armPosition === 2 ? 'rotate-6' : ''
            }`}></div>
            <div className={`w-3 h-5 bg-gradient-to-b from-primary-500 to-primary-600 rounded-t-sm shadow-md transition-all duration-500 ${
              armPosition === 2 ? '-rotate-6' : ''
            }`}></div>
            
            {/* Sensor */}
            <div className="absolute top-1 left-2 w-1.5 h-1.5 bg-secondary-400 rounded-full animate-pulse shadow-glow"></div>
            
            {/* Object detection indicator */}
            {armPosition === 2 && (
              <div className="absolute -top-2 left-0.5 w-5 h-2 bg-gradient-to-r from-success-400 to-success-500 rounded opacity-90 animate-pulse shadow-glow">
                <div className="text-xs text-white text-center font-bold">●</div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Status display */}
      <div className="absolute -top-4 -right-4 transition-all duration-500">
        <div className="bg-dark-800/90 backdrop-blur-sm border border-primary-400/30 rounded-lg p-3 text-xs shadow-lg min-w-[100px]">
          <div className="text-primary-400 font-mono font-bold mb-1">ARM STATUS</div>
          <div className={`font-mono font-bold transition-colors duration-300 mb-1 ${
            armPosition === 0 ? 'text-success-400' :
            armPosition === 1 ? 'text-primary-400' :
            armPosition === 2 ? 'text-warning-400' :
            'text-secondary-400'
          }`}>
            {armPosition === 0 ? 'READY' :
             armPosition === 1 ? 'MOVING' :
             armPosition === 2 ? 'GRIPPING' :
             'RESET'}
          </div>
          <div className="flex items-center justify-between">
            <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${
              armPosition === 2 ? 'bg-warning-400' : 'bg-primary-400'
            }`}></div>
            <span className="text-dark-300 text-xs font-mono ml-1">
              {armPosition === 2 ? 'ACTIVE' : 'IDLE'}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  {/* Floating Robot - positioned to not overlap content */}
  <div className="absolute top-20 left-4 xl:left-12 hidden xl:block animate-float z-0 opacity-80">
    <div className="relative">
      {/* Robot body */}
      <div className="w-20 h-24 bg-gradient-to-b from-dark-600 to-dark-700 rounded-xl relative shadow-lg border border-dark-500">
        {/* Head */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-b from-dark-600 to-dark-700 rounded-full shadow-lg border border-dark-500">
          {/* Eyes */}
          <div className={`absolute top-4 left-3 w-3 h-3 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full transition-all duration-150 shadow-glow ${
            robotEyesBlink ? 'scale-y-0 scale-x-90' : 'scale-y-100 scale-x-100'
          }`}>
            <div className="absolute inset-0.5 bg-white rounded-full opacity-50"></div>
          </div>
          <div className={`absolute top-4 right-3 w-3 h-3 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full transition-all duration-150 shadow-glow ${
            robotEyesBlink ? 'scale-y-0 scale-x-90' : 'scale-y-100 scale-x-100'
          }`}>
            <div className="absolute inset-0.5 bg-white rounded-full opacity-50"></div>
          </div>
          
          {/* Antenna */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-gradient-to-t from-primary-400 to-secondary-500"></div>
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-br from-secondary-400 to-primary-500 rounded-full animate-ping shadow-glow"></div>
        </div>
        
        {/* Arms */}
        <div className="absolute top-3 -left-3 w-4 h-10 bg-gradient-to-b from-dark-600 to-dark-700 rounded-full shadow-md border border-dark-500">
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary-400 rounded-full animate-pulse opacity-50"></div>
        </div>
        <div className="absolute top-3 -right-3 w-4 h-10 bg-gradient-to-b from-dark-600 to-dark-700 rounded-full shadow-md border border-dark-500">
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary-400 rounded-full animate-pulse opacity-50"></div>
        </div>
        
        {/* Chest panel */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-10 h-8 bg-dark-800 rounded-lg border border-primary-400/30 shadow-inner p-1">
          <div className="w-full h-0.5 bg-gradient-to-r from-primary-400 to-secondary-400 mb-0.5 rounded animate-pulse"></div>
          <div className="w-4/5 h-0.5 bg-gradient-to-r from-success-400 to-success-500 mb-0.5 ml-0.5 rounded animate-pulse" style={{animationDelay: '0.5s'}}></div>
          <div className="w-3/5 h-0.5 bg-gradient-to-r from-accent-400 to-accent-500 mb-0.5 ml-0.5 rounded animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="flex justify-between items-center mt-1">
            <div className="w-0.5 h-0.5 bg-success-400 rounded-full animate-ping"></div>
            <div className="w-0.5 h-0.5 bg-primary-400 rounded-full animate-ping" style={{animationDelay: '0.3s'}}></div>
            <div className="w-0.5 h-0.5 bg-accent-400 rounded-full animate-ping" style={{animationDelay: '0.6s'}}></div>
          </div>
        </div>
      </div>
      
      {/* Speech bubble */}
      <div className="absolute -top-12 -right-6 transition-all duration-500">
        <div className="bg-dark-800/90 backdrop-blur-sm border border-primary-400/30 rounded-lg px-3 py-2 shadow-lg">
          <div className="text-primary-400 text-xs font-mono whitespace-nowrap font-medium">
            {robotEyesBlink ? 'Processing...' : 
             armPosition === 2 ? 'Analyzing!' :
             'Online!'}
          </div>
          <div className="absolute bottom-0 left-4 transform translate-y-full">
            <div className="w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-primary-400/30"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div className="container mx-auto px-6 relative z-10 pt-16 pb-12">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col items-center min-h-[80vh] justify-center">
        {/* Main Content */}
        <div className="text-center px-4 lg:px-8 max-w-5xl">
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-primary-500/10 to-secondary-500/10 text-primary-400 text-sm font-semibold mb-8 backdrop-blur-sm border border-primary-400/20 hover:bg-gradient-to-r hover:from-primary-500/15 hover:to-secondary-500/15 transition-all duration-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Star size={16} className="mr-2 animate-pulse" />
            <span className="tracking-wide">Built by students, powered by innovation</span>
            <div className="ml-2 w-1.5 h-1.5 bg-success-400 rounded-full animate-pulse"></div>
          </motion.div>

          {/* Main Headline */}
          <motion.div 
            className="relative mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight">
              <div className="text-white mb-4 md:mb-6 drop-shadow-lg">Master Robotics</div>
              <div className="bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent font-black relative">
                Without Hardware
                {/* Animated underline */}
                <div className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 rounded-full opacity-60">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
                </div>
              </div>
            </h1>
            
            {/* Floating code elements - positioned to not overlap main text */}
            <div className="absolute -top-8 -right-4 md:-right-8 hidden lg:block opacity-80">
              <motion.div 
                className={`bg-dark-800/90 backdrop-blur-sm rounded-lg p-4 border text-sm font-mono animate-float shadow-lg transition-all duration-500 ${
                  codeSnippets[codeIndex].color === 'blue' ? 'border-primary-400/40 shadow-primary-500/10' :
                  codeSnippets[codeIndex].color === 'green' ? 'border-success-400/40 shadow-success-500/10' :
                  codeSnippets[codeIndex].color === 'purple' ? 'border-accent-400/40 shadow-accent-500/10' :
                  'border-secondary-400/40 shadow-secondary-500/10'
                }`} 
                style={{animationDelay: '1s', animationDuration: '6s'}}
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className={`${
                  codeSnippets[codeIndex].color === 'blue' ? 'text-primary-400' :
                  codeSnippets[codeIndex].color === 'green' ? 'text-success-400' :
                  codeSnippets[codeIndex].color === 'purple' ? 'text-accent-400' :
                  'text-secondary-400'
                } font-bold`}>{codeSnippets[codeIndex].code}</div>
                <div className="text-success-400 text-xs mt-1 opacity-80">{codeSnippets[codeIndex].status}</div>
                <div className="flex mt-2 space-x-1">
                  <div className="w-1 h-1 bg-success-400 rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-primary-400 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
                  <div className="w-1 h-1 bg-accent-400 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
                </div>
              </motion.div>
            </div>
            
            <div className="absolute -bottom-12 -left-4 md:-left-8 hidden lg:block opacity-80">
              <motion.div 
                className="bg-dark-800/90 backdrop-blur-sm rounded-lg p-4 border border-accent-400/40 text-sm font-mono animate-float shadow-lg shadow-accent-500/10" 
                style={{animationDelay: '3s', animationDuration: '6s'}}
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <div className="text-accent-400 font-bold">neural_net.train()</div>
                <div className="text-success-400 text-xs mt-1 opacity-80"># AI Learning...</div>
                <div className="w-full bg-dark-700 rounded-full h-1 mt-2">
                  <div className="bg-gradient-to-r from-accent-400 to-secondary-400 h-1 rounded-full animate-pulse" style={{width: '73%'}}></div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p 
            className="text-lg md:text-xl lg:text-2xl text-dark-200 mb-12 leading-relaxed tracking-wide max-w-4xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Learn robotics programming through immersive 3D simulations with{' '}
            <span className="text-primary-400 font-medium">real-time feedback</span> and{' '}
            <span className="text-secondary-400 font-medium">interactive challenges</span>.{' '}
            Master complex robotic systems without expensive hardware.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button 
              className="group relative overflow-hidden bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white text-lg px-10 py-4 rounded-xl font-bold transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/25 hover:-translate-y-1 active:translate-y-0 hover:scale-105 border border-primary-400/20"
              onClick={() => navigate('/simulator')}
            >
              <div className="flex items-center justify-center relative z-10">
                <Play size={22} className="mr-3 group-hover:scale-110 transition-transform duration-300" />
                <span className="tracking-wide">Start Simulator</span>
                <ArrowRight size={22} className="ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
            
            <button 
              className="group bg-transparent text-primary-400 hover:text-white text-lg px-10 py-4 rounded-xl font-bold transition-all duration-500 hover:bg-gradient-to-r hover:from-primary-500/20 hover:to-secondary-500/20 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary-500/15 hover:-translate-y-1 active:translate-y-0 border-2 border-primary-400/30 hover:border-primary-400/50"
              onClick={() => navigate('/challenges')}
            >
              <div className="flex items-center justify-center">
                <Award size={22} className="mr-3 group-hover:scale-110 transition-transform duration-300" />
                <span className="tracking-wide">View Challenges</span>
              </div>
            </button>
          </motion.div>

          {/* Social proof */}
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-8 text-base text-dark-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="flex items-center group hover:text-primary-400 transition-all duration-300 cursor-pointer">
              <Users size={18} className="mr-2 text-primary-400 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold tracking-wide">Growing Community</span>
            </div>
            <div className="flex items-center group hover:text-secondary-400 transition-all duration-300 cursor-pointer">
              <Award size={18} className="mr-2 text-secondary-400 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold tracking-wide">Interactive Learning</span>
            </div>
            <div className="flex items-center group hover:text-accent-400 transition-all duration-300 cursor-pointer">
              <Star size={18} className="mr-2 text-accent-400 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold tracking-wide">Open Source</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Feature highlights */}
      <motion.div 
        className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        {[
          {
            icon: <Cpu size={28} />, 
            title: 'Multiple Robot Types',
            description: 'Control robotic arms, mobile robots, drones, and specialized automation systems in physics-accurate 3D simulations.', 
            color: 'primary'
          },
          {
            icon: <Brain size={28} />, 
            title: 'AI-Powered Learning',
            description: 'Write code in natural language with intelligent suggestions and personalized learning paths.', 
            color: 'secondary'
          },
          {
            icon: <Layers size={28} />, 
            title: 'Progressive Curriculum',
            description: 'Master robotics through structured lessons from basic movements to advanced autonomous systems.', 
            color: 'accent'
          }
        ].map((feature, index) => (
          <motion.div 
            key={feature.title} 
            className="group relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
          >
            <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-gradient-to-br from-dark-700/30 to-dark-800/30 backdrop-blur-sm hover:from-dark-700/50 hover:to-dark-800/50 transition-all duration-500 h-full border border-dark-600/40 hover:border-dark-500/60 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
              <div className={`bg-gradient-to-br from-${feature.color}-500 to-${feature.color}-600 p-5 rounded-2xl mb-6 shadow-lg group-hover:shadow-${feature.color}-500/40 group-hover:scale-110 transition-all duration-500 border border-${feature.color}-400/20`}>
                <div className="text-white">{feature.icon}</div>
              </div>
              <h3 className="font-bold text-white mb-4 text-xl group-hover:text-white transition-colors tracking-wide">
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

  {/* Enhanced CSS for animations */}
  <style jsx>{`
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
    }
    
    .animate-float {
      animation: float 4s ease-in-out infinite;
    }
    
    .shadow-glow {
      box-shadow: 0 0 15px currentColor;
    }
  `}</style>
</div>
);
};

export default Hero;