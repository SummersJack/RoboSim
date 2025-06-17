import React from 'react';
import { ArrowRight, Play, BookOpen, Users, Zap, CheckCircle, Rocket, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from '@/hooks/useNavigation';

const CallToAction: React.FC = () => {
  const navigate = useNavigate();
  
  const benefits = [
    'Start learning immediately - no setup required',
    'Industry-standard simulation technology',
    'Progressive curriculum from beginner to expert',
    'AI-powered programming assistance',
    'Real-world robotics scenarios',
    'Global community of 10,000+ learners'
  ];
  
  const learningPaths = [
    {
      title: 'Beginner',
      description: 'Perfect for newcomers to robotics',
      duration: '2-4 weeks',
      color: 'emerald',
      features: ['Basic robot movements', 'Simple programming', 'Interactive tutorials']
    },
    {
      title: 'Intermediate',
      description: 'Build on your foundation',
      duration: '4-8 weeks',
      color: 'blue',
      features: ['Sensor integration', 'Path planning', 'Advanced challenges']
    },
    {
      title: 'Advanced',
      description: 'Master complex systems',
      duration: '8-12 weeks',
      color: 'purple',
      features: ['Autonomous systems', 'Machine learning', 'Industry projects']
    }
  ];
  
  return (
    <section className="py-24 md:py-32 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
                <Rocket size={16} className="mr-2" />
                <span>Start Your Journey Today</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white leading-tight">
                Ready to build the
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                  future of robotics?
                </span>
              </h2>
              
              <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                Join thousands of students, educators, and professionals who are mastering 
                robotics programming through our comprehensive simulation platform.
              </p>
              
              {/* Benefits list */}
              <div className="space-y-4 mb-10">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className="bg-emerald-500/20 rounded-full p-1 mr-4 mt-0.5 flex-shrink-0">
                      <CheckCircle size={16} className="text-emerald-400" />
                    </div>
                    <span className="text-slate-300">{benefit}</span>
                  </motion.div>
                ))}
              </div>
              
              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  className="group btn-primary text-lg px-8 py-4 flex items-center justify-center hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold"
                  onClick={() => navigate('/simulator')}
                >
                  <Play size={20} className="mr-3 group-hover:scale-110 transition-transform" />
                  <span>Launch Simulator</span>
                  <ArrowRight size={20} className="ml-3 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  className="bg-slate-800/50 hover:bg-slate-800/70 text-slate-300 hover:text-white text-lg px-8 py-4 rounded-xl font-semibold transition-all duration-300 backdrop-blur-xl border border-slate-700/50 hover:border-slate-600/50 flex items-center justify-center"
                  onClick={() => navigate('/challenges')}
                >
                  <BookOpen size={20} className="mr-3" />
                  <span>Browse Challenges</span>
                </button>
              </div>
            </motion.div>
            
            {/* Right side - Learning paths */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-800/50 overflow-hidden shadow-2xl">
                {/* Card header */}
                <div className="bg-slate-800/50 px-8 py-6 border-b border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        Choose Your Learning Path
                      </h3>
                      <p className="text-slate-400">
                        Structured curriculum for every skill level
                      </p>
                    </div>
                    <div className="bg-blue-500/20 rounded-full p-3">
                      <Users size={24} className="text-blue-400" />
                    </div>
                  </div>
                </div>
                
                {/* Learning paths */}
                <div className="p-8">
                  <div className="space-y-6">
                    {learningPaths.map((path, index) => (
                      <motion.div
                        key={path.title}
                        className={`p-6 rounded-2xl bg-${path.color}-500/5 border border-${path.color}-500/20 hover:border-${path.color}-500/40 transition-all duration-300 cursor-pointer group hover:bg-${path.color}-500/10`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <div className={`bg-${path.color}-500/20 rounded-lg p-2 mr-4 text-${path.color}-400`}>
                              <Star size={20} />
                            </div>
                            <div>
                              <h4 className="font-semibold text-white mb-1">
                                {path.title} Path
                              </h4>
                              <p className="text-sm text-slate-400">
                                {path.description}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-sm font-medium text-${path.color}-400`}>
                              {path.duration}
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          {path.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center text-sm text-slate-300">
                              <CheckCircle size={14} className={`text-${path.color}-400 mr-2 flex-shrink-0`} />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Stats */}
                  <div className="mt-8 pt-6 border-t border-slate-700/50">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-400 mb-1">
                          10k+
                        </div>
                        <div className="text-xs text-slate-500">
                          Students
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-400 mb-1">
                          100+
                        </div>
                        <div className="text-xs text-slate-500">
                          Challenges
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-emerald-400 mb-1">
                          4.9★
                        </div>
                        <div className="text-xs text-slate-500">
                          Rating
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                className="absolute -top-4 -right-4 bg-blue-500 rounded-full p-3 shadow-2xl shadow-blue-500/50"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <Play size={20} className="text-white" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-4 bg-purple-500 rounded-full p-3 shadow-2xl shadow-purple-500/50"
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -5, 5, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <BookOpen size={20} className="text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;