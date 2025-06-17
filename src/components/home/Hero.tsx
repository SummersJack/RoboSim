import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Cpu, Brain, Layers, Star, Users, Award } from 'lucide-react';

const Hero = () => {
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
    const particles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.3 + 0.1
    }));
    setParticlePositions(particles);

    // Robotic arm animation with smoother transitions
    const armInterval = setInterval(() => {
      setArmPosition(prev => (prev + 1) % 5);
    }, 3500);

    // Robot eye blinking with more natural timing
    const blinkInterval = setInterval(() => {
      setRobotEyesBlink(true);
      setTimeout(() => setRobotEyesBlink(false), 120);
    }, 3500 + Math.random() * 2000);

    // Code snippet rotation with fade effect
    const codeInterval = setInterval(() => {
      setCodeIndex(prev => (prev + 1) % codeSnippets.length);
    }, 3000);

    // Particle animation
    const particleInterval = setInterval(() => {
      setParticlePositions(prev => 
        prev.map(particle => ({
          ...particle,
          x: (particle.x + particle.speed) % 100,
          y: particle.y + Math.sin(Date.now() * 0.001 + particle.id) * 0.1
        }))
      );
    }, 50);
    
    return () => {
      clearInterval(armInterval);
      clearInterval(blinkInterval);
      clearInterval(codeInterval);
      clearInterval(particleInterval);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-blue-950/20 to-gray-900">
      {/* Enhanced Background effects with better positioning */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/5 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/5 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-2/3 left-1/2 w-64 h-64 bg-cyan-500/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-1/6 right-1/3 w-48 h-48 bg-emerald-500/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '6s'}}></div>
      </div>
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:100px_100px] opacity-40 animate-pulse"></div>
      
      {/* Dynamic floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particlePositions.map((particle) => (
          <div
            key={particle.id}
            className="absolute bg-blue-400 rounded-full animate-pulse transition-all duration-1000"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animationDelay: `${particle.id * 0.5}s`,
              animationDuration: `${3 + particle.id * 0.2}s`
            }}
          />
        ))}
      </div>
      
      {/* Enhanced Robotic Arm Animation */}
      <div className="absolute top-20 right-8 xl:right-16 hidden lg:block z-0">
        <div className="relative w-64 h-80">
          {/* Enhanced base with power indicator */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-12 bg-gradient-to-t from-gray-800 to-gray-700 rounded-xl shadow-2xl border border-gray-600">
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-14 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded animate-pulse"></div>
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
              <div className="w-1 h-1 bg-green-400 rounded-full animate-ping"></div>
              <div className="w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
              <div className="w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
          
          {/* Power core with pulsing energy */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full shadow-2xl animate-pulse border-2 border-blue-400">
            <div className="absolute inset-2 bg-white rounded-full animate-ping opacity-40"></div>
          </div>
          
          {/* First arm segment with enhanced animation */}
          <div 
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-5 h-28 bg-gradient-to-t from-gray-800 to-gray-700 rounded-full transition-all duration-3000 ease-in-out origin-bottom shadow-xl border border-gray-600"
            style={{
              transform: `translateX(-50%) rotate(${
                armPosition === 0 ? 0 : 
                armPosition === 1 ? 25 : 
                armPosition === 2 ? -20 : 
                armPosition === 3 ? 15 :
                -5
              }deg)`
            }}
          >
            {/* Enhanced joint with energy rings */}
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-xl border-2 border-blue-400">
              <div className="absolute inset-1 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full animate-pulse opacity-60"></div>
              <div className="absolute inset-3 bg-white rounded-full animate-ping opacity-30"></div>
            </div>
            
            {/* Second arm segment with synchronized movement */}
            <div 
              className="absolute -top-28 left-1/2 transform -translate-x-1/2 w-5 h-28 bg-gradient-to-t from-gray-800 to-gray-700 rounded-full transition-all duration-3000 ease-in-out origin-bottom shadow-xl border border-gray-600"
              style={{
                transform: `translateX(-50%) rotate(${
                  armPosition === 0 ? 0 : 
                  armPosition === 1 ? -40 : 
                  armPosition === 2 ? 35 : 
                  armPosition === 3 ? -25 :
                  10
                }deg)`
              }}
            >
              {/* Advanced end effector with sensors */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex items-center">
                <div className={`w-4 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-t-sm mr-1 shadow-lg transition-all duration-500 ${
                  armPosition === 2 ? 'rotate-12' : ''
                }`}></div>
                <div className={`w-4 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-t-sm shadow-lg transition-all duration-500 ${
                  armPosition === 2 ? '-rotate-12' : ''
                }`}></div>
                
                {/* Sensor array */}
                <div className="absolute top-2 left-3 w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-glow"></div>
                <div className="absolute top-4 left-2 w-1 h-1 bg-green-400 rounded-full animate-ping"></div>
                <div className="absolute top-4 left-4 w-1 h-1 bg-red-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                
                {/* Object detection indicator */}
                {armPosition === 2 && (
                  <div className="absolute -top-3 left-1 w-6 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded opacity-90 animate-pulse shadow-glow">
                    <div className="text-xs text-white text-center font-bold">●</div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Enhanced status display with more information */}
          <div className="absolute -top-6 -right-6 transition-all duration-500">
            <div className="bg-gray-900/80 backdrop-blur-md border border-blue-400/40 rounded-xl p-4 text-xs shadow-2xl min-w-[120px]">
              <div className="text-blue-400 font-mono font-bold mb-1">ROBOT ARM</div>
              <div className={`font-mono font-bold transition-colors duration-300 mb-2 ${
                armPosition === 0 ? 'text-yellow-400' :
                armPosition === 1 ? 'text-blue-400' :
                armPosition === 2 ? 'text-green-400' :
                armPosition === 3 ? 'text-purple-400' :
                'text-cyan-400'
              }`}>
                {armPosition === 0 ? 'STANDBY' :
                 armPosition === 1 ? 'MOVING' :
                 armPosition === 2 ? 'GRASPING' :
                 armPosition === 3 ? 'LIFTING' :
                 'RESETTING'}
              </div>
              <div className="flex items-center justify-between">
                <div className={`w-2 h-2 rounded-full animate-pulse ${
                  armPosition === 2 ? 'bg-green-400' : 'bg-blue-400'
                }`}></div>
                <span className="text-gray-300 text-xs font-mono ml-2">
                  {armPosition === 2 ? 'ENGAGED' : 'ACTIVE'}
                </span>
              </div>
              <div className="mt-2 text-gray-400 text-xs">
                Joint: {armPosition + 1}/5
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Floating Robot with better animations */}
      <div className="absolute top-24 left-8 xl:left-16 hidden lg:block animate-float z-0">
        <div className="relative">
          {/* Robot body with improved design */}
          <div className="w-24 h-28 bg-gradient-to-b from-gray-700 to-gray-800 rounded-2xl relative shadow-2xl border border-gray-600">
            {/* Enhanced head */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-b from-gray-700 to-gray-800 rounded-full shadow-xl border border-gray-600">
              {/* Eyes with improved blinking */}
              <div className={`absolute top-5 left-4 w-4 h-4 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full transition-all duration-150 shadow-glow ${
                robotEyesBlink ? 'scale-y-0 scale-x-90' : 'scale-y-100 scale-x-100'
              }`}>
                <div className="absolute inset-1 bg-white rounded-full opacity-60"></div>
              </div>
              <div className={`absolute top-5 right-4 w-4 h-4 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full transition-all duration-150 shadow-glow ${
                robotEyesBlink ? 'scale-y-0 scale-x-90' : 'scale-y-100 scale-x-100'
              }`}>
                <div className="absolute inset-1 bg-white rounded-full opacity-60"></div>
              </div>
              
              {/* Enhanced antenna system */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-1 h-6 bg-gradient-to-t from-blue-400 to-cyan-500 shadow-sm"></div>
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full animate-ping shadow-glow"></div>
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-pulse"></div>
            </div>
            
            {/* Enhanced arms with joints */}
            <div className="absolute top-4 -left-4 w-5 h-12 bg-gradient-to-b from-gray-700 to-gray-800 rounded-full shadow-lg border border-gray-600">
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
            </div>
            <div className="absolute top-4 -right-4 w-5 h-12 bg-gradient-to-b from-gray-700 to-gray-800 rounded-full shadow-lg border border-gray-600">
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
            </div>
            
            {/* Advanced chest panel with more details */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-12 h-10 bg-gray-900 rounded-xl border border-blue-400/40 shadow-inner p-1">
              <div className="w-full h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mb-1 rounded animate-pulse"></div>
              <div className="w-4/5 h-1 bg-gradient-to-r from-green-400 to-emerald-400 mb-1 ml-1 rounded animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="w-3/5 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mb-1 ml-1 rounded animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="flex justify-between items-center mt-2">
                <div className="w-1 h-1 bg-red-400 rounded-full animate-ping"></div>
                <div className="w-1 h-1 bg-green-400 rounded-full animate-ping" style={{animationDelay: '0.3s'}}></div>
                <div className="w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '0.6s'}}></div>
              </div>
            </div>
          </div>
          
          {/* Enhanced speech bubble with context awareness */}
          <div className="absolute -top-16 -right-8 transition-all duration-500">
            <div className="bg-gray-900/80 backdrop-blur-md border border-blue-400/40 rounded-xl px-4 py-3 shadow-2xl">
              <div className="text-blue-400 text-xs font-mono whitespace-nowrap font-medium">
                {robotEyesBlink ? 'Processing data...' : 
                 armPosition === 2 ? 'Analyzing movement!' :
                 'Systems online!'}
              </div>
              <div className="absolute bottom-0 left-6 transform translate-y-full">
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-blue-400/40"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10 pt-20 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center min-h-[85vh] justify-center">
            {/* Main Content with improved spacing and alignment */}
            <div className="text-center px-4 lg:px-16 xl:px-32 max-w-6xl">
              {/* Enhanced Badge */}
              <div className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-blue-500/15 to-purple-500/15 text-blue-400 text-sm font-semibold mb-12 backdrop-blur-md border border-blue-400/30 hover:bg-gradient-to-r hover:from-blue-500/25 hover:to-purple-500/25 transition-all duration-500 animate-pulse shadow-lg">
                <Star size={18} className="mr-3 animate-spin" style={{animationDuration: '8s'}} />
                <span className="tracking-wide">Built by students, powered by innovation</span>
                <div className="ml-3 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>

              {/* Main Headline with improved typography */}
              <div className="relative mb-16">
                <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] tracking-tight">
                  <div className="text-white mb-6 md:mb-8 drop-shadow-lg">Master Robotics</div>
                  <div className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent font-black relative pb-8">
                    Without Hardware
                    {/* Enhanced animated underline */}
                    <div className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 rounded-full opacity-60">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
                    </div>
                  </div>
                </h1>
                
                {/* Enhanced floating code elements */}
                <div className="absolute -top-12 -right-8 md:-right-16 hidden xl:block">
                  <div className={`bg-gray-900/90 backdrop-blur-md rounded-xl p-5 border-2 text-sm font-mono animate-float shadow-2xl transition-all duration-500 ${
                    codeSnippets[codeIndex].color === 'blue' ? 'border-blue-400/50 shadow-blue-500/20' :
                    codeSnippets[codeIndex].color === 'green' ? 'border-green-400/50 shadow-green-500/20' :
                    codeSnippets[codeIndex].color === 'purple' ? 'border-purple-400/50 shadow-purple-500/20' :
                    'border-cyan-400/50 shadow-cyan-500/20'
                  }`} style={{animationDelay: '1s', animationDuration: '6s'}}>
                    <div className={`${
                      codeSnippets[codeIndex].color === 'blue' ? 'text-blue-400' :
                      codeSnippets[codeIndex].color === 'green' ? 'text-green-400' :
                      codeSnippets[codeIndex].color === 'purple' ? 'text-purple-400' :
                      'text-cyan-400'
                    } font-bold`}>{codeSnippets[codeIndex].code}</div>
                    <div className="text-green-400 text-xs mt-2 opacity-80">{codeSnippets[codeIndex].status}</div>
                    <div className="flex mt-2 space-x-1">
                      <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                      <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
                      <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-16 -left-8 md:-left-16 hidden xl:block">
                  <div className="bg-gray-900/90 backdrop-blur-md rounded-xl p-5 border-2 border-purple-400/50 text-sm font-mono animate-float shadow-2xl shadow-purple-500/20" style={{animationDelay: '3s', animationDuration: '6s'}}>
                    <div className="text-purple-400 font-bold">neural_net.train()</div>
                    <div className="text-green-400 text-xs mt-2 opacity-80"># AI Learning...</div>
                    <div className="w-full bg-gray-800 rounded-full h-1 mt-3">
                      <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-1 rounded-full animate-pulse" style={{width: '73%'}}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Subtitle with better typography */}
              <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-16 leading-relaxed tracking-wide max-w-5xl mx-auto font-light">
                Learn robotics programming through immersive 3D simulations with{' '}
                <span className="text-blue-400 font-medium">real-time feedback</span> and{' '}
                <span className="text-purple-400 font-medium">interactive challenges</span>.{' '}
                Master complex robotic systems without expensive hardware.
              </p>

              {/* Enhanced Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-8 justify-center mb-20">
                <button className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-lg px-12 py-6 rounded-2xl font-bold transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-2 active:translate-y-0 hover:scale-105 border border-blue-400/20">
                  <div className="flex items-center justify-center relative z-10">
                    <Play size={24} className="mr-4 group-hover:scale-125 transition-transform duration-300" />
                    <span className="tracking-wide">Start Simulator</span>
                    <ArrowRight size={24} className="ml-4 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </button>
                
                <button className="group bg-transparent text-blue-400 hover:text-white text-lg px-12 py-6 rounded-2xl font-bold transition-all duration-500 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 backdrop-blur-sm hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 active:translate-y-0 border-2 border-blue-400/30 hover:border-blue-400/60">
                  <div className="flex items-center justify-center">
                    <Award size={24} className="mr-4 group-hover:scale-125 transition-transform duration-300" />
                    <span className="tracking-wide">View Challenges</span>
                  </div>
                </button>
              </div>

              {/* Enhanced social proof */}
              <div className="flex flex-wrap items-center justify-center gap-12 text-base text-gray-400">
                <div className="flex items-center group hover:text-blue-400 transition-all duration-300 cursor-pointer">
                  <Users size={20} className="mr-3 text-blue-400 group-hover:scale-125 transition-transform duration-300" />
                  <span className="font-semibold tracking-wide">Growing Community</span>
                </div>
                <div className="flex items-center group hover:text-purple-400 transition-all duration-300 cursor-pointer">
                  <Award size={20} className="mr-3 text-purple-400 group-hover:scale-125 transition-transform duration-300" />
                  <span className="font-semibold tracking-wide">Interactive Learning</span>
                </div>
                <div className="flex items-center group hover:text-cyan-400 transition-all duration-300 cursor-pointer">
                  <Star size={20} className="mr-3 text-cyan-400 group-hover:scale-125 transition-transform duration-300" />
                  <span className="font-semibold tracking-wide">Open Source</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced feature highlights */}
          <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: <Cpu size={32} />, title: 'Multiple Robot Types',
                description: 'Control robotic arms, mobile robots, drones, and specialized automation systems in physics-accurate 3D simulations with real-world constraints.', 
                color: 'blue'
              },
              {
                icon: <Brain size={32} />, title: 'AI-Powered Learning',
                description: 'Write code in natural language with intelligent suggestions, automated debugging, and personalized learning paths that adapt to your progress.', 
                color: 'purple'
              },
              {
                icon: <Layers size={32} />, title: 'Progressive Curriculum',
                description: 'Master robotics through carefully structured lessons from basic movements to advanced autonomous systems and machine learning integration.', 
                color: 'cyan'
              }
            ].map((feature, index) => (
              <div key={feature.title} className="group relative">
                <div className="flex flex-col items-center text-center p-10 rounded-3xl bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-md hover:from-gray-800/50 hover:to-gray-900/50 transition-all duration-500 h-full border border-gray-700/40 hover:border-gray-600/60 hover:shadow-2xl hover:-translate-y-2 cursor-pointer">
                  <div className={`bg-gradient-to-br from-${feature.color}-500 to-${feature.color}-600 p-6 rounded-3xl mb-8 shadow-xl group-hover:shadow-${feature.color}-500/50 group-hover:scale-110 transition-all duration-500 border border-${feature.color}-400/20`}>
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <h3 className="font-bold text-white mb-6 text-xl group-hover:text-white transition-colors tracking-wide">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
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
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.6), 0 0 40px rgba(59, 130, 246, 0.4); }
        }
        
        @keyframes slideInFromLeft {
          0% { transform: translateX(-100px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideInFromRight {
          0% { transform: translateX(100px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fadeInUp {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes scaleIn {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes textGlow {
          0%, 100% { text-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
          50% { text-shadow: 0 0 30px rgba(59, 130, 246, 0.8), 0 0 40px rgba(147, 51, 234, 0.6); }
        }
        
        @keyframes backgroundShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        
        .animate-slideInLeft {
          animation: slideInFromLeft 0.8s ease-out forwards;
        }
        
        .animate-slideInRight {
          animation: slideInFromRight 0.8s ease-out forwards;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out forwards;
        }
        
        .animate-textGlow {
          animation: textGlow 4s ease-in-out infinite;
        }
        
        .animate-backgroundShift {
          background-size: 200% 200%;
          animation: backgroundShift 8s ease infinite;
        }
        
        .shadow-glow {
          box-shadow: 0 0 20px currentColor;
        }
        
        .text-shadow-glow {
          text-shadow: 0 0 20px currentColor;
        }
        
        /* Staggered animation delays for better visual hierarchy */
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-700 { animation-delay: 0.7s; }
        .delay-800 { animation-delay: 0.8s; }
        
        /* Enhanced hover effects */
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-8px) scale(1.05);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        /* Improved button animations */
        .btn-primary {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8, #7c3aed);
          background-size: 200% 200%;
          animation: backgroundShift 6s ease infinite;
        }
        
        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.8s ease;
        }
        
        .btn-primary:hover::before {
          left: 100%;
        }
        
        /* Enhanced particle effects */
        .particle-field {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        
        .particle {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.8), rgba(59, 130, 246, 0.2));
          animation: float 8s ease-in-out infinite;
        }
        
        /* Improved typography hierarchy */
        .hero-title {
          font-size: clamp(2.5rem, 8vw, 8rem);
          line-height: 0.9;
          letter-spacing: -0.025em;
          font-weight: 900;
        }
        
        .hero-subtitle {
          font-size: clamp(1.125rem, 3vw, 2rem);
          line-height: 1.4;
          font-weight: 300;
          letter-spacing: 0.025em;
        }
        
        /* Enhanced gradient text */
        .gradient-text {
          background: linear-gradient(135deg, #60a5fa, #a855f7, #06b6d4, #10b981);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: backgroundShift 8s ease infinite;
        }
        
        /* Improved glass morphism */
        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        
        /* Enhanced robot animations */
        .robot-container {
          filter: drop-shadow(0 10px 30px rgba(59, 130, 246, 0.3));
        }
        
        .robot-eye {
          background: radial-gradient(circle at 30% 30%, #ffffff, #60a5fa);
          box-shadow: 0 0 15px rgba(96, 165, 250, 0.6);
        }
        
        .robot-antenna {
          background: linear-gradient(to top, #60a5fa, #06b6d4);
          box-shadow: 0 0 10px rgba(96, 165, 250, 0.5);
        }
        
        /* Improved loading states */
        .loading-bar {
          position: relative;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.1);
        }
        
        .loading-bar::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
          animation: slideInFromLeft 2s ease-in-out infinite;
        }
        
        /* Enhanced responsive design */
        @media (max-width: 768px) {
          .hero-title {
            font-size: clamp(2rem, 10vw, 4rem);
          }
          
          .hero-subtitle {
            font-size: clamp(1rem, 4vw, 1.5rem);
          }
          
          .animate-float {
            animation-duration: 4s;
          }
        }
        
        /* Performance optimizations */
        .gpu-optimized {
          transform: translateZ(0);
          will-change: transform;
        }
        
        .reduced-motion {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;