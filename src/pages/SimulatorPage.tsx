import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import SceneContainer from '@/components/simulator/SceneContainer';
import ControlPanel from '@/components/simulator/ControlPanel';
import CodeEditor from '@/components/editor/CodeEditor';
import BlockEditor from '@/components/editor/BlockEditor';
import NaturalLanguageInput from '@/components/editor/NaturalLanguageInput';
import { Code, Blocks, MessageSquare, Book, ArrowLeft, CheckCircle, Target } from 'lucide-react';
import { useNavigate } from '@/hooks/useNavigation';
import { Challenge } from '@/types/challenge.types';
import { useRobotStore } from '@/store/robotStore';
import { motion, AnimatePresence } from 'framer-motion';

type EditorTab = 'code' | 'blocks' | 'natural';

// Mock challenge data - in real app, this would come from API
const mockChallenges = {
  'intro-1': {
    id: 'intro-1',
    title: 'Hello Robot',
    description: 'Learn the fundamentals of robot programming with basic movement commands.',
    objectives: [
      { id: 'obj1', description: 'Study basic robot movement commands', completionCriteria: 'theory_complete', completed: false },
      { id: 'obj2', description: 'Move the robot forward 5 meters', completionCriteria: 'distance_forward_5m', completed: false },
      { id: 'obj3', description: 'Rotate the robot 90 degrees right', completionCriteria: 'rotation_90_degrees', completed: false },
    ],
    hints: [
      { id: 'hint1', text: 'Use robot.move() to move forward', unlockCost: 0 },
      { id: 'hint2', text: 'Use robot.rotate() to turn the robot', unlockCost: 5 },
    ],
    category: 'intro',
    difficulty: 'beginner',
    estimatedTime: 15,
    startingCode: {
      natural_language: 'Move the robot forward and then turn right',
      block: '[]',
      code: `// Welcome to your first robot programming challenge!
// Follow the comments to complete each objective

// First, let's move the robot forward 5 meters
// Use robot.move() with appropriate parameters
await robot.move({
  direction: "forward",
  speed: 0.5,
  duration: 4000  // Adjust duration as needed
});

// Wait for the movement to complete
await robot.wait(500);

// Finally, rotate the robot 90 degrees right
await robot.rotate({
  direction: "right",
  angle: 90
});

// Check your progress in the objectives panel!`
    },
    robotType: 'mobile',
    environmentId: 'tutorial-room',
    unlocked: true,
    completed: false,
    nextChallengeIds: ['intro-2'],
  },
  'intro-2': {
    id: 'intro-2',
    title: 'Using Sensors',
    description: 'Learn how to read and interpret sensor data for robot navigation.',
    objectives: [
      { id: 'obj4', description: 'Study different types of sensors', completionCriteria: 'theory_complete', completed: false },
      { id: 'obj5', description: 'Read the ultrasonic sensor', completionCriteria: 'sensor_read_complete', completed: false },
    ],
    hints: [
      { id: 'hint3', text: 'Sensors return promises, use await to get readings', unlockCost: 5 },
      { id: 'hint4', text: 'Combine movement and sensor data for smart navigation', unlockCost: 10 },
    ],
    category: 'intro',
    difficulty: 'beginner',
    estimatedTime: 20,
    startingCode: {
      natural_language: 'Move forward until you detect an obstacle, then stop',
      block: '[]',
      code: `// Let's learn about robot sensors!

// First, get a reading from the ultrasonic sensor
const distance = await robot.getSensor("ultrasonic");
console.log("Distance to obstacle:", distance, "meters");

// Now, let's move forward while checking the sensor
// Add your code here to:
// 1. Move forward
// 2. Continuously check the sensor  
// 3. Stop when an obstacle is detected

// Example sensor reading loop:
while (true) {
  const currentDistance = await robot.getSensor("ultrasonic");
  console.log("Current distance:", currentDistance);
  
  if (currentDistance < 1.0) {
    console.log("Obstacle detected! Stopping...");
    await robot.stop();
    break;
  }
  
  await robot.move({
    direction: "forward",
    speed: 0.3,
    duration: 100
  });
  
  await robot.wait(50);
}`
    },
    robotType: 'mobile',
    environmentId: 'sensor-course',
    unlocked: true,
    completed: false,
    nextChallengeIds: ['warehouse-1'],
  }
};

const SimulatorPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<EditorTab>('code');
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [code, setCode] = useState<string>('');
  const navigate = useNavigate();
  
  const { 
    setCurrentChallenge: setStoreChallengeId,
    challengeTracking,
    getObjectiveStatus,
    getChallengeStatus,
    markTheoryViewed
  } = useRobotStore();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const challengeId = params.get('challenge');
    
    if (challengeId && mockChallenges[challengeId as keyof typeof mockChallenges]) {
      const challenge = mockChallenges[challengeId as keyof typeof mockChallenges];
      setCurrentChallenge(challenge as Challenge);
      setCode(challenge.startingCode.code);
      
      // Set the current challenge in the store for tracking
      setStoreChallengeId(challengeId);
    } else {
      // Default to intro-1 if no valid challenge ID
      const defaultChallenge = mockChallenges['intro-1'];
      setCurrentChallenge(defaultChallenge as Challenge);
      setCode(defaultChallenge.startingCode.code);
      setStoreChallengeId('intro-1');
    }
  }, [setStoreChallengeId]);

  // Update challenge objectives based on store state
  useEffect(() => {
    if (currentChallenge) {
      const updatedChallenge = {
        ...currentChallenge,
        objectives: currentChallenge.objectives.map(obj => ({
          ...obj,
          completed: getObjectiveStatus(obj.id)
        })),
        completed: getChallengeStatus(currentChallenge.id)
      };
      
      // Only update if completion status has changed
      const hasChanges = updatedChallenge.objectives.some((obj, index) => 
        obj.completed !== currentChallenge.objectives[index]?.completed
      ) || updatedChallenge.completed !== currentChallenge.completed;
      
      if (hasChanges) {
        setCurrentChallenge(updatedChallenge);
      }
    }
  }, [currentChallenge, getObjectiveStatus, getChallengeStatus, challengeTracking.completedObjectives, challengeTracking.completedChallenges]);

  const handleCodeRun = async (codeToRun: string) => {
    console.log('Running code:', codeToRun);
    
    // Mark theory as viewed for theory-based objectives when code is run
    if (currentChallenge?.id === 'intro-1') {
      markTheoryViewed('movement_basics');
    } else if (currentChallenge?.id === 'intro-2') {
      markTheoryViewed('sensor_basics');
    }
    
    try {
      // Create a simple robot API for the code execution
      const robot = {
        move: async (params: { direction: string; speed: number; duration: number }) => {
          console.log('Robot moving:', params);
          // This would integrate with your actual robot store methods
          return new Promise(resolve => setTimeout(resolve, params.duration));
        },
        rotate: async (params: { direction: string; angle: number }) => {
          console.log('Robot rotating:', params);
          return new Promise(resolve => setTimeout(resolve, 1000));
        },
        stop: async () => {
          console.log('Robot stopping');
          return Promise.resolve();
        },
        wait: async (ms: number) => {
          return new Promise(resolve => setTimeout(resolve, ms));
        },
        getSensor: async (type: string) => {
          console.log('Reading sensor:', type);
          // This would call your actual sensor reading method
          return Math.random() * 3 + 0.5; // Random distance
        }
      };
      
      // Execute the code with the robot API
      const asyncFunction = new Function('robot', `
        return (async () => {
          ${codeToRun}
        })();
      `);
      
      await asyncFunction(robot);
      console.log('Code execution completed');
      
    } catch (error) {
      console.error('Code execution error:', error);
    }
  };

  const getCompletedObjectivesCount = () => {
    if (!currentChallenge) return { completed: 0, total: 0 };
    const completed = currentChallenge.objectives.filter(obj => obj.completed).length;
    return { completed, total: currentChallenge.objectives.length };
  };

  const progress = getCompletedObjectivesCount();

  return (
    <Layout>
      <div className="min-h-[calc(100vh-var(--header-height)-var(--footer-height))] bg-dark-900">
        {currentChallenge && (
          <div className="px-6 py-6 bg-dark-800 border-b border-dark-600">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button 
                    className="btn bg-dark-700 hover:bg-dark-600 text-white p-2.5 rounded-lg transition-colors"
                    onClick={() => navigate('/challenges')}
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <div>
                    <h1 className="text-2xl font-bold text-white mb-2">{currentChallenge.title}</h1>
                    <p className="text-dark-300 text-lg">{currentChallenge.description}</p>
                    <div className="flex items-center mt-2 space-x-4">
                      <span className="text-sm text-dark-400">
                        Progress: {progress.completed}/{progress.total} objectives
                      </span>
                      {currentChallenge.completed && (
                        <span className="flex items-center text-success-400 text-sm">
                          <CheckCircle size={16} className="mr-1" />
                          Challenge Complete!
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="hidden lg:block">
                  <div className="bg-dark-700 rounded-lg p-4 border border-dark-600 shadow-lg min-w-[300px]">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <Book size={18} className="mr-2" />
                      Challenge Objectives
                    </h3>
                    <ul className="space-y-3">
                      {currentChallenge.objectives.map((objective, index) => (
                        <motion.li 
                          key={objective.id}
                          className="flex items-center text-sm"
                          animate={objective.completed ? { backgroundColor: 'rgba(34, 197, 94, 0.1)' } : {}}
                          transition={{ duration: 0.3 }}
                        >
                          <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center transition-colors ${
                            objective.completed 
                              ? 'bg-success-500 text-white' 
                              : 'bg-dark-600'
                          }`}>
                            <AnimatePresence>
                              {objective.completed && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  exit={{ scale: 0 }}
                                >
                                  <CheckCircle size={12} />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                          <span className={objective.completed ? 'text-success-400' : 'text-dark-200'}>
                            #{index + 1}: {objective.description}
                          </span>
                          {objective.completed && (
                            <motion.span
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="ml-2 text-success-400 text-xs"
                            >
                              ✓
                            </motion.span>
                          )}
                        </motion.li>
                      ))}
                    </ul>
                    
                    {/* Progress bar */}
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-dark-400">Overall Progress</span>
                        <span className="text-xs text-dark-400">{Math.round((progress.completed / progress.total) * 100)}%</span>
                      </div>
                      <div className="w-full bg-dark-600 rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full transition-all ${
                            currentChallenge.completed ? 'bg-success-500' : 'bg-primary-500'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${(progress.completed / progress.total) * 100}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="h-[600px] bg-dark-800 rounded-xl border border-dark-600 overflow-hidden shadow-xl">
                <SceneContainer />
              </div>
              
              <div className="editor-container shadow-xl">
                <div className="flex border-b border-dark-600 bg-dark-800 px-2">
                  <button 
                    className={`flex items-center px-6 py-4 text-sm font-medium transition-colors ${
                      activeTab === 'code' 
                        ? 'text-primary-400 border-b-2 border-primary-400 bg-dark-900' 
                        : 'text-dark-300 hover:text-dark-200 hover:bg-dark-700'
                    }`}
                    onClick={() => setActiveTab('code')}
                  >
                    <Code size={16} className="mr-2" />
                    <span>Code Editor</span>
                  </button>
                  <button 
                    className={`flex items-center px-6 py-4 text-sm font-medium transition-colors ${
                      activeTab === 'blocks' 
                        ? 'text-primary-400 border-b-2 border-primary-400 bg-dark-900' 
                        : 'text-dark-300 hover:text-dark-200 hover:bg-dark-700'
                    }`}
                    onClick={() => setActiveTab('blocks')}
                  >
                    <Blocks size={16} className="mr-2" />
                    <span>Block Editor</span>
                  </button>
                  <button 
                    className={`flex items-center px-6 py-4 text-sm font-medium transition-colors ${
                      activeTab === 'natural' 
                        ? 'text-primary-400 border-b-2 border-primary-400 bg-dark-900' 
                        : 'text-dark-300 hover:text-dark-200 hover:bg-dark-700'
                    }`}
                    onClick={() => setActiveTab('natural')}
                  >
                    <MessageSquare size={16} className="mr-2" />
                    <span>Natural Language</span>
                  </button>
                </div>
                
                <div className="editor-content">
                  {activeTab === 'code' && (
                    <CodeEditor 
                      initialCode={code}
                      onCodeChange={setCode}
                      onCodeRun={handleCodeRun}
                    />
                  )}
                  {activeTab === 'blocks' && <BlockEditor />}
                  {activeTab === 'natural' && <NaturalLanguageInput />}
                </div>
              </div>
            </div>
            
            <div className="h-full">
              <ControlPanel challenge={currentChallenge} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SimulatorPage;