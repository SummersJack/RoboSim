import { create } from 'zustand';
import { RobotConfig, RobotState, Vector3, Quaternion } from '@/types/robot.types';

interface EnvironmentConfig {
  id: string;
  name: string;
  description: string;
  temperature?: number;
  humidity?: number;
}

interface JointState {
  base: number;
  shoulder: number;
  elbow: number;
  wrist: number;
  altitude?: number;
}

interface PerformanceMetrics {
  distanceTraveled: number;
  rotations: number;
  tasksCompleted: number;
  batteryUsed: number;
}

interface ChallengeTracking {
  hasMovedForward: boolean;
  hasMovedBackward: boolean;
  hasMovedLeft: boolean;
  hasMovedRight: boolean;
  hasRotatedLeft: boolean;
  hasRotatedRight: boolean;
  hasGrabbed: boolean;
  hasReleased: boolean;
  hasHovered: boolean;
  hasLanded: boolean;
  totalDistanceMoved: number;
  totalRotations: number;
  completedChallenges: Set<string>;
  completedObjectives: Set<string>;
  viewedTheory: Set<string>;
  currentChallengeId: string | null;
  maxForwardDistance: number;
  maxBackwardDistance: number;
  totalRotationAngle: number;
  hasReadSensor: boolean;
  sensorReadings: number;
  hasReachedTarget: boolean;
  targetPositions: Array<{ x: number, z: number, reached: boolean }>;
  hasReachedPickupArea: boolean;
  hasCompletedPath: boolean;
  gridPointsVisited: Set<string>;
  patrolWaypoints: number;
}

interface RobotStoreState {
  selectedRobot: RobotConfig | null;
  robotState: RobotState | null;
  environment: EnvironmentConfig | null;
  isMoving: boolean;
  jointPositions: JointState;
  performance: PerformanceMetrics;
  challengeTracking: ChallengeTracking;
  moveCommands: {
    direction?: 'forward' | 'backward' | 'left' | 'right' | 'up' | 'down';
    speed?: number;
    joint?: keyof JointState;
  } | null;
  
  // Actions
  selectRobot: (config: RobotConfig) => void;
  moveRobot: (params: { 
    direction: 'forward' | 'backward' | 'left' | 'right' | 'up' | 'down', 
    speed: number, 
    joint?: keyof JointState 
  }) => void;
  rotateRobot: (params: { direction: 'left' | 'right', speed: number }) => void;
  grabObject: () => void;
  releaseObject: () => void;
  stopRobot: () => void;
  setEnvironment: (config: EnvironmentConfig) => void;
  updateRobotPosition: (position: Vector3) => void;
  updateRobotRotation: (rotation: Quaternion) => void;
  updateJointPosition: (joint: keyof JointState, value: number) => void;
  resetRobotState: () => void;
  resetRobotStateByType: () => void;
  landDrone: () => void;
  startHover: () => void;
  startExplorerAnimation: () => void;
  stopExplorerAnimation: () => void;
  markChallengeCompleted: (challengeId: string) => void;
  resetChallengeTracking: () => void;
  getChallengeStatus: (challengeId: string) => boolean;
  setCurrentChallenge: (challengeId: string | null) => void;
  checkAndCompleteObjectives: () => void;
  getObjectiveStatus: (objectiveId: string) => boolean;
  markObjectiveCompleted: (objectiveId: string) => void;
  markTheoryViewed: (theoryId: string) => void;
  readSensor: (sensorType: string) => Promise<number>;
  getSensorData: (sensorType: string) => Promise<any>;
  checkChallengeCompletion: (challengeId: string) => void;
  // Enhanced simulator methods
  simulateMovement: (direction: string, speed: number, duration: number) => Promise<void>;
  simulateRotation: (direction: string, angle: number) => Promise<void>;
}

const INITIAL_ROBOT_STATE = {
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  isMoving: false,
  isGrabbing: false,
  batteryLevel: 100,
};

const INITIAL_CHALLENGE_TRACKING: ChallengeTracking = {
  hasMovedForward: false,
  hasMovedBackward: false,
  hasMovedLeft: false,
  hasMovedRight: false,
  hasRotatedLeft: false,
  hasRotatedRight: false,
  hasGrabbed: false,
  hasReleased: false,
  hasHovered: false,
  hasLanded: false,
  totalDistanceMoved: 0,
  totalRotations: 0,
  completedChallenges: new Set<string>(),
  completedObjectives: new Set<string>(),
  viewedTheory: new Set<string>(),
  currentChallengeId: null,
  maxForwardDistance: 0,
  maxBackwardDistance: 0,
  totalRotationAngle: 0,
  hasReadSensor: false,
  sensorReadings: 0,
  hasReachedTarget: false,
  targetPositions: [],
  hasReachedPickupArea: false,
  hasCompletedPath: false,
};

// Define challenge objectives with proper completion criteria
const CHALLENGE_OBJECTIVES = {
  'intro-1': [
    { id: 'obj1', criteriaType: 'theory', criteriaValue: 'movement_basics' },
    { id: 'obj2', criteriaType: 'distance_forward', criteriaValue: 5 }, // 5 meters as specified
    { id: 'obj3', criteriaType: 'rotation_angle', criteriaValue: Math.PI/2 } // 90 degrees
  ],
  'intro-2': [
    { id: 'obj4', criteriaType: 'theory', criteriaValue: 'sensor_basics' },
    { id: 'obj5', criteriaType: 'sensor_read', criteriaValue: true }
  ],
  'warehouse-1': [
    { id: 'obj6', criteriaType: 'theory', criteriaValue: 'path_planning' },
    { id: 'obj7', criteriaType: 'position_reached', criteriaValue: { x: 5, z: 8, tolerance: 2 } },
    { id: 'obj8', criteriaType: 'grabbed_object', criteriaValue: true }
  ]
};

export const useRobotStore = create<RobotStoreState>((set, get) => ({
  selectedRobot: null,
  robotState: {
    robotId: 'default',
    type: 'mobile',
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    jointPositions: {},
    sensorReadings: [],
    isMoving: false,
    isGrabbing: false,
    batteryLevel: 100,
    errors: [],
    currentJointCommand: null,
  },
  isMoving: false,
  jointPositions: {
    base: 0,
    shoulder: 0,
    elbow: 0,
    wrist: 0,
    altitude: 0.5,
  },
  environment: {
    id: 'warehouse',
    name: 'warehouse',
    description: 'A warehouse environment with shelves, boxes, and robots.',
    temperature: 22,
    humidity: 45,
  },
  performance: {
    distanceTraveled: 0,
    rotations: 0,
    tasksCompleted: 0,
    batteryUsed: 0,
  },
  challengeTracking: { ...INITIAL_CHALLENGE_TRACKING },
  moveCommands: null,

  selectRobot: (config) => {
    const initialPosition = { x: 0, y: config.type === 'drone' ? 0.5 : 0, z: 0 };
    set({
      selectedRobot: config,
      robotState: {
        robotId: config.id,
        type: config.type,
        position: initialPosition,
        rotation: { x: 0, y: 0, z: 0 },
        jointPositions: {},
        sensorReadings: [],
        isMoving: false,
        isGrabbing: false,
        batteryLevel: 100,
        errors: [],
        currentJointCommand: null,
      },
      isMoving: false,
      jointPositions: {
        base: 0,
        shoulder: 0,
        elbow: 0,
        wrist: 0,
        altitude: config.type === 'drone' ? 0.5 : 0,
      },
      moveCommands: null,
    });
  },

  // Enhanced movement that combines visual movement with challenge tracking
  simulateMovement: async (direction: string, speed: number, duration: number) => {
    console.log(`🤖 Starting simulated movement: ${direction} at speed ${speed} for ${duration}ms`);
    
    // Get initial position to calculate actual distance moved
    const initialState = get();
    const initialPosition = initialState.robotState?.position || { x: 0, y: 0, z: 0 };
    
    // Start visual movement using the existing moveRobot method
    get().moveRobot({ 
      direction: direction as any, 
      speed: speed 
    });

    // Wait for the specified duration
    await new Promise(resolve => setTimeout(resolve, duration));
    
    // Stop the visual movement
    get().stopRobot();

    // Get final position to calculate actual distance moved
    const finalState = get();
    const finalPosition = finalState.robotState?.position || { x: 0, y: 0, z: 0 };
    
    // Calculate actual distance moved
    const actualDistance = Math.sqrt(
      Math.pow(finalPosition.x - initialPosition.x, 2) + 
      Math.pow(finalPosition.z - initialPosition.z, 2)
    );

    // Update challenge tracking with the actual movement
    set((state) => {
      const newTracking = { ...state.challengeTracking };
      
      // Track movement type and update specific tracking
      switch (direction) {
        case 'forward':
          newTracking.hasMovedForward = true;
          newTracking.totalDistanceMoved += actualDistance;
          // For forward movement, track the Z-axis distance specifically
          const forwardDistance = finalPosition.z - initialPosition.z;
          if (forwardDistance > 0) {
            newTracking.maxForwardDistance = Math.max(
              newTracking.maxForwardDistance, 
              finalPosition.z
            );
          }
          console.log(`📈 Forward distance: ${newTracking.maxForwardDistance.toFixed(3)}m (moved ${forwardDistance.toFixed(3)}m this step)`);
          break;
        case 'backward':
          newTracking.hasMovedBackward = true;
          newTracking.totalDistanceMoved += actualDistance;
          break;
        case 'left':
          newTracking.hasMovedLeft = true;
          newTracking.totalDistanceMoved += actualDistance;
          break;
        case 'right':
          newTracking.hasMovedRight = true;
          newTracking.totalDistanceMoved += actualDistance;
          break;
      }
      
      console.log(`📊 Total distance moved: ${newTracking.totalDistanceMoved.toFixed(3)}m`);
      console.log(`🎯 Current forward progress: ${newTracking.maxForwardDistance.toFixed(3)}m / 5.0m required`);
      
      return { challengeTracking: newTracking };
    });

    // Check objectives after movement
    setTimeout(() => get().checkAndCompleteObjectives(), 200);
    
    console.log(`✅ Movement simulation complete`);
  },

  // Enhanced rotation that combines visual rotation with challenge tracking  
  simulateRotation: async (direction: string, angle: number) => {
    console.log(`🔄 Starting simulated rotation: ${direction} by ${angle}°`);
    
    // Get initial rotation to calculate actual rotation
    const initialState = get();
    const initialRotation = initialState.robotState?.rotation.y || 0;
    
    // Start visual rotation using the existing rotateRobot method
    get().rotateRobot({ 
      direction: direction as any, 
      speed: 0.5 
    });

    // Calculate rotation duration based on angle (roughly 1 second per 90 degrees)
    const rotationDuration = (angle / 90) * 1000;
    
    console.log(`⏱️ Rotation duration: ${rotationDuration}ms`);

    // Wait for the rotation to complete
    await new Promise(resolve => setTimeout(resolve, rotationDuration));
    
    // Stop the visual rotation
    get().stopRobot();

    // Get final rotation to calculate actual rotation
    const finalState = get();
    const finalRotation = finalState.robotState?.rotation.y || 0;
    
    // Calculate actual rotation amount (handle wrap-around)
    let actualRotation = Math.abs(finalRotation - initialRotation);
    if (actualRotation > Math.PI) {
      actualRotation = 2 * Math.PI - actualRotation;
    }

    // Update challenge tracking with the actual rotation
    set((state) => {
      const newTracking = { ...state.challengeTracking };
      
      // Track rotation type
      if (direction === 'left') {
        newTracking.hasRotatedLeft = true;
      } else {
        newTracking.hasRotatedRight = true;
      }
      
      // Add to total rotation
      newTracking.totalRotations += actualRotation;
      newTracking.totalRotationAngle += actualRotation;
      
      console.log(`🧭 Total rotation: ${(newTracking.totalRotationAngle * 180 / Math.PI).toFixed(1)}° (moved ${(actualRotation * 180 / Math.PI).toFixed(1)}° this step)`);
      console.log(`🎯 Current rotation progress: ${(newTracking.totalRotationAngle * 180 / Math.PI).toFixed(1)}° / 90.0° required`);
      
      return { challengeTracking: newTracking };
    });

    // Check objectives after rotation
    setTimeout(() => get().checkAndCompleteObjectives(), 200);
    
    console.log(`✅ Rotation simulation complete`);
  },

  moveRobot: ({ direction, speed, joint }) => {
    const state = get();
    if (!state.robotState) return;

    // Clear any existing intervals
    if ((window as any).robotMoveInterval) {
      clearInterval((window as any).robotMoveInterval);
    }

    set({ 
      isMoving: true,
      moveCommands: { direction, speed, joint }
    });

    // Track the movement direction for challenge completion
    set((state) => {
      const newTracking = { ...state.challengeTracking };
      switch (direction) {
        case 'forward':
          newTracking.hasMovedForward = true;
          break;
        case 'backward':
          newTracking.hasMovedBackward = true;
          break;
        case 'left':
          newTracking.hasMovedLeft = true;
          break;
        case 'right':
          newTracking.hasMovedRight = true;
          break;
        case 'up':
        case 'down':
          newTracking.hasHovered = true;
          break;
      }
      
      return { challengeTracking: newTracking };
    });

    // Handle drone altitude changes
    if (state.selectedRobot?.type === 'drone' && joint === 'altitude') {
      const step = direction === 'up' ? 0.05 : -0.05;
      set((state) => ({
        jointPositions: {
          ...state.jointPositions,
          altitude: Math.max(0.1, Math.min(state.jointPositions.altitude + step, 4.0)),
        },
      }));
      return;
    }

    if (state.selectedRobot?.type === 'arm' && joint) {
      // Handle arm movement
      const currentPos = state.jointPositions[joint];
      const step = (direction === 'left' || direction === 'backward') ? -0.05 : 0.05;
      const limits = {
        base: { min: -Math.PI, max: Math.PI },
        shoulder: { min: -Math.PI / 2, max: Math.PI / 4 },
        elbow: { min: -Math.PI / 2, max: Math.PI / 2 },
        wrist: { min: -Math.PI, max: Math.PI },
      };

      const newPos = currentPos + step;
      const clampedPos = Math.max(limits[joint].min, Math.min(newPos, limits[joint].max));

      set((state) => ({
        jointPositions: {
          ...state.jointPositions,
          [joint]: clampedPos,
        },
      }));
      
      setTimeout(() => get().checkAndCompleteObjectives(), 100);
      return;
    }

    // Handle movement for explorer bot (sphere robot)
    if (state.selectedRobot?.type === 'explorer') {
      const moveStep = 0.12 * speed;
      const angle = state.robotState.rotation.y;
      let deltaX = 0;
      let deltaZ = 0;

      switch (direction) {
        case 'forward':
          deltaX = Math.sin(angle) * moveStep;
          deltaZ = Math.cos(angle) * moveStep;
          break;
        case 'backward':
          deltaX = -Math.sin(angle) * moveStep;
          deltaZ = -Math.cos(angle) * moveStep;
          break;
        case 'left':
          deltaX = -Math.cos(angle) * moveStep;
          deltaZ = Math.sin(angle) * moveStep;
          break;
        case 'right':
          deltaX = Math.cos(angle) * moveStep;
          deltaZ = -Math.sin(angle) * moveStep;
          break;
      }

      const moveInterval = setInterval(() => {
        const currentState = get();
        if (!currentState.robotState || !currentState.isMoving) {
          clearInterval(moveInterval);
          return;
        }

        const newPosition = {
          x: currentState.robotState.position.x + deltaX,
          y: currentState.robotState.position.y,
          z: currentState.robotState.position.z + deltaZ,
        };

        const distance = Math.sqrt(deltaX * deltaX + deltaZ * deltaZ);
        
        set((state) => {
          const newTracking = { ...state.challengeTracking };
          newTracking.totalDistanceMoved += distance;
          
          if (direction === 'forward') {
            newTracking.maxForwardDistance = Math.max(newTracking.maxForwardDistance, newPosition.z);
          } else if (direction === 'backward') {
            newTracking.maxBackwardDistance = Math.max(newTracking.maxBackwardDistance, Math.abs(newPosition.z));
          }
          
          return {
            robotState: {
              ...currentState.robotState,
              position: newPosition,
              isMoving: true,
            },
            challengeTracking: newTracking,
          };
        });
        
        get().checkAndCompleteObjectives();
      }, 16);

      (window as any).robotMoveInterval = moveInterval;
      return;
    }

    // Handle movement for other robot types
    const moveStep = 0.1 * speed;
    const angle = state.robotState.rotation.y;
    const deltaX = Math.sin(angle) * moveStep;
    const deltaZ = Math.cos(angle) * moveStep;
    const multiplier = direction === 'forward' ? 1 : -1;

    const moveInterval = setInterval(() => {
      const currentState = get();
      if (!currentState.robotState || !currentState.isMoving) {
        clearInterval(moveInterval);
        return;
      }

      const newPosition = {
        x: currentState.robotState.position.x + deltaX * multiplier,
        y: currentState.robotState.position.y,
        z: currentState.robotState.position.z + deltaZ * multiplier,
      };

      const distance = Math.sqrt((deltaX * multiplier) ** 2 + (deltaZ * multiplier) ** 2);
      
      set((state) => {
        const newTracking = { ...state.challengeTracking };
        newTracking.totalDistanceMoved += distance;
        
        if (direction === 'forward') {
          newTracking.maxForwardDistance = Math.max(newTracking.maxForwardDistance, newPosition.z);
        } else if (direction === 'backward') {
          newTracking.maxBackwardDistance = Math.max(newTracking.maxBackwardDistance, Math.abs(newPosition.z));
        }
        
        return {
          robotState: {
            ...currentState.robotState,
            position: newPosition,
            isMoving: true,
          },
          challengeTracking: newTracking,
        };
      });
      
      get().checkAndCompleteObjectives();
    }, 16);

    (window as any).robotMoveInterval = moveInterval;
  },

  rotateRobot: ({ direction, speed }) => {
    const state = get();
    if (!state.robotState) return;

    if ((window as any).robotRotateInterval) {
      clearInterval((window as any).robotRotateInterval);
    }

    set({ isMoving: true });
    
    set((state) => {
      const newTracking = { ...state.challengeTracking };
      if (direction === 'left') {
        newTracking.hasRotatedLeft = true;
      } else {
        newTracking.hasRotatedRight = true;
      }
      return { challengeTracking: newTracking };
    });
    
    let rotateStep = 0.05 * speed;
    if (state.selectedRobot?.type === 'explorer') {
      rotateStep = 0.08 * speed;
    }
    
    const delta = direction === 'left' ? rotateStep : -rotateStep;

    const rotateInterval = setInterval(() => {
      const currentState = get();
      if (!currentState.robotState || !currentState.isMoving) {
        clearInterval(rotateInterval);
        return;
      }

      const newRotation = {
        ...currentState.robotState.rotation,
        y: (currentState.robotState.rotation.y + delta) % (Math.PI * 2),
      };

      set((state) => {
        const newTracking = { ...state.challengeTracking };
        newTracking.totalRotations += Math.abs(delta);
        newTracking.totalRotationAngle += Math.abs(delta);
        
        return {
          robotState: {
            ...currentState.robotState,
            rotation: newRotation,
            isMoving: true,
          },
          challengeTracking: newTracking,
        };
      });
      
      get().checkAndCompleteObjectives();
    }, 16);

    (window as any).robotRotateInterval = rotateInterval;
  },

  stopRobot: () => {
    if ((window as any).robotMoveInterval) {
      clearInterval((window as any).robotMoveInterval);
      (window as any).robotMoveInterval = null;
    }

    if ((window as any).robotRotateInterval) {
      clearInterval((window as any).robotRotateInterval);
      (window as any).robotRotateInterval = null;
    }

    set((state) => ({
      isMoving: false,
      moveCommands: null,
      robotState: state.robotState ? {
        ...state.robotState,
        isMoving: false,
      } : null,
    }));
  },

  grabObject: () => {
    set((state) => {
      const newTracking = { ...state.challengeTracking };
      newTracking.hasGrabbed = true;

      console.log('🤏 Object grabbed!');

      return {
        robotState: state.robotState ? {
          ...state.robotState,
          isGrabbing: true,
        } : null,
        challengeTracking: newTracking,
      };
    });
    
    setTimeout(() => get().checkAndCompleteObjectives(), 100);
  },

  releaseObject: () => {
    set((state) => {
      const newTracking = { ...state.challengeTracking };
      newTracking.hasReleased = true;

      return {
        robotState: state.robotState ? {
          ...state.robotState,
          isGrabbing: false,
        } : null,
        challengeTracking: newTracking,
      };
    });
    
    setTimeout(() => get().checkAndCompleteObjectives(), 100);
  },

  readSensor: async (sensorType: string): Promise<number> => {
    const state = get();
    if (!state.robotState) return 0;

    set((state) => ({
      challengeTracking: {
        ...state.challengeTracking,
        hasReadSensor: true,
        sensorReadings: state.challengeTracking.sensorReadings + 1,
      }
    }));

    console.log(`📡 Reading ${sensorType} sensor...`);

    let reading = 0;
    switch (sensorType) {
      case 'ultrasonic':
        reading = Math.random() * 3.9 + 0.1;
        break;
      case 'camera':
        reading = Math.random();
        break;
      default:
        reading = 0;
    }

    console.log(`📊 Sensor reading: ${reading.toFixed(2)}`);
    
    // Check objectives after sensor read
    setTimeout(() => get().checkAndCompleteObjectives(), 100);
    
    return reading;
  },

  getSensorData: async (sensorType: string): Promise<any> => {
    const reading = await get().readSensor(sensorType);
    return {
      [sensorType]: reading,
      timestamp: Date.now()
    };
  },

  setEnvironment: (config) => set({ environment: config }),
  updateRobotPosition: (position) => set((state) => ({
    robotState: state.robotState ? { ...state.robotState, position } : null,
  })),
  updateRobotRotation: (rotation) => set((state) => ({
    robotState: state.robotState ? { ...state.robotState, rotation } : null,
  })),
  updateJointPosition: (joint, value) => set((state) => ({
    jointPositions: { ...state.jointPositions, [joint]: value },
  })),

  resetRobotState: () => set((state) => ({
    robotState: state.robotState ? {
      ...state.robotState,
      ...INITIAL_ROBOT_STATE,
      position: { 
        ...INITIAL_ROBOT_STATE.position,
        y: state.selectedRobot?.type === 'drone' ? 0.5 : 0 
      },
    } : null,
    isMoving: false,
    jointPositions: {
      base: 0,
      shoulder: 0,
      elbow: 0,
      wrist: 0,
      altitude: state.selectedRobot?.type === 'drone' ? 0.5 : 0,
    },
    moveCommands: null,
  })),

  resetRobotStateByType: () => set((state) => ({
    robotState: state.robotState ? {
      ...state.robotState,
      ...INITIAL_ROBOT_STATE,
      position: { 
        ...INITIAL_ROBOT_STATE.position,
        y: state.selectedRobot?.type === 'drone' ? 0.5 : 0 
      },
    } : null,
    isMoving: false,
    jointPositions: {
      base: 0,
      shoulder: 0,
      elbow: 0,
      wrist: 0,
      altitude: state.selectedRobot?.type === 'drone' ? 0.5 : 0,
    },
    moveCommands: null,
  })),

  startHover: () => {
    const state = get();
    if (!state.robotState || state.selectedRobot?.type !== 'drone') return;
    
    set((state) => {
      const newTracking = { ...state.challengeTracking };
      newTracking.hasHovered = true;

      return {
        robotState: state.robotState ? {
          ...state.robotState,
          position: { ...state.robotState.position, y: 1.5 },
          isMoving: true,
        } : null,
        isMoving: true,
        jointPositions: {
          ...state.jointPositions,
          altitude: 1.5,
        },
        challengeTracking: newTracking,
      };
    });
    
    setTimeout(() => get().checkAndCompleteObjectives(), 100);
  },

  landDrone: () => {
    const state = get();
    if (!state.robotState || state.selectedRobot?.type !== 'drone') return;
    
    set((state) => {
      const newTracking = { ...state.challengeTracking };
      newTracking.hasLanded = true;

      return {
        robotState: state.robotState ? {
          ...state.robotState,
          position: { ...state.robotState.position, y: 0 },
          isMoving: false,
        } : null,
        isMoving: false,
        jointPositions: {
          ...state.jointPositions,
          altitude: 0.1,
        },
        challengeTracking: newTracking,
      };
    });
    
    setTimeout(() => get().checkAndCompleteObjectives(), 100);
  },

  startExplorerAnimation: () => {
    const state = get();
    if (!state.robotState || state.selectedRobot?.type !== 'explorer') return;
    
    set((state) => ({
      robotState: state.robotState ? {
        ...state.robotState,
        isMoving: true,
      } : null,
      isMoving: true,
    }));
  },

  stopExplorerAnimation: () => {
    const state = get();
    if (!state.robotState || state.selectedRobot?.type !== 'explorer') return;
    
    set((state) => ({
      robotState: state.robotState ? {
        ...state.robotState,
        isMoving: false,
      } : null,
      isMoving: false,
    }));
  },

  setCurrentChallenge: (challengeId) => {
    console.log(`🎯 Setting current challenge: ${challengeId}`);
    set((state) => ({
      challengeTracking: {
        ...state.challengeTracking,
        currentChallengeId: challengeId,
      },
    }));
  },

  checkAndCompleteObjectives: () => {
    const state = get();
    if (!state.challengeTracking.currentChallengeId || !state.robotState) return;

    const { position, rotation } = state.robotState;
    const { challengeTracking } = state;
    const challengeId = challengeTracking.currentChallengeId;

    // Get objectives for current challenge
    const objectives = CHALLENGE_OBJECTIVES[challengeId as keyof typeof CHALLENGE_OBJECTIVES];
    if (!objectives) return;

    let newCompletions = false;

    objectives.forEach(objective => {
      if (challengeTracking.completedObjectives.has(objective.id)) return;

      let shouldComplete = false;

      switch (objective.criteriaType) {
        case 'distance_forward':
          shouldComplete = challengeTracking.maxForwardDistance >= objective.criteriaValue;
          if (shouldComplete) {
            console.log(`✅ Distance objective completed! Moved ${challengeTracking.maxForwardDistance.toFixed(2)}m forward (required: ${objective.criteriaValue}m)`);
          }
          break;
        
        case 'rotation_angle':
          shouldComplete = challengeTracking.totalRotationAngle >= objective.criteriaValue;
          if (shouldComplete) {
            console.log(`✅ Rotation objective completed! Rotated ${(challengeTracking.totalRotationAngle * 180 / Math.PI).toFixed(1)}° (required: ${(objective.criteriaValue * 180 / Math.PI).toFixed(1)}°)`);
          }
          break;
        
        case 'sensor_read':
          shouldComplete = challengeTracking.hasReadSensor;
          if (shouldComplete) {
            console.log(`✅ Sensor objective completed! Read sensor ${challengeTracking.sensorReadings} times`);
          }
          break;
        
        case 'position_reached':
          const target = objective.criteriaValue as { x: number; z: number; tolerance: number };
          const distance = Math.sqrt(
            Math.pow(position.x - target.x, 2) + 
            Math.pow(position.z - target.z, 2)
          );
          shouldComplete = distance <= target.tolerance;
          if (shouldComplete) {
            console.log(`✅ Position objective completed! Reached target within ${distance.toFixed(2)}m (tolerance: ${target.tolerance}m)`);
            set((state) => ({
              challengeTracking: {
                ...state.challengeTracking,
                hasReachedPickupArea: true,
              }
            }));
          }
          break;
        
        case 'grabbed_object':
          shouldComplete = state.robotState.isGrabbing;
          if (shouldComplete) {
            console.log(`✅ Grab objective completed! Object grabbed successfully`);
          }
          break;
        
        case 'theory':
          shouldComplete = challengeTracking.viewedTheory.has(objective.criteriaValue);
          if (shouldComplete) {
            console.log(`✅ Theory objective completed! Viewed theory: ${objective.criteriaValue}`);
          }
          break;
      }

      if (shouldComplete) {
        get().markObjectiveCompleted(objective.id);
        newCompletions = true;
      }
    });

    // Check if challenge should be completed
    if (newCompletions) {
      get().checkChallengeCompletion(challengeId);
    }
  },

  checkChallengeCompletion: (challengeId: string) => {
    const state = get();
    const objectives = CHALLENGE_OBJECTIVES[challengeId as keyof typeof CHALLENGE_OBJECTIVES];
    if (!objectives) return;

    const allObjectivesComplete = objectives.every(obj => 
      state.challengeTracking.completedObjectives.has(obj.id)
    );

    if (allObjectivesComplete && !state.challengeTracking.completedChallenges.has(challengeId)) {
      console.log(`🏆 Challenge completed: ${challengeId}`);
      get().markChallengeCompleted(challengeId);
      
      // Dispatch challenge completion event
      window.dispatchEvent(new CustomEvent('challengeCompleted', { 
        detail: { challengeId } 
      }));
    }
  },

  markObjectiveCompleted: (objectiveId) => {
    set((state) => {
      const newTracking = { ...state.challengeTracking };
      if (!newTracking.completedObjectives.has(objectiveId)) {
        newTracking.completedObjectives.add(objectiveId);
        console.log(`✅ Objective marked complete: ${objectiveId}`);
        
        window.dispatchEvent(new CustomEvent('objectiveCompleted', { 
          detail: { objectiveId, challengeId: state.challengeTracking.currentChallengeId } 
        }));
      }
      return { challengeTracking: newTracking };
    });
  },

  markTheoryViewed: (theoryId: string) => {
    set((state) => {
      const newTracking = { ...state.challengeTracking };
      if (!newTracking.viewedTheory.has(theoryId)) {
        newTracking.viewedTheory.add(theoryId);
        console.log(`📚 Theory viewed: ${theoryId}`);
        
        // Check if this completes a theory-based objective
        setTimeout(() => get().checkAndCompleteObjectives(), 100);
      }
      return { challengeTracking: newTracking };
    });
  },

  getObjectiveStatus: (objectiveId) => {
    const state = get();
    return state.challengeTracking.completedObjectives.has(objectiveId);
  },

  markChallengeCompleted: (challengeId) => {
    set((state) => {
      const newTracking = { ...state.challengeTracking };
      if (!newTracking.completedChallenges.has(challengeId)) {
        newTracking.completedChallenges.add(challengeId);
        console.log(`🏆 Challenge marked complete: ${challengeId}`);
      }
      return { challengeTracking: newTracking };
    });
  },

  resetChallengeTracking: () => {
    set({ challengeTracking: { ...INITIAL_CHALLENGE_TRACKING } });
  },

  getChallengeStatus: (challengeId) => {
    const state = get();
    return state.challengeTracking.completedChallenges.has(challengeId);
  },
}));