import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Layout from '@/components/layout/Layout';
import { ChevronRight, ChevronDown, Trophy, LockKeyhole, Star, Book, Tag, Play, CheckCircle, Clock, Target, Award, HelpCircle, Eye, BookOpen, Code, Lightbulb, X } from 'lucide-react';
import { useNavigate } from '@/hooks/useNavigation';
import { useRobotStore } from '@/store/robotStore';
import { ChallengeCategory, DifficultyLevel, Challenge } from '@/types/challenge.types';
import { motion, AnimatePresence } from 'framer-motion';

// Complete challenge data with proper completion tracking
const challenges: Challenge[] = [
  {
    id: 'intro-1',
    title: 'Hello Robot',
    description: 'Learn the fundamentals of robot programming with basic movement commands.',
    category: ChallengeCategory.INTRO,
    difficulty: DifficultyLevel.BEGINNER,
    estimatedTime: 15,
    objectives: [
      { 
        id: 'obj1', 
        description: 'Study basic robot movement commands',
        completionCriteria: 'theory_complete',
        completed: false,
        theory: `Robot movement is controlled through basic commands that specify:
- Direction (forward, backward, left, right)
- Speed (usually as a percentage or m/s)
- Duration (in milliseconds or seconds)

Example command:
robot.move({
  direction: "forward",
  speed: 0.5,  // 50% speed
  duration: 2000  // 2 seconds
});`
      },
      { 
        id: 'obj2', 
        description: 'Move the robot forward 5 meters',
        completionCriteria: 'distance_forward_5m',
        completed: false,
        hints: [
          'Use robot.move() with the "forward" direction',
          'Set an appropriate speed between 0 and 1',
          'Calculate the duration based on speed and distance'
        ]
      },
      { 
        id: 'obj3', 
        description: 'Rotate the robot 90 degrees right',
        completionCriteria: 'rotation_90_degrees',
        completed: false,
        hints: [
          'Use robot.rotate() with the "right" direction',
          'The angle is specified in degrees',
          'Make sure to wait for the rotation to complete'
        ]
      }
    ],
    hints: [
      { id: 'hint1', text: 'Start with a lower speed for more precise control', unlockCost: 0 },
      { id: 'hint2', text: 'You can chain commands using async/await', unlockCost: 5 },
    ],
    startingCode: {
      natural_language: 'Move the robot forward and then turn right',
      block: '[]',
      code: `// Welcome to your first robot programming challenge!
// Follow the comments to complete each objective

// First, let's move the robot forward
// Use robot.move() with appropriate parameters

// Then, wait for the movement to complete
// Hint: Use await robot.wait()

// Finally, rotate the robot 90 degrees right
// Use robot.rotate() with appropriate parameters`
    },
    theory: {
      sections: [
        {
          title: 'Understanding Robot Movement',
          content: `Robots move through space using a coordinate system:
- X axis: Left/Right movement
- Y axis: Up/Down movement  
- Z axis: Forward/Backward movement

When you command a robot to move, you're changing its position along these axes.`,
          video: 'https://example.com/robot-movement-basics',
        },
        {
          title: 'Basic Movement Commands',
          content: `The robot.move() command accepts several parameters:
- direction: The direction to move ("forward", "backward", "left", "right")
- speed: A value between 0 and 1 (0% to 100% speed)
- duration: Time in milliseconds

Example:
robot.move({ direction: "forward", speed: 0.5, duration: 2000 });`,
          examples: [
            {
              title: 'Moving Forward',
              code: 'robot.move({ direction: "forward", speed: 0.5, duration: 2000 });',
              explanation: 'Moves the robot forward at 50% speed for 2 seconds'
            },
            {
              title: 'Rotating',
              code: 'robot.rotate({ direction: "right", angle: 90 });',
              explanation: 'Rotates the robot 90 degrees to the right'
            }
          ]
        }
      ],
      quiz: [
        {
          question: 'What parameter controls the robot\'s movement speed?',
          options: ['velocity', 'speed', 'rate', 'pace'],
          correctAnswer: 'speed',
          explanation: 'The speed parameter accepts a value between 0 and 1, representing 0% to 100% of maximum speed.'
        },
        {
          question: 'How is duration specified in robot.move()?',
          options: ['Seconds', 'Milliseconds', 'Minutes', 'Steps'],
          correctAnswer: 'Milliseconds',
          explanation: 'Duration is specified in milliseconds. For example, 2000 milliseconds equals 2 seconds.'
        }
      ]
    },
    robotType: 'mobile',
    environmentId: 'tutorial-room',
    unlocked: true,
    completed: false,
    nextChallengeIds: ['intro-2'],
  },
  {
    id: 'intro-2',
    title: 'Using Sensors',
    description: 'Learn how to read and interpret sensor data for robot navigation.',
    category: ChallengeCategory.INTRO,
    difficulty: DifficultyLevel.BEGINNER,
    estimatedTime: 20,
    objectives: [
      {
        id: 'obj4',
        description: 'Study different types of sensors',
        completionCriteria: 'theory_complete',
        completed: false,
        theory: `Robots use various sensors to perceive their environment:
1. Distance Sensors (Ultrasonic, Infrared)
2. Cameras (RGB, Depth)
3. Touch Sensors
4. Gyroscopes

Each sensor provides specific data about the environment.`
      },
      {
        id: 'obj5',
        description: 'Read the ultrasonic sensor',
        completionCriteria: 'sensor_read_complete',
        completed: false,
        hints: [
          'Use robot.getSensor("ultrasonic")',
          'The sensor returns distance in meters',
          'Values less than 1 indicate nearby obstacles'
        ]
      }
    ],
    hints: [
      { id: 'hint3', text: 'Sensors return promises, use await to get readings', unlockCost: 5 },
      { id: 'hint4', text: 'Combine movement and sensor data for smart navigation', unlockCost: 10 },
    ],
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
// 3. Stop when an obstacle is detected`
    },
    theory: {
      sections: [
        {
          title: 'Introduction to Robot Sensors',
          content: `Sensors are crucial for robots to understand their environment. They provide:
- Distance measurements
- Visual information
- Orientation data
- Touch detection

Each sensor type has specific uses and limitations.`,
          video: 'https://example.com/robot-sensors-intro',
        }
      ],
      quiz: [
        {
          question: 'What unit does the ultrasonic sensor use for distance?',
          options: ['Centimeters', 'Meters', 'Feet', 'Inches'],
          correctAnswer: 'Meters',
          explanation: 'The ultrasonic sensor returns distance measurements in meters.'
        }
      ]
    },
    robotType: 'mobile',
    environmentId: 'sensor-course',
    unlocked: true,
    completed: false,
    nextChallengeIds: ['warehouse-1'],
  },
  {
    id: 'warehouse-1',
    title: 'Warehouse Navigation',
    description: 'Learn to navigate a robot through a warehouse environment while avoiding obstacles.',
    category: ChallengeCategory.WAREHOUSE,
    difficulty: DifficultyLevel.INTERMEDIATE,
    estimatedTime: 25,
    objectives: [
      {
        id: 'obj6',
        description: 'Study path planning strategies',
        completionCriteria: 'theory_complete',
        completed: false,
        theory: `Path planning involves:
1. Identifying the goal location
2. Detecting obstacles
3. Finding an efficient route
4. Maintaining safe distances

We'll use sensors and algorithms to navigate safely.`
      },
      {
        id: 'obj7',
        description: 'Navigate to the pickup area',
        completionCriteria: 'reached_pickup',
        completed: false,
        hints: [
          'Use the map to identify the pickup area',
          'Keep track of your position',
          'Use sensors to avoid obstacles'
        ]
      },
      {
        id: 'obj8',
        description: 'Pick up the package',
        completionCriteria: 'package_grabbed',
        completed: false,
        hints: [
          'Position the robot correctly',
          'Use the grab() command',
          'Verify successful pickup'
        ]
      }
    ],
    hints: [
      { id: 'hint5', text: 'Break down the navigation into smaller steps', unlockCost: 10 },
      { id: 'hint6', text: 'Use markers or waypoints for complex paths', unlockCost: 15 },
    ],
    startingCode: {
      natural_language: 'Navigate to the pickup area, avoiding obstacles, and grab the package',
      block: '[]',
      code: `// Welcome to warehouse navigation!
// This challenge combines movement and sensor usage

// First, let's plan our path
// The pickup area is at coordinates (5, 0, 8)

// We'll need to:
// 1. Navigate around obstacles
// 2. Reach the pickup area
// 3. Grab the package

// Add your code here`
    },
    theory: {
      sections: [
        {
          title: 'Warehouse Navigation Basics',
          content: `Warehouse robots need to:
- Follow efficient paths
- Avoid collisions
- Handle dynamic obstacles
- Maintain precise positioning

This requires combining multiple skills and sensors.`,
          video: 'https://example.com/warehouse-navigation',
        }
      ],
      quiz: [
        {
          question: 'What should you do when detecting an obstacle?',
          options: [
            'Ignore it and continue',
            'Stop and wait',
            'Find an alternative path',
            'Reverse direction'
          ],
          correctAnswer: 'Find an alternative path',
          explanation: 'When an obstacle is detected, the robot should plan and follow an alternative path to reach its goal.'
        }
      ]
    },
    robotType: 'mobile',
    environmentId: 'warehouse',
    unlocked: false,
    completed: false,
    nextChallengeIds: ['warehouse-2'],
  }
];

const ChallengesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ChallengeCategory | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'all'>('all');
  const [expandedChallenge, setExpandedChallenge] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<{ type: string; data: Challenge } | null>(null);
  const [selectedHints, setSelectedHints] = useState<string[]>([]);
  const [currentQuizAnswer, setCurrentQuizAnswer] = useState<Record<number, string>>({});
  const [showQuizResults, setShowQuizResults] = useState<Record<number, { correct: boolean; selected: string }>>({});
  
  const navigate = useNavigate();
  
  const { 
    challengeTracking, 
    getChallengeStatus, 
    getObjectiveStatus,
    robotState,
    setCurrentChallenge,
    markTheoryViewed
  } = useRobotStore();

  // Use useMemo to compute challenge states to prevent infinite loops
  const computedChallenges = useMemo(() => {
    return challenges.map(challenge => ({
      ...challenge,
      completed: getChallengeStatus(challenge.id),
      unlocked: challenge.id === 'intro-1' || 
               (challenge.id === 'intro-2' && getChallengeStatus('intro-1')) ||
               (challenge.id === 'warehouse-1' && getChallengeStatus('intro-2')),
      objectives: challenge.objectives.map(obj => ({
        ...obj,
        completed: getObjectiveStatus(obj.id)
      }))
    }));
  }, [
    getChallengeStatus, 
    getObjectiveStatus,
    challengeTracking.completedChallenges.size, // Use size to track changes
    challengeTracking.completedObjectives.size  // Use size to track changes
  ]);

  // Real-time objective and challenge completion listeners
  useEffect(() => {
    const handleObjectiveCompleted = (event: CustomEvent) => {
      // Force re-render by updating a counter or timestamp
      console.log('✅ Objective completed:', event.detail);
    };

    const handleChallengeCompleted = (event: CustomEvent) => {
      console.log('🏆 Challenge completed:', event.detail);
    };

    window.addEventListener('objectiveCompleted', handleObjectiveCompleted as EventListener);
    window.addEventListener('challengeCompleted', handleChallengeCompleted as EventListener);
    
    return () => {
      window.removeEventListener('objectiveCompleted', handleObjectiveCompleted as EventListener);
      window.removeEventListener('challengeCompleted', handleChallengeCompleted as EventListener);
    };
  }, []);

  // Memoized modal handlers to prevent infinite loops
  const openModal = useCallback((type: string, data: Challenge | null = null) => {
    if (data) {
      setActiveModal({ type, data });
    }
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    setSelectedHints([]);
    setCurrentQuizAnswer({});
    setShowQuizResults({});
  }, []);

  const handleHintUnlock = useCallback((hint: { id: string; unlockCost: number }) => {
    if (hint.unlockCost === 0 || window.confirm(`Unlock this hint for ${hint.unlockCost} points?`)) {
      setSelectedHints(prev => [...prev, hint.id]);
    }
  }, []);

  const handleQuizAnswer = useCallback((questionIndex: number, answer: string, correctAnswer: string) => {
    setCurrentQuizAnswer(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
    
    setTimeout(() => {
      setShowQuizResults(prev => ({
        ...prev,
        [questionIndex]: {
          correct: answer === correctAnswer,
          selected: answer
        }
      }));
    }, 500);
  }, []);

  const filteredChallenges = useMemo(() => {
    return computedChallenges.filter(challenge => 
      (selectedCategory === 'all' || challenge.category === selectedCategory) &&
      (selectedDifficulty === 'all' || challenge.difficulty === selectedDifficulty)
    );
  }, [computedChallenges, selectedCategory, selectedDifficulty]);
  
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: ChallengeCategory.INTRO, label: 'Introduction' },
    { value: ChallengeCategory.WAREHOUSE, label: 'Warehouse' },
    { value: ChallengeCategory.SURGERY, label: 'Surgery' },
    { value: ChallengeCategory.SEARCH_RESCUE, label: 'Search & Rescue' },
    { value: ChallengeCategory.MANUFACTURING, label: 'Manufacturing' },
  ];
  
  const difficulties = [
    { value: 'all', label: 'All Levels' },
    { value: DifficultyLevel.BEGINNER, label: 'Beginner' },
    { value: DifficultyLevel.INTERMEDIATE, label: 'Intermediate' },
    { value: DifficultyLevel.ADVANCED, label: 'Advanced' },
    { value: DifficultyLevel.EXPERT, label: 'Expert' },
  ];
  
  const getDifficultyColor = (difficulty: DifficultyLevel) => {
    switch (difficulty) {
      case DifficultyLevel.BEGINNER: return 'success';
      case DifficultyLevel.INTERMEDIATE: return 'primary';
      case DifficultyLevel.ADVANCED: return 'warning';
      case DifficultyLevel.EXPERT: return 'error';
      default: return 'primary';
    }
  };
  
  const getCategoryIcon = (category: ChallengeCategory) => {
    switch (category) {
      case ChallengeCategory.INTRO: return <Book size={16} />;
      case ChallengeCategory.WAREHOUSE: return <Tag size={16} />;
      case ChallengeCategory.SURGERY: return <Star size={16} />;
      case ChallengeCategory.SEARCH_RESCUE: return <Trophy size={16} />;
      case ChallengeCategory.MANUFACTURING: return <Tag size={16} />;
      default: return <Book size={16} />;
    }
  };

  const getObjectiveProgress = useCallback((challenge: Challenge) => {
    const completed = challenge.objectives.filter(obj => obj.completed).length;
    const total = challenge.objectives.length;
    return { completed, total, percentage: Math.round((completed / total) * 100) };
  }, []);

  const handleChallengeClick = useCallback((challenge: Challenge) => {
    if (!challenge.unlocked) return;
    setExpandedChallenge(expandedChallenge === challenge.id ? null : challenge.id);
  }, [expandedChallenge]);

  const handleStartChallenge = useCallback((challenge: Challenge) => {
    if (setCurrentChallenge) {
      setCurrentChallenge(challenge.id);
    }
    navigate(`/simulator?challenge=${challenge.id}`);
  }, [setCurrentChallenge, navigate]);

  // Calculate stats from actual robot store data
  const stats = useMemo(() => ({
    completedChallengesCount: challengeTracking.completedChallenges.size,
    totalChallenges: challenges.length,
    completedObjectivesCount: challengeTracking.completedObjectives.size,
    distanceMoved: challengeTracking.totalDistanceMoved
  }), [challengeTracking]);

  // Fixed Theory Modal - prevent infinite loop by checking if theory is already viewed
  const TheoryModal: React.FC<{ challenge: Challenge }> = React.memo(({ challenge }) => {
    const { challengeTracking, markTheoryViewed } = useRobotStore();
    
    useEffect(() => {
      // Theory mapping for challenges
      const theoryMap: Record<string, string> = {
        'intro-1': 'movement_basics',
        'intro-2': 'sensor_basics',
        'warehouse-1': 'path_planning'
      };
      
      const theoryId = theoryMap[challenge.id];
      
      // Only mark theory as viewed if it hasn't been viewed yet
      if (theoryId && !challengeTracking.viewedTheory.has(theoryId)) {
        markTheoryViewed(theoryId);
      }
    }, [challenge.id, challengeTracking.viewedTheory, markTheoryViewed]);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-dark-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-dark-600">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <BookOpen className="mr-2" />
                Learning Materials - {challenge.title}
              </h2>
              <button onClick={closeModal} className="text-dark-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            {challenge.theory?.sections.map((section, index) => (
              <div key={index} className="mb-6 p-4 bg-dark-700 rounded-lg border border-dark-600">
                <h3 className="text-xl font-semibold text-primary-400 mb-3">{section.title}</h3>
                <div className="text-dark-300 whitespace-pre-wrap mb-4">{section.content}</div>
                
                {section.examples && (
                  <div className="space-y-3">
                    <h4 className="text-lg font-medium text-success-400">Examples:</h4>
                    {section.examples.map((example, exampleIndex) => (
                      <div key={exampleIndex} className="bg-dark-800 rounded p-3 border border-dark-500">
                        <h5 className="text-white font-medium mb-2">{example.title}</h5>
                        <pre className="text-success-300 text-sm mb-2 overflow-x-auto">
                          <code>{example.code}</code>
                        </pre>
                        <p className="text-dark-400 text-sm">{example.explanation}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                {section.video && (
                  <div className="mt-4">
                    <button className="bg-error-600 hover:bg-error-700 text-white px-4 py-2 rounded flex items-center">
                      <Play className="mr-2" size={16} />
                      Watch Video Tutorial
                    </button>
                  </div>
                )}
              </div>
            ))}

            <div className="bg-success-900/20 border border-success-600 rounded-lg p-4 mt-4">
              <div className="flex items-center text-success-400 mb-2">
                <CheckCircle size={16} className="mr-2" />
                <span className="font-medium">Theory Study Complete!</span>
              </div>
              <p className="text-success-300 text-sm">
                You've successfully reviewed the theory for this challenge. Theory-based objectives will be marked as complete.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  });

  // Other modal components remain the same...
  const QuizModal: React.FC<{ challenge: Challenge }> = React.memo(({ challenge }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-dark-600">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Star className="mr-2" />
              Knowledge Quiz - {challenge.title}
            </h2>
            <button onClick={closeModal} className="text-dark-400 hover:text-white">
              <X size={24} />
            </button>
          </div>
          
          {challenge.theory?.quiz?.map((question, qIndex) => (
            <div key={qIndex} className="mb-6 p-4 bg-dark-700 rounded-lg border border-dark-600">
              <p className="text-white text-lg mb-4">{question.question}</p>
              <div className="grid grid-cols-1 gap-2">
                {question.options.map((option, optIndex) => {
                  const isSelected = currentQuizAnswer[qIndex] === option;
                  const showResult = showQuizResults[qIndex];
                  const isCorrect = option === question.correctAnswer;
                  
                  let buttonClass = "p-3 rounded border text-left transition-colors ";
                  if (showResult) {
                    if (isSelected && isCorrect) {
                      buttonClass += "bg-success-600 border-success-500 text-white";
                    } else if (isSelected && !isCorrect) {
                      buttonClass += "bg-error-600 border-error-500 text-white";
                    } else if (isCorrect) {
                      buttonClass += "bg-success-600 border-success-500 text-white";
                    } else {
                      buttonClass += "bg-dark-600 border-dark-500 text-dark-300";
                    }
                  } else {
                    buttonClass += isSelected 
                      ? "bg-primary-600 border-primary-500 text-white"
                      : "bg-dark-600 border-dark-500 text-dark-300 hover:border-dark-400";
                  }
                  
                  return (
                    <button
                      key={optIndex}
                      className={buttonClass}
                      onClick={() => handleQuizAnswer(qIndex, option, question.correctAnswer)}
                      disabled={!!showResult}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              {showQuizResults[qIndex] && (
                <div className="mt-3 p-3 bg-primary-900 border border-primary-600 rounded">
                  <p className="text-primary-300 text-sm">{question.explanation}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  ));

  return (
    <Layout>
      <div className="min-h-screen bg-dark-900 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Learning Challenges</h1>
              <p className="text-dark-400">
                Progress through our robotics challenges from beginner to expert level
              </p>
            </div>
            
            <div className="flex space-x-6 mt-4 md:mt-0">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-900 border border-primary-700 text-primary-400 mb-1">
                  <Award size={24} />
                </div>
                <span className="text-sm text-dark-300">{stats.completedChallengesCount}/{stats.totalChallenges}</span>
                <span className="text-xs text-dark-500">Completed</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-warning-900 border border-warning-700 text-warning-400 mb-1">
                  <Trophy size={24} />
                </div>
                <span className="text-sm text-dark-300">{stats.completedObjectivesCount}</span>
                <span className="text-xs text-dark-500">Objectives</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent-900 border border-accent-700 text-accent-400 mb-1">
                  <Star size={24} />
                </div>
                <span className="text-sm text-dark-300">{stats.distanceMoved.toFixed(1)}m</span>
                <span className="text-xs text-dark-500">Distance</span>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-dark-800 rounded-lg border border-dark-700 p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1">Category</label>
                <select
                  className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as any)}
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>{category.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1">Difficulty</label>
                <select
                  className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value as any)}
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty.value} value={difficulty.value}>{difficulty.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Live Stats */}
          {robotState && (
            <div className="bg-dark-800 rounded-lg p-4 border border-dark-700 mb-6">
              <h3 className="text-white font-medium mb-3 flex items-center">
                <Target size={16} className="mr-2" />
                Live Robot Status
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-dark-400">Position</span>
                  <p className="text-white font-mono">
                    ({robotState.position.x.toFixed(1)}, {robotState.position.z.toFixed(1)})
                  </p>
                </div>
                <div>
                  <span className="text-dark-400">Distance</span>
                  <p className="text-white font-mono">
                    {challengeTracking.totalDistanceMoved.toFixed(1)}m
                  </p>
                </div>
                <div>
                  <span className="text-dark-400">Rotations</span>
                  <p className="text-white font-mono">
                    {(challengeTracking.totalRotations / Math.PI * 180).toFixed(0)}°
                  </p>
                </div>
                <div>
                  <span className="text-dark-400">Battery</span>
                  <p className="text-white font-mono">{robotState.batteryLevel}%</p>
                </div>
              </div>
            </div>
          )}

          {/* Challenge List */}
          <div className="space-y-4">
            {filteredChallenges.map((challenge) => {
              const progress = getObjectiveProgress(challenge);
              const isExpanded = expandedChallenge === challenge.id;
              
              return (
                <motion.div
                  key={challenge.id}
                  className={`bg-dark-800 rounded-lg border border-dark-700 p-6 cursor-pointer transition-all ${
                    challenge.unlocked ? 'hover:border-dark-600' : 'opacity-70'
                  } ${challenge.completed ? 'border-success-500 bg-success-900/10' : ''}`}
                  onClick={() => handleChallengeClick(challenge)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <div className={`p-1.5 rounded-md bg-${getDifficultyColor(challenge.difficulty)}-900 border border-${getDifficultyColor(challenge.difficulty)}-700 mr-2 text-${getDifficultyColor(challenge.difficulty)}-400`}>
                          {getCategoryIcon(challenge.category)}
                        </div>
                        <h3 className="text-xl font-semibold text-white">{challenge.title}</h3>
                        {challenge.completed && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="ml-2 text-success-400"
                          >
                            <CheckCircle size={20} />
                          </motion.div>
                        )}
                        {!challenge.unlocked && (
                          <LockKeyhole className="ml-2 text-dark-500" size={16} />
                        )}
                      </div>
                      
                      <p className="text-dark-400 mb-3">{challenge.description}</p>
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <span className={`px-2 py-1 rounded text-xs font-medium bg-${getDifficultyColor(challenge.difficulty)}-900 text-${getDifficultyColor(challenge.difficulty)}-400 border border-${getDifficultyColor(challenge.difficulty)}-700`}>
                          {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                        </span>
                        <span className="text-dark-500 flex items-center">
                          <Clock size={14} className="mr-1" />
                          {challenge.estimatedTime} min
                        </span>
                        <span className="text-dark-500">
                          {progress.completed}/{progress.total} objectives
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end ml-4">
                      <div className="flex items-center space-x-2 mb-2">
                        {challenge.unlocked && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartChallenge(challenge);
                            }}
                            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded flex items-center text-sm transition-colors"
                          >
                            <Play size={14} className="mr-1" />
                            Start
                          </button>
                        )}
                      </div>
                      
                      <div className="flex items-center text-dark-400">
                        {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                      </div>
                      
                      {progress.total > 0 && (
                        <div className="w-24 bg-dark-700 rounded-full h-2 mt-2">
                          <motion.div
                            className={`h-2 rounded-full transition-all ${
                              challenge.completed ? 'bg-success-500' : 'bg-primary-500'
                            }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${progress.percentage}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 pt-6 border-t border-dark-700"
                      >
                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 mb-6">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openModal('theory', challenge);
                            }}
                            className="bg-dark-700 hover:bg-dark-600 text-white px-4 py-2 rounded flex items-center text-sm"
                          >
                            <BookOpen size={14} className="mr-2" />
                            Theory
                          </button>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openModal('quiz', challenge);
                            }}
                            className="bg-dark-700 hover:bg-dark-600 text-white px-4 py-2 rounded flex items-center text-sm"
                          >
                            <Star size={14} className="mr-2" />
                            Quiz
                          </button>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openModal('hints', challenge);
                            }}
                            className="bg-dark-700 hover:bg-dark-600 text-white px-4 py-2 rounded flex items-center text-sm"
                          >
                            <Lightbulb size={14} className="mr-2" />
                            Hints ({challenge.hints?.length || 0})
                          </button>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // Simple code modal inline
                              alert(`Starting Code:\n\n${challenge.startingCode?.code}`);
                            }}
                            className="bg-dark-700 hover:bg-dark-600 text-white px-4 py-2 rounded flex items-center text-sm"
                          >
                            <Code size={14} className="mr-2" />
                            View Code
                          </button>
                        </div>

                        {/* Objectives */}
                        <div>
                          <h4 className="text-white font-medium mb-3 flex items-center">
                            <Target size={16} className="mr-2" />
                            Objectives
                          </h4>
                          <div className="space-y-3">
                            {challenge.objectives.map((objective, index) => (
                              <motion.div
                                key={objective.id}
                                className={`p-4 rounded-lg border ${
                                  objective.completed
                                    ? 'bg-success-900/20 border-success-700'
                                    : 'bg-dark-700 border-dark-600'
                                }`}
                                animate={objective.completed ? { backgroundColor: 'rgba(34, 197, 94, 0.1)' } : {}}
                                transition={{ duration: 0.3 }}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center mb-2">
                                      <span className="text-sm font-medium text-dark-400 mr-3">
                                        #{index + 1}
                                      </span>
                                      <p className="text-white">{objective.description}</p>
                                      <AnimatePresence>
                                        {objective.completed && (
                                          <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0 }}
                                            className="ml-2 text-success-400"
                                          >
                                            <CheckCircle size={16} />
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                    
                                    {objective.theory && (
                                      <div className="mt-2 p-3 bg-dark-800 rounded border border-dark-600">
                                        <h5 className="text-primary-400 text-sm font-medium mb-2">Theory:</h5>
                                        <pre className="text-dark-300 text-xs whitespace-pre-wrap overflow-x-auto">
                                          {objective.theory}
                                        </pre>
                                      </div>
                                    )}
                                    
                                    {objective.hints && objective.hints.length > 0 && (
                                      <div className="mt-2">
                                        <details className="group">
                                          <summary className="text-warning-400 text-sm cursor-pointer hover:text-warning-300">
                                            💡 Show hints ({objective.hints.length})
                                          </summary>
                                          <div className="mt-2 space-y-1">
                                            {objective.hints.map((hint, hintIndex) => (
                                              <div key={hintIndex} className="text-dark-400 text-sm pl-4 border-l-2 border-warning-500">
                                                {hint}
                                              </div>
                                            ))}
                                          </div>
                                        </details>
                                      </div>
                                    )}

                                    {objective.completed && (
                                      <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-success-400 text-xs mt-1 font-medium"
                                      >
                                        ✓ Completed!
                                      </motion.p>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Next Challenges Preview */}
                        {challenge.nextChallengeIds && challenge.nextChallengeIds.length > 0 && (
                          <div className="mt-6 pt-4 border-t border-dark-700">
                            <h4 className="text-white font-medium mb-3">Next Challenges:</h4>
                            <div className="flex space-x-3">
                              {challenge.nextChallengeIds.map((nextId) => {
                                const nextChallenge = challenges.find(c => c.id === nextId);
                                return nextChallenge ? (
                                  <div key={nextId} className="bg-dark-700 rounded p-3 text-sm">
                                    <p className="text-white font-medium">{nextChallenge.title}</p>
                                    <p className="text-dark-400 text-xs mt-1">{nextChallenge.category}</p>
                                  </div>
                                ) : null;
                              })}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* No challenges found */}
          {filteredChallenges.length === 0 && (
            <div className="text-center py-12">
              <div className="text-dark-500 mb-4">
                <Book size={48} className="mx-auto mb-4" />
                <p className="text-lg">No challenges found</p>
                <p className="text-sm">Try adjusting your filters</p>
              </div>
            </div>
          )}
        </div>

        {/* Simplified Modals - Only Theory and Quiz to prevent loops */}
        {activeModal?.type === 'theory' && <TheoryModal challenge={activeModal.data} />}
        {activeModal?.type === 'quiz' && <QuizModal challenge={activeModal.data} />}
      </div>
    </Layout>
  );
};

export default ChallengesPage;