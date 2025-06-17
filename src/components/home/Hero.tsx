import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Cpu, Brain, Layers, Star, Users, Award } from 'lucide-react';

const Hero = () => {
  const [armPosition, setArmPosition] = useState(0);
  const [robotEyesBlink, setRobotEyesBlink] = useState(false);
  const [codeIndex, setCodeIndex] = useState(0);
  
  const codeSnippets = [
    { code: "robot.moveForward()", status: "# Executing..." },
    { code: "arm.grab(object)", status: "# Success!" },
    { code: "drone.takeOff()", status: "# Flying..." },
    { code: "sensor.scan()", status: "# Detecting..." }
  ];

  useEffect(() => {
    // Robotic arm animation
    const armInterval = setInterval(() => {
      setArmPosition(prev => (prev + 1) % 4);
    }, 3000);

    // Robot eye blinking
    const blinkInterval = setInterval(() => {
      setRobotEyesBlink(true);
      setTimeout(() => setRobotEyesBlink(false), 150);
    }, 4000);

    // Code snippet rotation
    const codeInterval = setInterval(() => {
      setCodeIndex(prev => (prev + 1) % codeSnippets.length);
    }, 2500);
    
    return () => {
      clearInterval(armInterval);
      clearInterval(blinkInterval);
      clearInterval(codeInterval);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Enhanced Background effects - positioned to avoid text overlap */}
      <div className="absolute inset-0">
        <div className="absolute top-1/6 left-1/6 w-72 h-72 bg-blue-500/6 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/6 right-1/6 w-64 h-64 bg-purple-500/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-3/4 left-1/3 w-48 h-48 bg-cyan-500/4 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>
      </div>
      
      {/* Improved Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.015)_1px,transparent_1px)] bg-[size:80px_80px] opacity-30"></div>
      
      {/* Enhanced floating particles - positioned away from center */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-15"
            style={{
              left: `${5 + (i * 11)}%`,
              top: `${15 + (i * 8)}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: '4s'
            }}
          />
        ))}
        {[...Array(6)].map((_, i) => (
          <div
            key={`right-${i}`}
            className="absolute w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-15"
            style={{
              right: `${5 + (i * 12)}%`,
              bottom: `${20 + (i * 10)}%`,
              animationDelay: `${i * 1.2}s`,
              animationDuration: '5s'
            }}
          />
        ))}
      </div>
      
      {/* Enhanced Robotic Arm Animation - repositioned and improved */}
      <div className="absolute top-16 right-4 xl:right-12 hidden lg:block z-0">
        <div className="relative w-56 h-72">
          {/* Base with improved styling */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-10 bg-gradient-to-t from-gray-700 to-gray-600 rounded-lg shadow-lg">
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-12 h-2 bg-blue-500/30 rounded"></div>
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg animate-pulse"></div>
          
          {/* First arm segment with smoother animation */}
          <div 
            className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-4 h-24 bg-gradient-to-t from-gray-700 to-gray-600 rounded-full transition-all duration-2000 ease-in-out origin-bottom shadow-lg"
            style={{
              transform: `translateX(-50%) rotate(${
                armPosition === 0 ? 0 : 
                armPosition === 1 ? 20 : 
                armPosition === 2 ? -15 : 
                10
              }deg)`
            }}
          >
            {/* Joint with glow effect */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg">
              <div className="absolute inset-1 bg-blue-400 rounded-full animate-pulse opacity-50"></div>
            </div>
            
            {/* Second arm segment */}
            <div 
              className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-4 h-24 bg-gradient-to-t from-gray-700 to-gray-600 rounded-full transition-all duration-2000 ease-in-out origin-bottom shadow-lg"
              style={{
                transform: `translateX(-50%) rotate(${
                  armPosition === 0 ? 0 : 
                  armPosition === 1 ? -35 : 
                  armPosition === 2 ? 30 : 
                  -20
                }deg)`
              }}
            >
              {/* Enhanced end effector */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 flex">
                <div className="w-3 h-4 bg-gradient-to-b from-blue-500 to-blue-600 rounded-sm mr-1 shadow-md"></div>
                <div className="w-3 h-4 bg-gradient-to-b from-blue-500 to-blue-600 rounded-sm shadow-md"></div>
                <div className="absolute top-2 left-2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-glow"></div>
                {/* Grabbing indicator */}
                {armPosition === 2 && (
                  <div className="absolute -top-2 left-1 w-4 h-2 bg-green-400 rounded opacity-80 animate-pulse"></div>
                )}
              </div>
            </div>
          </div>
          
          {/* Enhanced status display */}
          <div className="absolute -top-4 -right-4 transition-all duration-500">
            <div className="bg-gray-900/60 backdrop-blur-md border border-blue-400/40 rounded-xl p-3 text-xs shadow-xl">
              <div className="text-blue-400 font-mono font-bold">ROBOT ARM</div>
              <div className={`font-mono transition-colors duration-300 ${
                armPosition === 0 ? 'text-yellow-400' :
                armPosition === 1 ? 'text-blue-400' :
                armPosition === 2 ? 'text-green-400' :
                'text-purple-400'
              }`}>
                {armPosition === 0 ? 'IDLE' :
                 armPosition === 1 ? 'MOVING' :
                 armPosition === 2 ? 'GRABBING' :
                 'RETURNING'}
              </div>
              <div className="flex items-center mt-2">
                <div className={`w-2 h-2 rounded-full animate-pulse mr-2 ${
                  armPosition === 2 ? 'bg-green-400' : 'bg-blue-400'
                }`}></div>
                <span className="text-gray-300 text-xs font-mono">
                  {armPosition === 2 ? 'SUCCESS' : 'ACTIVE'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Floating Robot - repositioned */}
      <div className="absolute top-20 left-4 xl:left-12 hidden lg:block animate-float z-0">
        <div className="relative">
          {/* Robot body with better proportions */}
          <div className="w-20 h-24 bg-gradient-to-b from-gray-600 to-gray-700 rounded-xl relative shadow-xl">
            {/* Head */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-b from-gray-600 to-gray-700 rounded-full shadow-lg">
              {/* Eyes with blinking animation */}
              <div className={`absolute top-4 left-3 w-3 h-3 bg-blue-400 rounded-full transition-all duration-150 shadow-glow ${
                robotEyesBlink ? 'scale-y-0' : 'scale-y-100'
              }`}></div>
              <div className={`absolute top-4 right-3 w-3 h-3 bg-blue-400 rounded-full transition-all duration-150 shadow-glow ${
                robotEyesBlink ? 'scale-y-0' : 'scale-y-100'
              }`}></div>
              {/* Antenna */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-blue-400 shadow-sm"></div>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full animate-ping shadow-glow"></div>
            </div>
            
            {/* Arms */}
            <div className="absolute top-3 -left-3 w-4 h-10 bg-gradient-to-b from-gray-600 to-gray-700 rounded-full shadow-md"></div>
            <div className="absolute top-3 -right-3 w-4 h-10 bg-gradient-to-b from-gray-600 to-gray-700 rounded-full shadow-md"></div>
            
            {/* Enhanced chest panel */}
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-10 h-8 bg-gray-900 rounded-lg border border-blue-400/40 shadow-inner">
              <div className="w-full h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mt-1 rounded"></div>
              <div className="w-4/5 h-1 bg-gradient-to-r from-green-400 to-emerald-400 mt-1 ml-1 rounded"></div>
              <div className="w-3/5 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mt-1 ml-1 rounded"></div>
              <div className="absolute bottom-1 right-1 w-1 h-1 bg-red-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Dynamic speech bubble */}
          <div className="absolute -top-12 -right-6 transition-all duration-500">
            <div className="bg-gray-900/70 backdrop-blur-md border border-blue-400/40 rounded-xl px-3 py-2 shadow-xl">
              <div className="text-blue-400 text-xs font-mono whitespace-nowrap">
                {robotEyesBlink ? 'Processing...' : 'Ready to learn!'}
              </div>
              <div className="absolute bottom-0 left-4 transform translate-y-full">
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-400/40"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 pt-20 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center min-h-[80vh]">
            {/* Main Content - properly spaced from animations */}
            <div className="text-center px-4 lg:px-16 xl:px-24">
              {/* Badge */}
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-8 backdrop-blur-sm border border-blue-400/20 hover:bg-blue-500/20 transition-all duration-300 animate-pulse">
                <Star size={16} className="mr-2" />
                <span>Built by students, powered by innovation</span>
              </div>

              {/* Main Headline */}
              <div className="relative">
                <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight mb-8">
                  <div className="text-white mb-2">Master Robotics</div>
                  <div className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent font-black relative">
                    Without Hardware
                    {/* Animated underline */}
                    <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 rounded-full opacity-50 animate-pulse"></div>
                  </div>
                </h1>
                
                {/* Floating code elements - repositioned to avoid overlap */}
                <div className="absolute -top-8 -right-4 md:-right-12 hidden xl:block">
                  <div className="bg-gray-900/80 backdrop-blur-md rounded-xl p-4 border border-blue-400/40 text-sm font-mono text-blue-300 animate-float shadow-xl" style={{animationDelay: '1s', animationDuration: '4s'}}>
                    <div className="text-blue-400">{codeSnippets[codeIndex].code}</div>
                    <div className="text-green-400 text-xs mt-1">{codeSnippets[codeIndex].status}</div>
                  </div>
                </div>
                
                <div className="absolute -bottom-8 -left-4 md:-left-12 hidden xl:block">
                  <div className="bg-gray-900/80 backdrop-blur-md rounded-xl p-4 border border-purple-400/40 text-sm font-mono text-purple-300 animate-float shadow-xl" style={{animationDelay: '2s', animationDuration: '4s'}}>
                    <div className="text-purple-400">neural_net.train()</div>
                    <div className="text-green-400 text-xs mt-1"># Learning AI...</div>
                  </div>
                </div>
              </div>

              {/* Subtitle */}
              <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-12 leading-relaxed tracking-wide max-w-4xl mx-auto font-light">
                Master Robotics Without Hardware. Learn robotics programming through immersive 3D simulations with real-time feedback and interactive challenges.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <button className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-lg px-10 py-5 rounded-2xl font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 hover:-translate-y-1 active:translate-y-0 hover:scale-105">
                  <div className="flex items-center justify-center relative z-10">
                    <Play size={24} className="mr-3 group-hover:scale-110 transition-transform duration-300" />
                    <span>Start Simulator</span>
                    <ArrowRight size={24} className="ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
                <button className="group bg-transparent text-blue-400 hover:text-white text-lg px-10 py-5 rounded-2xl font-semibold transition-all duration-300 hover:bg-blue-500/10 backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 active:translate-y-0 border border-blue-400/20 hover:border-blue-400/40">
                  <div className="flex items-center justify-center">
                    <Award size={24} className="mr-3 group-hover:scale-110 transition-transform duration-300" />
                    <span>View Challenges</span>
                  </div>
                </button>
              </div>

              {/* Social proof */}
              <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400">
                <div className="flex items-center group hover:text-blue-400 transition-colors duration-300">
                  <Users size={18} className="mr-2 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">Growing Community</span>
                </div>
                <div className="flex items-center group hover:text-purple-400 transition-colors duration-300">
                  <Award size={18} className="mr-2 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">Interactive Learning</span>
                </div>
                <div className="flex items-center group hover:text-cyan-400 transition-colors duration-300">
                  <Star size={18} className="mr-2 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">Open Source</span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature highlights */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Cpu size={28} />, title: 'Multiple Robot Types',
                description: 'Control arms, mobile robots, drones, and specialized bots in realistic physics simulations', 
                color: 'blue'
              },
              {
                icon: <Brain size={28} />, title: 'AI-Powered Learning',
                description: 'Natural language programming with intelligent code suggestions and real-time feedback', 
                color: 'purple'
              },
              {
                icon: <Layers size={28} />, title: 'Progressive Curriculum',
                description: 'Structured learning path from basic movements to complex autonomous systems', 
                color: 'cyan'
              }
            ].map((feature, index) => (
              <div key={feature.title} className="group relative">
                <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-gray-800/20 backdrop-blur-sm hover:bg-gray-800/30 transition-all duration-300 h-full border border-gray-700/30 hover:border-gray-600/50 hover:shadow-xl hover:-translate-y-1">
                  <div className={`bg-gradient-to-br from-${feature.color}-500 to-${feature.color}-600 p-4 rounded-2xl mb-6 shadow-lg group-hover:shadow-${feature.color}-500/40 group-hover:scale-110 transition-all duration-300`}>
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <h3 className="font-bold text-white mb-4 text-lg group-hover:text-white transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm group-hover:text-gray-300 transition-colors">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Custom CSS for additional animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(-5px) rotate(-1deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .shadow-glow {
          box-shadow: 0 0 10px currentColor;
        }
      `}</style>
    </div>
  );
};

export default Hero;