import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Cpu, Brain, Layers, Star, Users, Award, Monitor, Code, Zap, Shield, GitBranch, CheckCircle } from 'lucide-react';

const Hero = () => {
  const [currentStat, setCurrentStat] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  const stats = [
    { value: '50,000+', label: 'Students Trained', icon: Users },
    { value: '15+', label: 'Robot Types', icon: Cpu },
    { value: '200+', label: 'Simulations', icon: Monitor },
    { value: '99.9%', label: 'Uptime', icon: Shield }
  ];

  const codeExamples = [
    'robot.moveToPosition(x=10, y=5, z=2)',
    'arm.grasp(object="box", force=0.8)',
    'navigate.pathPlan(start, goal, obstacles)',
    'sensor.lidar.scan(range=10, resolution=0.1)'
  ];

  const features = [
    {
      icon: Cpu,
      title: 'Industry-Standard Robotics',
      description: 'Learn with the same tools and frameworks used in Tesla, Boston Dynamics, and leading robotics companies. Master ROS, Python, and C++ in realistic environments.',
      metrics: ['ROS 2 Compatible', 'Real-time Processing', 'Physics Simulation']
    },
    {
      icon: Brain,
      title: 'AI-Driven Learning Path',
      description: 'Personalized curriculum that adapts to your skill level and career goals. From basics to advanced autonomous systems and machine learning integration.',
      metrics: ['Adaptive Learning', 'Career Focused', 'Industry Projects']
    },
    {
      icon: Code,
      title: 'Production-Ready Skills',
      description: 'Write code that meets industry standards with integrated testing, version control, and deployment pipelines. Build portfolio projects that impress employers.',
      metrics: ['Version Control', 'CI/CD Pipeline', 'Code Reviews']
    }
  ];

  const companies = [
    'Tesla', 'Boston Dynamics', 'Amazon Robotics', 'NVIDIA', 'ABB', 'KUKA'
  ];

  useEffect(() => {
    const statInterval = setInterval(() => {
      setCurrentStat(prev => (prev + 1) % stats.length);
    }, 3000);

    return () => clearInterval(statInterval);
  }, []);

  useEffect(() => {
    const text = codeExamples[Math.floor(Date.now() / 4000) % codeExamples.length];
    let index = 0;
    setTypedText('');
    
    const typeInterval = setInterval(() => {
      if (index < text.length) {
        setTypedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setIsTyping(false);
          setTimeout(() => setIsTyping(true), 1000);
        }, 2000);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, [currentStat]);

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden">
      {/* Professional Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.08),transparent_50%)]"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        {/* Animated accent lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
      </div>

      {/* Professional Header Navigation */}
      <div className="relative z-20 border-b border-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Cpu size={20} className="text-white" />
              </div>
              <span className="text-white font-bold text-xl">RoboSim Pro</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Platform</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Curriculum</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Enterprise</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Documentation</a>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen py-20">
            
            {/* Left Column - Content */}
            <div className="space-y-12">
              
              {/* Professional Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                <span className="text-slate-300 text-sm font-medium">Trusted by 500+ companies worldwide</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight">
                  Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Industrial</span> Robotics
                </h1>
                <p className="text-xl lg:text-2xl text-slate-300 leading-relaxed font-light">
                  Professional robotics training platform with industry-standard tools, 
                  real-world simulations, and career-focused curriculum designed by experts.
                </p>
              </div>

              {/* Code Terminal */}
              <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 font-mono">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <span className="text-slate-400 text-sm">robotics_simulator.py</span>
                </div>
                <div className="text-green-400 text-sm">
                  <span className="text-slate-500">$ </span>
                  <span className="text-blue-400">python</span> {typedText}
                  <span className={`inline-block w-2 h-5 bg-green-400 ml-1 ${isTyping ? 'animate-pulse' : ''}`}></span>
                </div>
                <div className="text-slate-400 text-xs mt-2">
                  Status: Connected to simulation environment
                </div>
              </div>

              {/* Professional CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center">
                  <Play size={20} className="mr-3" />
                  Start Free Trial
                  <ArrowRight size={20} className="ml-3 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-slate-800/50 flex items-center justify-center">
                  <Monitor size={20} className="mr-3" />
                  Watch Demo
                </button>
              </div>

              {/* Company Logos */}
              <div className="space-y-4">
                <p className="text-slate-400 text-sm uppercase tracking-wider font-medium">
                  Trusted by teams at
                </p>
                <div className="flex flex-wrap items-center gap-8">
                  {companies.map((company, index) => (
                    <div key={company} className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer font-medium">
                      {company}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Professional Dashboard */}
            <div className="space-y-8">
              
              {/* Stats Dashboard */}
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    const isActive = index === currentStat;
                    return (
                      <div 
                        key={stat.label} 
                        className={`p-4 rounded-xl transition-all duration-500 ${
                          isActive 
                            ? 'bg-blue-500/10 border border-blue-500/30' 
                            : 'bg-slate-800/30 border border-slate-700/30'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Icon size={20} className={isActive ? 'text-blue-400' : 'text-slate-400'} />
                          <div className={`text-2xl font-bold ${isActive ? 'text-white' : 'text-slate-300'}`}>
                            {stat.value}
                          </div>
                        </div>
                        <div className={`text-sm ${isActive ? 'text-blue-200' : 'text-slate-400'}`}>
                          {stat.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Feature Preview */}
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-bold text-lg">Live Simulation</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm font-medium">Active</span>
                  </div>
                </div>
                
                {/* Simulation Visualization */}
                <div className="relative h-48 bg-slate-800/50 rounded-xl border border-slate-700/30 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
                  
                  {/* Robot Arm Visualization */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative w-32 h-32">
                      {/* Base */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-slate-600 rounded-lg"></div>
                      
                      {/* Arm segments */}
                      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 origin-bottom">
                        <div className="w-3 h-16 bg-gradient-to-t from-slate-600 to-slate-500 rounded-full transition-transform duration-2000"
                             style={{transform: 'rotate(15deg)'}}>
                          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 origin-bottom">
                            <div className="w-3 h-16 bg-gradient-to-t from-slate-600 to-slate-500 rounded-full transition-transform duration-2000"
                                 style={{transform: 'rotate(-30deg)'}}>
                              {/* End effector */}
                              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 flex">
                                <div className="w-2 h-4 bg-blue-500 rounded-sm mr-0.5"></div>
                                <div className="w-2 h-4 bg-blue-500 rounded-sm"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Status indicators */}
                  <div className="absolute top-4 left-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-green-400 text-xs font-mono">Motors: Online</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-blue-400 text-xs font-mono">Sensors: Active</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-purple-400 text-xs font-mono">AI: Processing</span>
                    </div>
                  </div>
                  
                  {/* Performance metrics */}
                  <div className="absolute bottom-4 right-4 text-right">
                    <div className="text-slate-400 text-xs font-mono">FPS: 60</div>
                    <div className="text-slate-400 text-xs font-mono">Latency: 2ms</div>
                    <div className="text-slate-400 text-xs font-mono">Physics: Enabled</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Features Section */}
          <div className="py-24 border-t border-slate-800/50">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Industry-Leading Platform
              </h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                Built for professionals, designed for scale. Our platform delivers the tools and 
                knowledge you need to excel in modern robotics engineering.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="group">
                    <div className="bg-slate-900/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 h-full hover:bg-slate-900/50 hover:border-slate-600/50 transition-all duration-300">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                          <Icon size={24} className="text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                      </div>
                      
                      <p className="text-slate-300 mb-6 leading-relaxed">
                        {feature.description}
                      </p>
                      
                      <div className="space-y-2">
                        {feature.metrics.map((metric, metricIndex) => (
                          <div key={metricIndex} className="flex items-center">
                            <CheckCircle size={16} className="text-green-400 mr-3" />
                            <span className="text-slate-400 text-sm">{metric}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Professional CTA Section */}
          <div className="py-24 border-t border-slate-800/50">
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl border border-slate-700/50 p-12 text-center backdrop-blur-sm">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                  Ready to advance your robotics career?
                </h2>
                <p className="text-xl text-slate-300 mb-8">
                  Join thousands of engineers who've accelerated their careers with our 
                  industry-standard robotics training platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center">
                    <Zap size={20} className="mr-3" />
                    Start Your Free Trial
                  </button>
                  <button className="border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-slate-800/50 flex items-center justify-center">
                    <GitBranch size={20} className="mr-3" />
                    View on GitHub
                  </button>
                </div>
                <p className="text-slate-400 text-sm mt-6">
                  30-day free trial • No credit card required • Cancel anytime
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;