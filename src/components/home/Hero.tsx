import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Play, Cpu, Brain, Layers, Star, Users, Award, Zap, Shield, Target, ChevronDown, Globe, Code, Rocket, BookOpen } from 'lucide-react';
import { useNavigate } from '@/hooks/useNavigation';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div ref={heroRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Sophisticated Background System */}
      <div className="absolute inset-0">
        {/* Primary gradient orb */}
        <div 
          className="absolute w-[800px] h-[800px] opacity-30 transition-all duration-[4000ms] ease-out"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 40%, transparent 70%)',
            left: `${30 + mousePosition.x * 0.02}%`,
            top: `${20 + mousePosition.y * 0.02}%`,
            transform: `translate(-50%, -50%) scale(${1 + scrollY * 0.0001})`,
            filter: 'blur(40px)',
          }}
        />
        
        {/* Secondary gradient orb */}
        <div 
          className="absolute w-[600px] h-[600px] opacity-20 transition-all duration-[5000ms] ease-out"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, rgba(168, 85, 247, 0.04) 40%, transparent 70%)',
            right: `${25 + mousePosition.x * 0.015}%`,
            bottom: `${30 + mousePosition.y * 0.015}%`,
            transform: `translate(50%, 50%) scale(${1 + scrollY * 0.0001})`,
            filter: 'blur(50px)',
          }}
        />
        
        {/* Tertiary accent */}
        <div 
          className="absolute w-[400px] h-[400px] opacity-15 transition-all duration-[6000ms] ease-out"
          style={{
            background: 'radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.03) 40%, transparent 70%)',
            left: '50%',
            top: '60%',
            transform: `translate(-50%, -50%) translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
            filter: 'blur(60px)',
          }}
        />
      </div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center min-h-screen py-20 text-center">
            
            {/* Status Badge */}
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 text-slate-300 text-sm font-medium mb-8 hover:bg-slate-800/70 transition-all duration-300 group">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 animate-pulse" />
              <span>Trusted by 10,000+ students worldwide</span>
              <div className="w-2 h-2 bg-blue-400 rounded-full ml-3 animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Main Headline */}
            <h1 className="relative mb-8">
              <div className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.85] tracking-tight">
                <div className="text-white mb-4">
                  Learn Robotics
                </div>
                <div className="relative">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                    Without Hardware
                  </span>
                  {/* Animated underline */}
                  <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-blue-400/60 via-purple-400/60 to-emerald-400/60 rounded-full">
                    <div className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl lg:text-3xl text-slate-300 leading-relaxed max-w-4xl mx-auto mb-12 font-light">
              Master robotics programming through immersive 3D simulations. 
              <span className="text-blue-400 font-medium"> No expensive hardware required.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <button 
                className="group relative overflow-hidden bg-blue-600 hover:bg-blue-700 text-white text-lg px-10 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 hover:-translate-y-1 border border-blue-500/20"
                onClick={() => navigate('/simulator')}
              >
                <div className="flex items-center justify-center relative z-10">
                  <Play size={20} className="mr-3" />
                  <span>Start Learning</span>
                  <ArrowRight size={20} className="ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              
              <button 
                className="group bg-slate-800/50 hover:bg-slate-800/70 text-slate-300 hover:text-white text-lg px-10 py-4 rounded-xl font-semibold transition-all duration-300 backdrop-blur-xl border border-slate-700/50 hover:border-slate-600/50"
                onClick={() => navigate('/challenges')}
              >
                <div className="flex items-center justify-center">
                  <BookOpen size={20} className="mr-3" />
                  <span>View Challenges</span>
                </div>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-400 mb-20">
              <div className="flex items-center">
                <Shield size={16} className="mr-2 text-emerald-400" />
                <span>Enterprise Security</span>
              </div>
              <div className="flex items-center">
                <Zap size={16} className="mr-2 text-yellow-400" />
                <span>99.9% Uptime</span>
              </div>
              <div className="flex items-center">
                <Globe size={16} className="mr-2 text-blue-400" />
                <span>50+ Universities</span>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <ChevronDown size={24} className="text-slate-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;