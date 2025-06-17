import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Cpu, Brain, Layers, Star, Users, Award, Zap, Shield, Target } from 'lucide-react';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      {/* Dynamic Background System */}
      <div className="absolute inset-0">
        {/* Primary gradient layer */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.1) 35%, transparent 70%)`
          }}
        />
        
        {/* Secondary ambient lighting */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-secondary-500/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-2/3 left-2/3 w-64 h-64 bg-accent-500/4 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Professional Grid System */}
      <div className="absolute inset-0">
        {/* Primary grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px] opacity-50" />
        {/* Secondary grid for depth */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(147,51,234,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.02)_1px,transparent_1px)] bg-[size:120px_120px] opacity-30" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center min-h-[90vh] justify-center text-center">
            
            {/* Status Badge - Enterprise Grade */}
            <div className={`inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-primary-500/15 to-secondary-500/15 text-primary-400 text-sm font-semibold mb-8 backdrop-blur-md border border-primary-500/30 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="w-2 h-2 bg-success-400 rounded-full mr-3 animate-pulse" />
              <span className="tracking-wide">Built by students, powered by innovation</span>
              <div className="ml-3 flex space-x-1">
                <div className="w-1 h-1 bg-primary-400 rounded-full animate-ping" />
                <div className="w-1 h-1 bg-secondary-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                <div className="w-1 h-1 bg-accent-400 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
              </div>
            </div>

            {/* Main Headline - Maximum Impact */}
            <div className={`relative mb-8 transition-all duration-1200 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] tracking-tight mb-6">
                <div className="text-white mb-4 drop-shadow-2xl">
                  Master Robotics
                </div>
                <div className="bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent relative">
                  Without Hardware
                  {/* Sophisticated underline */}
                  <div className="absolute -bottom-4 left-0 right-0 h-2 bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 rounded-full opacity-60">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-40 animate-pulse" />
                  </div>
                </div>
              </h1>
            </div>

            {/* Value Proposition - Strategic Messaging */}
            <div className={`max-w-4xl mx-auto mb-12 transition-all duration-1200 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-xl md:text-2xl lg:text-3xl text-dark-200 leading-relaxed font-light tracking-wide">
                Learn robotics programming through immersive 3D simulations with{' '}
                <span className="text-primary-400 font-medium bg-primary-500/10 px-2 py-1 rounded">real-time feedback</span> and{' '}
                <span className="text-secondary-400 font-medium bg-secondary-500/10 px-2 py-1 rounded">interactive challenges</span>.{' '}
                Master complex robotic systems without expensive hardware.
              </p>
            </div>

            {/* Primary Actions - Professional CTAs */}
            <div className={`flex flex-col sm:flex-row gap-6 justify-center mb-16 transition-all duration-1200 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <button className="group relative overflow-hidden bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white text-lg px-10 py-5 rounded-2xl font-bold transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/30 hover:-translate-y-1 active:translate-y-0 hover:scale-105 border border-primary-400/20 min-w-[200px]">
                <div className="flex items-center justify-center relative z-10">
                  <Play size={24} className="mr-3 group-hover:scale-125 transition-transform duration-300" />
                  <span className="tracking-wide">Start Simulator</span>
                  <ArrowRight size={24} className="ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>
              
              <button className="group bg-transparent text-primary-400 hover:text-white text-lg px-10 py-5 rounded-2xl font-bold transition-all duration-500 hover:bg-gradient-to-r hover:from-primary-500/20 hover:to-secondary-500/20 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary-500/20 hover:-translate-y-1 active:translate-y-0 border-2 border-primary-400/30 hover:border-primary-400/60 min-w-[200px]">
                <div className="flex items-center justify-center">
                  <Award size={24} className="mr-3 group-hover:scale-125 transition-transform duration-300" />
                  <span className="tracking-wide">View Challenges</span>
                </div>
              </button>
            </div>

            {/* Trust Indicators - Enterprise Credibility */}
            <div className={`flex flex-wrap items-center justify-center gap-8 text-base text-dark-300 mb-16 transition-all duration-1200 delay-800 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center group hover:text-primary-400 transition-all duration-300 cursor-pointer bg-dark-800/30 px-4 py-2 rounded-lg backdrop-blur-sm border border-dark-700/50">
                <Shield size={20} className="mr-3 text-success-400 group-hover:scale-125 transition-transform duration-300" />
                <span className="font-semibold tracking-wide">Enterprise Security</span>
              </div>
              <div className="flex items-center group hover:text-secondary-400 transition-all duration-300 cursor-pointer bg-dark-800/30 px-4 py-2 rounded-lg backdrop-blur-sm border border-dark-700/50">
                <Zap size={20} className="mr-3 text-warning-400 group-hover:scale-125 transition-transform duration-300" />
                <span className="font-semibold tracking-wide">99.9% Uptime</span>
              </div>
              <div className="flex items-center group hover:text-accent-400 transition-all duration-300 cursor-pointer bg-dark-800/30 px-4 py-2 rounded-lg backdrop-blur-sm border border-dark-700/50">
                <Target size={20} className="mr-3 text-primary-400 group-hover:scale-125 transition-transform duration-300" />
                <span className="font-semibold tracking-wide">Industry Standard</span>
              </div>
            </div>

            {/* Feature Highlights - Professional Showcase */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto transition-all duration-1200 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {[
                {
                  icon: <Cpu size={32} />, 
                  title: 'Advanced Simulation Engine',
                  description: 'Industry-grade physics simulation with multiple robot types and real-world constraints in browser-based 3D environments.', 
                  color: 'primary',
                  stats: '6 Robot Types'
                },
                {
                  icon: <Brain size={32} />, 
                  title: 'AI-Powered Learning',
                  description: 'Intelligent programming assistance with natural language processing, automated debugging, and personalized learning paths.', 
                  color: 'secondary',
                  stats: '95% Success Rate'
                },
                {
                  icon: <Layers size={32} />, 
                  title: 'Progressive Curriculum',
                  description: 'Structured learning path from basic movements to advanced autonomous systems with comprehensive challenge library.', 
                  color: 'accent',
                  stats: '100+ Challenges'
                }
              ].map((feature, index) => (
                <div key={feature.title} className="group relative">
                  <div className={`flex flex-col items-center text-center p-8 rounded-3xl bg-gradient-to-br from-dark-800/40 to-dark-900/40 backdrop-blur-md hover:from-dark-800/60 hover:to-dark-900/60 transition-all duration-500 h-full border border-dark-700/40 hover:border-${feature.color}-600/30 hover:shadow-2xl hover:-translate-y-2 cursor-pointer`}>
                    {/* Icon with sophisticated styling */}
                    <div className={`bg-gradient-to-br from-${feature.color}-500/20 to-${feature.color}-600/20 p-6 rounded-3xl mb-6 shadow-xl group-hover:shadow-${feature.color}-500/30 group-hover:scale-110 transition-all duration-500 border border-${feature.color}-400/20 relative overflow-hidden`}>
                      <div className="text-white relative z-10">{feature.icon}</div>
                      <div className={`absolute inset-0 bg-gradient-to-br from-${feature.color}-400/10 to-${feature.color}-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    </div>
                    
                    {/* Content */}
                    <h3 className="font-bold text-white mb-4 text-xl group-hover:text-white transition-colors leading-tight">
                      {feature.title}
                    </h3>
                    
                    <p className="text-dark-300 leading-relaxed group-hover:text-dark-200 transition-colors mb-4 flex-grow">
                      {feature.description}
                    </p>

                    {/* Stats badge */}
                    <div className={`inline-flex items-center px-3 py-1 rounded-full bg-${feature.color}-500/10 text-${feature.color}-400 text-sm font-medium border border-${feature.color}-500/20`}>
                      <Star size={14} className="mr-2" />
                      {feature.stats}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Statistical Credibility */}
            <div className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1200 delay-1200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {[
                { number: '10,000+', label: 'Active Students', icon: <Users size={24} /> },
                { number: '25+', label: 'Learning Modules', icon: <Layers size={24} /> },
                { number: '6', label: 'Robot Types', icon: <Cpu size={24} /> },
                { number: '99.9%', label: 'Uptime', icon: <Shield size={24} /> },
              ].map((stat, index) => (
                <div key={stat.label} className="text-center group">
                  <div className="bg-dark-800/50 rounded-2xl p-6 backdrop-blur-sm border border-dark-700/50 hover:border-primary-500/30 transition-all duration-300 hover:shadow-lg">
                    <div className="text-primary-400 mb-3 flex justify-center group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {stat.number}
                    </div>
                    <div className="text-dark-400 text-sm font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;