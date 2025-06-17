import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Cpu, Brain, Layers, Star, Users, Award, Zap, Target } from 'lucide-react';

const Hero = () => {
  const [armSequence, setArmSequence] = useState(0);
  const [dronePosition, setDronePosition] = useState(0);
  
  useEffect(() => {
    const armInterval = setInterval(() => {
      setArmSequence(prev => (prev + 1) % 4);
    }, 3000);
    
    const droneInterval = setInterval(() => {
      setDronePosition(prev => (prev + 1) % 3);
    }, 4000);
    
    return () => {
      clearInterval(armInterval);
      clearInterval(droneInterval);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Enhanced Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl animate-pulse" style={{animationDuration: '4s'}}></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/4 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s', animationDuration: '6s'}}></div>
      </div>
      
      {/* Improved Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:80px_80px] opacity-30"></div>
      
      {/* Subtle circuit pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-0.5 bg-blue-400"></div>
        <div className="absolute top-20 left-52 w-0.5 h-16 bg-blue-400"></div>
        <div className="absolute top-36 left-48 w-8 h-8 border border-blue-400 rounded-full"></div>
        <div className="absolute bottom-32 right-24 w-24 h-0.5 bg-purple-400"></div>
        <div className="absolute bottom-32 right-48 w-0.5 h-12 bg-purple-400"></div>
        <div className="absolute bottom-20 right-44 w-6 h-6 border border-purple-400"></div>
      </div>
      
      {/* Sophisticated Robotic Arm - Top Right */}
      <div className="absolute top-12 right-12 hidden xl:block">
        <div className="relative w-56 h-72">
          {/* Base platform */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-gradient-to-t from-gray-800 to-gray-700 rounded-lg border border-gray-600"></div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full border-2 border-blue-400 shadow-lg shadow-blue-500/30"></div>
          
          {/* Main arm base */}
          <div 
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-4 h-24 bg-gradient-to-t from-gray-700 to-gray-600 rounded-full transition-all duration-2000 origin-bottom border border-gray-500"
            style={{
              transform: `translateX(-50%) rotate(${
                armSequence === 0 ? 0 : 
                armSequence === 1 ? 20 : 
                armSequence === 2 ? -15 : 10
              }deg)`
            }}
          >
            {/* First joint */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full border-2 border-blue-400 shadow-lg"></div>
            
            {/* Second arm segment */}
            <div 
              className="absolute -top-28 left-1/2 transform -translate-x-1/2 w-4 h-24 bg-gradient-to-t from-gray-700 to-gray-600 rounded-full transition-all duration-2000 origin-bottom border border-gray-500"
              style={{
                transform: `translateX(-50%) rotate(${
                  armSequence === 0 ? 0 : 
                  armSequence === 1 ? -35 : 
                  armSequence === 2 ? 40 : -20
                }deg)`
              }}
            >
              {/* Second joint */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full border-2 border-purple-400 shadow-lg"></div>
              
              {/* End effector */}
              <div 
                className="absolute -top-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000"
                style={{
                  transform: `translateX(-50%) rotate(${armSequence === 3 ? 45 : 0}deg)`
                }}
              >
                <div className="flex gap-1">
                  <div className="w-2 h-4 bg-cyan-500 rounded-sm border border-cyan-400"></div>
                  <div className="w-2 h-4 bg-cyan-500 rounded-sm border border-cyan-400"></div>
                </div>
                <div className="absolute top-1 left-1.5 w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
          
          {/* Holographic interface */}
          <div className={`absolute top-0 left-0 transition-all duration-1000 ${armSequence === 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="bg-gradient-to-br from-blue-900/60 to-purple-900/60 backdrop-blur-md border border-blue-400/40 rounded-xl p-4 shadow-xl">
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                <div className="text-green-400 text-xs font-mono font-bold">ROBOT ARM ONLINE</div>
              </div>
              <div className="text-blue-300 text-xs font-mono mb-1">Position: [X:45, Y:12, Z:88]</div>
              <div className="text-purple-300 text-xs font-mono mb-1">Status: ACTIVE</div>
              <div className="text-cyan-300 text-xs font-mono">Mode: LEARNING</div>
              <div className="mt-2 flex gap-1">
                <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse" style={{width: '75%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Drone - Top Left */}
      <div className="absolute top-16 left-16 hidden xl:block">
        <div 
          className="relative transition-all duration-3000"
          style={{
            transform: `translateY(${
              dronePosition === 0 ? 0 : 
              dronePosition === 1 ? -20 : 10
            }px) translateX(${
              dronePosition === 0 ? 0 : 
              dronePosition === 1 ? 15 : -10
            }px)`
          }}
        >
          {/* Drone body */}
          <div className="relative w-12 h-8 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full border border-gray-500">
            {/* Propellers */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-2 border-blue-400 rounded-full animate-spin" style={{animationDuration: '0.1s'}}></div>
            <div className="absolute -top-2 -right-2 w-6 h-6 border-2 border-blue-400 rounded-full animate-spin" style={{animationDuration: '0.1s', animationDirection: 'reverse'}}></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-2 border-purple-400 rounded-full animate-spin" style={{animationDuration: '0.1s', animationDirection: 'reverse'}}></div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-2 border-purple-400 rounded-full animate-spin" style={{animationDuration: '0.1s'}}></div>
            
            {/* LED indicators */}
            <div className="absolute top-1 left-1 w-1 h-1 bg-red-400 rounded-full animate-pulse"></div>
            <div className="absolute top-1 right-1 w-1 h-1 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
          
          {/* Scanning beam */}
          <div className={`absolute top-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${dronePosition === 2 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-0.5 h-16 bg-gradient-to-b from-cyan-400 to-transparent animate-pulse"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-8 border border-cyan-400 rounded-full animate-ping"></div>
          </div>
          
          {/* Flight path indicator */}
          <div className="absolute -top-6 -left-8 text-xs text-cyan-400 font-mono opacity-60">
            PATROL MODE
          </div>
        </div>
      </div>
      
      {/* Mobile Robot - Bottom Right */}
      <div className="absolute bottom-20 right-16 hidden lg:block">
        <div className="animate-bounce" style={{animationDuration: '4s', animationDelay: '1s'}}>
          <div className="relative w-16 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg border border-gray-600">
            {/* Wheels */}
            <div className="absolute -left-1 top-1 w-3 h-3 bg-gray-800 rounded-full border border-gray-600 animate-spin" style={{animationDuration: '2s'}}></div>
            <div className="absolute -left-1 bottom-1 w-3 h-3 bg-gray-800 rounded-full border border-gray-600 animate-spin" style={{animationDuration: '2s'}}></div>
            <div className="absolute -right-1 top-1 w-3 h-3 bg-gray-800 rounded-full border border-gray-600 animate-spin" style={{animationDuration: '2s'}}></div>
            <div className="absolute -right-1 bottom-1 w-3 h-3 bg-gray-800 rounded-full border border-gray-600 animate-spin" style={{animationDuration: '2s'}}></div>
            
            {/* Sensor */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            
            {/* Status lights */}
            <div className="absolute top-1 left-1 w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
            <div className="absolute top-1 right-1 w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          </div>
          
          {/* Movement trail */}
          <div className="absolute top-6 -left-8 flex gap-1 opacity-40">
            <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
          </div>
        </div>
      </div>
      
      {/* Refined floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-30"
            style={{
              left: `${15 + (i * 10)}%`,
              top: `${25 + (i * 8)}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: '4s'
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10 pt-20 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center min-h-[80vh] justify-center">
            {/* Centered Content */}
            <div className="text-center max-w-5xl">
              {/* Enhanced Badge */}
              <div className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-400 text-sm font-medium mb-12 backdrop-blur-sm border border-blue-400/20 hover:bg-blue-500/20 transition-all duration-300 hover:scale-105 shadow-lg">
                <Star size={18} className="mr-3" />
                <span className="font-semibold">Built by students, powered by innovation</span>
                <Zap size={18} className="ml-3 animate-pulse" />
              </div>

              {/* Main Headline */}
              <div className="relative mb-12">
                <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-tight">
                  <div className="text-white mb-4">Master Robotics</div>
                  <div className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent font-black relative">
                    Without Hardware
                    {/* Enhanced animated underline */}
                    <div className="absolute -bottom-4 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 rounded-full opacity-40 animate-pulse"></div>
                    <div className="absolute -bottom-4 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
                  </div>
                </h1>
                
                {/* Repositioned floating code elements - better spacing */}
                <div className="absolute -top-8 -right-16 hidden 2xl:block opacity-80">
                  <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-md rounded-xl p-4 border border-blue-400/30 text-sm font-mono text-blue-300 shadow-xl animate-bounce" style={{animationDelay: '2s', animationDuration: '4s'}}>
                    <div className="flex items-center mb-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      <span className="text-green-400 text-xs">EXECUTING</span>
                    </div>
                    <div>robot.moveForward()</div>
                    <div className="text-green-400 text-xs mt-1"># Learning trajectory...</div>
                  </div>
                </div>
                
                <div className="absolute -bottom-12 -left-16 hidden 2xl:block opacity-80">
                  <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-md rounded-xl p-4 border border-purple-400/30 text-sm font-mono text-purple-300 shadow-xl animate-bounce" style={{animationDelay: '3s', animationDuration: '4s'}}>
                    <div className="flex items-center mb-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-purple-400 text-xs">SUCCESS</span>
                    </div>
                    <div>arm.pickAndPlace()</div>
                    <div className="text-green-400 text-xs mt-1"># Task completed!</div>
                  </div>
                </div>
              </div>

              {/* Enhanced Subtitle */}
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-16 leading-relaxed tracking-wide max-w-4xl mx-auto font-light">
                Master robotics programming through immersive 3D simulations. 
                <span className="text-blue-400 font-medium"> No hardware required</span>, 
                just pure learning and innovation.
              </p>

              {/* Enhanced Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-8 justify-center mb-20">
                <button className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg px-12 py-6 rounded-2xl font-bold transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-2 active:translate-y-0 hover:scale-105 border border-blue-400/20">
                  <div className="flex items-center justify-center relative z-10">
                    <Play size={28} className="mr-4 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-xl">Start Simulator</span>
                    <ArrowRight size={28} className="ml-4 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
                </button>
                
                <button className="group bg-transparent text-blue-400 hover:text-white text-lg px-12 py-6 rounded-2xl font-bold transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-2 active:translate-y-0 border-2 border-blue-400/30 hover:border-blue-400/60">
                  <div className="flex items-center justify-center">
                    <Target size={28} className="mr-4 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-xl">View Challenges</span>
                  </div>
                </button>
              </div>

              {/* Enhanced Social proof */}
              <div className="flex flex-wrap items-center justify-center gap-12 text-base text-gray-400">
                <div className="flex items-center group hover:text-blue-400 transition-all duration-300 hover:scale-110">
                  <Users size={24} className="mr-3 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-semibold">Growing Community</span>
                </div>
                <div className="flex items-center group hover:text-purple-400 transition-all duration-300 hover:scale-110">
                  <Award size={24} className="mr-3 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-semibold">Interactive Learning</span>
                </div>
                <div className="flex items-center group hover:text-cyan-400 transition-all duration-300 hover:scale-110">
                  <Star size={24} className="mr-3 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-semibold">Open Source</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Feature highlights */}
          <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: <Cpu size={32} />, 
                title: 'Multiple Robot Types',
                description: 'Control robotic arms, mobile robots, drones, and specialized bots in realistic physics simulations with advanced AI behavior', 
                color: 'blue',
                accent: 'from-blue-500 to-blue-600'
              },
              {
                icon: <Brain size={32} />, 
                title: 'AI-Powered Learning',
                description: 'Natural language programming with intelligent code suggestions, real-time feedback, and adaptive learning algorithms', 
                color: 'purple',
                accent: 'from-purple-500 to-purple-600'
              },
              {
                icon: <Layers size={32} />, 
                title: 'Progressive Curriculum',
                description: 'Structured learning path from basic movements to complex autonomous systems and advanced robotics concepts', 
                color: 'cyan',
                accent: 'from-cyan-500 to-cyan-600'
              }
            ].map((feature, index) => (
              <div key={feature.title} className="group relative">
                <div className="flex flex-col items-center text-center p-10 rounded-3xl bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-md hover:from-gray-800/40 hover:to-gray-900/40 transition-all duration-500 h-full border border-gray-700/40 hover:border-gray-600/60 hover:shadow-2xl hover:-translate-y-2 hover:scale-105">
                  <div className={`bg-gradient-to-br ${feature.accent} p-6 rounded-3xl mb-8 shadow-xl shadow-${feature.color}-500/30 group-hover:shadow-${feature.color}-500/50 group-hover:scale-110 transition-all duration-500 border border-${feature.color}-400/20`}>
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <h3 className="font-bold text-white mb-6 text-xl group-hover:text-white transition-colors">
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
    </div>
  );
};

export default Hero;