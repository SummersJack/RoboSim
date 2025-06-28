import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RobotConfig } from '@/types/robot.types';
import { useRobotStore } from '@/store/robotStore';

interface RobotModelProps {
  robotConfig: RobotConfig;
}

// Define joint limits for robotic arm
const ARM_JOINT_LIMITS = {
  base: { min: -Math.PI, max: Math.PI },
  shoulder: { min: -Math.PI / 2, max: Math.PI / 2 },
  elbow: { min: -Math.PI * 0.75, max: Math.PI * 0.75 },
  wristPitch: { min: -Math.PI / 2, max: Math.PI / 2 },
  wristRoll: { min: -Math.PI, max: Math.PI },
  gripper: { min: 0, max: 0.04 }
};

const RobotModel: React.FC<RobotModelProps> = ({ robotConfig }) => {
  const modelRef = useRef<THREE.Group>(null);
  const prevPositionRef = useRef(new THREE.Vector3(0, 0, 0));
  const lastPositionRef = useRef(new THREE.Vector3(0, 0, 0));
  const movementThresholdRef = useRef(0);
  
  const velocityRef = useRef(new THREE.Vector3(0, 0, 0));
  const accelerationRef = useRef(new THREE.Vector3(0, 0, 0));
  const angularVelocityRef = useRef(0);
  const lastUpdateTimeRef = useRef(Date.now());
  const targetVelocityRef = useRef(new THREE.Vector3(0, 0, 0));
  const targetAngularVelocityRef = useRef(0);

  // Drone-specific refs
  const propellersRef = useRef<THREE.Group[]>([]);
  const droneAltitude = useRef(0);

  // Robotic arm specific refs
  const armBaseRef = useRef<THREE.Group>(null);
  const armShoulderRef = useRef<THREE.Group>(null);
  const armElbowRef = useRef<THREE.Group>(null);
  const armWristPitchRef = useRef<THREE.Group>(null);
  const armWristRollRef = useRef<THREE.Group>(null);
  const armGripperLeftRef = useRef<THREE.Mesh>(null);
  const armGripperRightRef = useRef<THREE.Mesh>(null);

  // Arm joint angles state
  const [armJointAngles, setArmJointAngles] = useState({
    base: 0,
    shoulder: 0,
    elbow: Math.PI / 4,
    wristPitch: 0,
    wristRoll: 0,
    gripper: 0.08  // Wider default opening for larger gripper
  });

  // Target angles for smooth interpolation
  const armTargetAnglesRef = useRef({ 
    base: 0,
    shoulder: 0,
    elbow: Math.PI / 4,
    wristPitch: 0,
    wristRoll: 0,
    gripper: 0.08 
  });
  const armCurrentAnglesRef = useRef({ 
    base: 0,
    shoulder: 0,
    elbow: Math.PI / 4,
    wristPitch: 0,
    wristRoll: 0,
    gripper: 0.08 
  });

  const { robotState, isMoving: storeIsMoving, moveCommands } = useRobotStore();
  const [isMoving, setIsMoving] = useState(false);
  const [currentAction, setCurrentAction] = useState<string | null>(null);

  const humanoidGLTF = useGLTF('/models/humanoid-robot/rusty_robot_walking_animated.glb');
  const spiderGLTF = useGLTF('/models/spider-model/source/spider_bot.glb');
  const tankGLTF = useGLTF('/models/tank-model/t-35_heavy_five-turret_tank.glb');
  const explorerGLTF = useGLTF('/models/explorer-bot/360_sphere_robot_no_glass.glb');

  const isSpider = robotConfig.type === 'spider';
  const isTank = robotConfig.type === 'tank';
  const isExplorer = robotConfig.type === 'explorer' || robotConfig.type === 'mobile';
  const isDrone = robotConfig.type === 'drone';
  const isArm = robotConfig.type === 'arm';

  console.log('🔍 Robot type debug:', {
    robotConfigType: robotConfig.type,
    isExplorer,
    isSpider,
    isTank,
    isDrone,
    isArm
  });

  // Physics constants for drone
  const PHYSICS = {
    droneHoverAmplitude: 0.008,
    droneHoverSpeed: 2.5,
    propellerSpeedIdle: 15,
    propellerSpeedActive: 30,
    droneLiftAcceleration: 0.03,
    droneMaxAltitude: 4.0,
    droneMinAltitude: 0.15
  };

  // Movement speeds for arm
  const ARM_MOVEMENT_SPEED = 0.02;  // Slower for more precise control
  const ARM_GRIPPER_SPEED = 0.002;  // Doubled for larger gripper

  // Handle arm move commands - Fixed to work with robotStore
  useEffect(() => {
    if (!isArm || !moveCommands) return;

    const { direction, joint } = moveCommands;
    
    // Map directions to delta values
    let delta = 0;
    if (direction === 'forward' || direction === 'up' || direction === 'right') {
      delta = 1;
    } else if (direction === 'backward' || direction === 'down' || direction === 'left') {
      delta = -1;
    }
    
    const newTarget = { ...armTargetAnglesRef.current };
    
    // Handle joint movements
    if (joint) {
      switch (joint) {
        case 'base':
          newTarget.base = THREE.MathUtils.clamp(
            newTarget.base + delta * ARM_MOVEMENT_SPEED,
            ARM_JOINT_LIMITS.base.min,
            ARM_JOINT_LIMITS.base.max
          );
          break;
        case 'shoulder':
          newTarget.shoulder = THREE.MathUtils.clamp(
            newTarget.shoulder + delta * ARM_MOVEMENT_SPEED,
            ARM_JOINT_LIMITS.shoulder.min,
            ARM_JOINT_LIMITS.shoulder.max
          );
          break;
        case 'elbow':
          newTarget.elbow = THREE.MathUtils.clamp(
            newTarget.elbow + delta * ARM_MOVEMENT_SPEED,
            ARM_JOINT_LIMITS.elbow.min,
            ARM_JOINT_LIMITS.elbow.max
          );
          break;
        case 'wrist':
          // Use left/right for wrist roll, forward/backward for wrist pitch
          if (direction === 'left' || direction === 'right') {
            const rollDelta = direction === 'left' ? -1 : 1;
            newTarget.wristRoll = THREE.MathUtils.clamp(
              newTarget.wristRoll + rollDelta * ARM_MOVEMENT_SPEED,
              ARM_JOINT_LIMITS.wristRoll.min,
              ARM_JOINT_LIMITS.wristRoll.max
            );
          } else {
            newTarget.wristPitch = THREE.MathUtils.clamp(
              newTarget.wristPitch + delta * ARM_MOVEMENT_SPEED,
              ARM_JOINT_LIMITS.wristPitch.min,
              ARM_JOINT_LIMITS.wristPitch.max
            );
          }
          break;
      }
    } else {
      // If no joint specified, control gripper with forward/backward
      if (direction === 'forward') {
        newTarget.gripper = THREE.MathUtils.clamp(
          newTarget.gripper + ARM_GRIPPER_SPEED,
          ARM_JOINT_LIMITS.gripper.min,
          ARM_JOINT_LIMITS.gripper.max
        );
      } else if (direction === 'backward') {
        newTarget.gripper = THREE.MathUtils.clamp(
          newTarget.gripper - ARM_GRIPPER_SPEED,
          ARM_JOINT_LIMITS.gripper.min,
          ARM_JOINT_LIMITS.gripper.max
        );
      }
    }
    
    armTargetAnglesRef.current = newTarget;
  }, [moveCommands, isArm]);

  // Robotic Arm Geometry Component - Industrial Scale
  const RoboticArmGeometry = () => {
    // Material definitions - Industrial colors
    const baseMaterial = <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />;
    const jointMaterial = <meshStandardMaterial color="#ff6b00" metalness={0.8} roughness={0.2} />;
    const armMaterial = <meshStandardMaterial color="#e8e8e8" metalness={0.7} roughness={0.2} />;
    const gripperMaterial = <meshStandardMaterial color="#4a4a4a" metalness={0.8} roughness={0.3} />;
    const accentMaterial = <meshStandardMaterial color="#0066ff" metalness={0.9} roughness={0.1} emissive="#0066ff" emissiveIntensity={0.2} />;
    const warningMaterial = <meshStandardMaterial color="#ffcc00" metalness={0.6} roughness={0.4} emissive="#ffcc00" emissiveIntensity={0.3} />;

    return (
      <>
        {/* Industrial Base Platform - Much larger */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.4, 0.5, 0.12, 32]} />
          {baseMaterial}
        </mesh>
        
        {/* Base warning stripes */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <mesh key={i} castShadow position={[
            Math.cos(angle * Math.PI / 180) * 0.45,
            0.061,
            Math.sin(angle * Math.PI / 180) * 0.45
          ]}>
            <boxGeometry args={[0.05, 0.002, 0.08]} />
            {warningMaterial}
          </mesh>
        ))}
        
        {/* Base Joint Housing - Industrial scale */}
        <mesh castShadow receiveShadow position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.25, 0.3, 0.18, 32]} />
          {jointMaterial}
        </mesh>

        {/* Cable management ring */}
        <mesh castShadow position={[0, 0.28, 0]}>
          <torusGeometry args={[0.28, 0.015, 16, 32]} />
          {baseMaterial}
        </mesh>

        {/* Rotating Base */}
        <group ref={armBaseRef} position={[0, 0.3, 0]}>
          {/* Base Connector - Industrial size */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.18, 0.15, 0.18]} />
            {armMaterial}
          </mesh>

          {/* Base joint details */}
          <mesh castShadow position={[0, 0.08, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.03, 32]} />
            {jointMaterial}
          </mesh>

          {/* Shoulder Joint */}
          <group ref={armShoulderRef} position={[0, 0.075, 0]}>
            {/* Shoulder Motor Housing - Large industrial motor */}
            <mesh castShadow receiveShadow rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.1, 0.1, 0.22, 32]} />
              {jointMaterial}
            </mesh>
            
            {/* Motor ventilation fins */}
            {[...Array(12)].map((_, i) => {
              const angle = (i * Math.PI * 2) / 12;
              return (
                <mesh key={i} castShadow position={[
                  Math.cos(angle) * 0.11,
                  0,
                  Math.sin(angle) * 0.11
                ]} rotation={[0, angle, 0]}>
                  <boxGeometry args={[0.02, 0.18, 0.003]} />
                  {baseMaterial}
                </mesh>
              );
            })}
            
            {/* Upper Arm - Thick industrial beam */}
            <mesh castShadow receiveShadow position={[0, 0.35, 0]}>
              <boxGeometry args={[0.12, 0.7, 0.12]} />
              {armMaterial}
            </mesh>
            
            {/* Structural reinforcement ribs */}
            <mesh castShadow position={[0.061, 0.35, 0]}>
              <boxGeometry args={[0.003, 0.65, 0.1]} />
              {accentMaterial}
            </mesh>
            <mesh castShadow position={[-0.061, 0.35, 0]}>
              <boxGeometry args={[0.003, 0.65, 0.1]} />
              {accentMaterial}
            </mesh>
            
            {/* Upper Arm Logo/Branding area */}
            <mesh castShadow position={[0, 0.25, 0.061]}>
              <boxGeometry args={[0.08, 0.04, 0.001]} />
              {accentMaterial}
            </mesh>
            <mesh castShadow position={[0, 0.45, 0.061]}>
              <boxGeometry args={[0.08, 0.04, 0.001]} />
              {accentMaterial}
            </mesh>

            {/* Elbow Joint */}
            <group ref={armElbowRef} position={[0, 0.7, 0]}>
              {/* Elbow Motor - Heavy duty */}
              <mesh castShadow receiveShadow rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.08, 0.08, 0.18, 32]} />
                {jointMaterial}
              </mesh>
              
              {/* Elbow joint protection cover */}
              <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
                <torusGeometry args={[0.09, 0.02, 16, 32]} />
                {baseMaterial}
              </mesh>
              
              {/* Forearm - Industrial scale */}
              <mesh castShadow receiveShadow position={[0, 0.3, 0]}>
                <boxGeometry args={[0.1, 0.6, 0.1]} />
                {armMaterial}
              </mesh>
              
              {/* Forearm cable guides */}
              {[0.15, 0.3, 0.45].map((y, i) => (
                <mesh key={i} castShadow position={[0, y, 0.051]}>
                  <boxGeometry args={[0.06, 0.025, 0.002]} />
                  {baseMaterial}
                </mesh>
              ))}
              
              {/* Pneumatic/hydraulic lines visual */}
              <mesh castShadow position={[0.04, 0.3, 0.04]}>
                <cylinderGeometry args={[0.008, 0.008, 0.55, 16]} />
                <meshStandardMaterial color="#333333" metalness={0.7} roughness={0.3} />
              </mesh>
              <mesh castShadow position={[-0.04, 0.3, 0.04]}>
                <cylinderGeometry args={[0.008, 0.008, 0.55, 16]} />
                <meshStandardMaterial color="#333333" metalness={0.7} roughness={0.3} />
              </mesh>

              {/* Wrist Assembly */}
              <group position={[0, 0.6, 0]}>
                {/* Wrist Pitch Joint */}
                <group ref={armWristPitchRef}>
                  <mesh castShadow receiveShadow rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.06, 0.06, 0.14, 32]} />
                    {jointMaterial}
                  </mesh>
                  
                  {/* Wrist joint encoder disk visual */}
                  <mesh castShadow position={[0.071, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.05, 0.05, 0.002, 32]} />
                    <meshStandardMaterial color="#00ff00" metalness={0.9} roughness={0.1} emissive="#00ff00" emissiveIntensity={0.1} />
                  </mesh>
                  
                  {/* Wrist Roll Joint */}
                  <group ref={armWristRollRef} position={[0, 0.12, 0]}>
                    <mesh castShadow receiveShadow>
                      <cylinderGeometry args={[0.05, 0.05, 0.08, 32]} />
                      {jointMaterial}
                    </mesh>
                    
                    {/* Tool flange / End effector mount */}
                    <mesh castShadow receiveShadow position={[0, 0.06, 0]}>
                      <cylinderGeometry args={[0.08, 0.08, 0.03, 32]} />
                      {baseMaterial}
                    </mesh>
                    
                    {/* Mounting holes visual */}
                    {[0, 90, 180, 270].map((angle, i) => (
                      <mesh key={i} castShadow position={[
                        Math.cos(angle * Math.PI / 180) * 0.06,
                        0.075,
                        Math.sin(angle * Math.PI / 180) * 0.06
                      ]}>
                        <cylinderGeometry args={[0.005, 0.005, 0.01, 16]} />
                        <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
                      </mesh>
                    ))}

                    {/* Industrial Gripper Assembly */}
                    <group position={[0, 0.09, 0]}>
                      {/* Gripper Base - Robust design */}
                      <mesh castShadow receiveShadow>
                        <boxGeometry args={[0.12, 0.04, 0.08]} />
                        {gripperMaterial}
                      </mesh>
                      
                      {/* Gripper motor housing */}
                      <mesh castShadow position={[0, 0.03, 0]}>
                        <cylinderGeometry args={[0.03, 0.03, 0.04, 32]} />
                        {jointMaterial}
                      </mesh>
                      
                      {/* Left Gripper Finger - Industrial scale */}
                      <group ref={armGripperLeftRef} position={[-0.08, 0.05, 0]}>
                        {/* Main finger structure */}
                        <mesh castShadow receiveShadow>
                          <boxGeometry args={[0.025, 0.08, 0.04]} />
                          {gripperMaterial}
                        </mesh>
                        {/* Finger tip */}
                        <mesh castShadow position={[0, 0.04, 0]}>
                          <boxGeometry args={[0.02, 0.015, 0.035]} />
                          {baseMaterial}
                        </mesh>
                        {/* Gripper rubber pad */}
                        <mesh castShadow position={[0.013, 0.03, 0]}>
                          <boxGeometry args={[0.003, 0.05, 0.03]} />
                          <meshStandardMaterial color="#ff0000" roughness={0.9} />
                        </mesh>
                      </group>
                      
                      {/* Right Gripper Finger - Industrial scale */}
                      <group ref={armGripperRightRef} position={[0.08, 0.05, 0]}>
                        {/* Main finger structure */}
                        <mesh castShadow receiveShadow>
                          <boxGeometry args={[0.025, 0.08, 0.04]} />
                          {gripperMaterial}
                        </mesh>
                        {/* Finger tip */}
                        <mesh castShadow position={[0, 0.04, 0]}>
                          <boxGeometry args={[0.02, 0.015, 0.035]} />
                          {baseMaterial}
                        </mesh>
                        {/* Gripper rubber pad */}
                        <mesh castShadow position={[-0.013, 0.03, 0]}>
                          <boxGeometry args={[0.003, 0.05, 0.03]} />
                          <meshStandardMaterial color="#ff0000" roughness={0.9} />
                        </mesh>
                      </group>
                      
                      {/* Force sensor indicator */}
                      <mesh castShadow position={[0, 0.025, 0.041]}>
                        <cylinderGeometry args={[0.01, 0.01, 0.003, 16]} />
                        <meshStandardMaterial 
                          color="#00ff00" 
                          emissive="#00ff00" 
                          emissiveIntensity={robotState?.isGrabbing ? 0.8 : 0.2} 
                        />
                      </mesh>
                    </group>

                    {/* Tool Center Point Light - Brighter work light */}
                    <pointLight
                      color="#ffffff"
                      intensity={2}
                      distance={1}
                      position={[0, 0.15, 0]}
                    />
                    
                    {/* Work area spot light */}
                    <spotLight
                      color="#ffffff"
                      intensity={1}
                      distance={2}
                      angle={Math.PI / 6}
                      penumbra={0.2}
                      position={[0, 0.15, 0]}
                      target-position={[0, 0.5, 0]}
                    />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>

        {/* Control Panel on Base */}
        <mesh castShadow position={[0.35, 0.08, 0]}>
          <boxGeometry args={[0.1, 0.06, 0.02]} />
          {baseMaterial}
        </mesh>
        
        {/* Status LEDs - Industrial indicators */}
        <mesh castShadow position={[0.32, 0.08, 0.011]}>
          <cylinderGeometry args={[0.008, 0.008, 0.002, 16]} />
          <meshStandardMaterial 
            color="#00ff00" 
            emissive="#00ff00" 
            emissiveIntensity={robotState?.isMoving ? 0.8 : 0.3} 
          />
        </mesh>
        <mesh castShadow position={[0.35, 0.08, 0.011]}>
          <cylinderGeometry args={[0.008, 0.008, 0.002, 16]} />
          <meshStandardMaterial 
            color="#ffcc00" 
            emissive="#ffcc00" 
            emissiveIntensity={0.5} 
          />
        </mesh>
        <mesh castShadow position={[0.38, 0.08, 0.011]}>
          <cylinderGeometry args={[0.008, 0.008, 0.002, 16]} />
          <meshStandardMaterial 
            color="#ff0000" 
            emissive="#ff0000" 
            emissiveIntensity={0.2} 
          />
        </mesh>
        
        {/* Emergency stop button */}
        <mesh castShadow position={[0.35, 0.12, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.01, 32]} />
          <meshStandardMaterial color="#ff0000" metalness={0.6} roughness={0.4} />
        </mesh>
      </>
    );
  };

  // Enhanced Drone with realistic aerodynamics
  const DroneGeometry = () => (
    <>
      {/* Main body - aerodynamic design */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[0.25, 0.08, 0.35]} />
        <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Top and bottom shells */}
      <mesh castShadow position={[0, 0.04, 0]}>
        <boxGeometry args={[0.23, 0.02, 0.33]} />
        <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh castShadow position={[0, -0.04, 0]}>
        <boxGeometry args={[0.23, 0.02, 0.33]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Advanced gimbal camera system */}
      <group position={[0, -0.08, 0.15]}>
        {/* Gimbal frame */}
        <mesh castShadow>
          <torusGeometry args={[0.06, 0.008, 16, 32]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Camera housing */}
        <mesh castShadow>
          <boxGeometry args={[0.06, 0.04, 0.08]} />
          <meshStandardMaterial color="#000000" metalness={1} roughness={0} />
        </mesh>
        
        {/* Camera lens */}
        <mesh castShadow position={[0, 0, 0.04]}>
          <cylinderGeometry args={[0.02, 0.02, 0.02, 32]} />
          <meshStandardMaterial 
            color="#1a1a1a" 
            metalness={1} 
            roughness={0}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Lens reflection */}
        <mesh castShadow position={[0, 0, 0.045]}>
          <cylinderGeometry args={[0.018, 0.018, 0.001, 32]} />
          <meshStandardMaterial 
            color="#3b82f6" 
            emissive="#3b82f6"
            emissiveIntensity={0.2}
            metalness={1} 
            roughness={0}
          />
        </mesh>
      </group>

      {/* Motor arms with improved aerodynamics */}
      {[
        { pos: [-0.18, 0, -0.18], index: 0, color: "#22c55e" },
        { pos: [0.18, 0, -0.18], index: 1, color: "#ef4444" },
        { pos: [-0.18, 0, 0.18], index: 2, color: "#ef4444" },
        { pos: [0.18, 0, 0.18], index: 3, color: "#22c55e" }
      ].map(({ pos, index, color }) => (
        <group key={index} position={pos}>
          {/* Streamlined arm */}
          <mesh castShadow rotation={[0, Math.PI/4, 0]}>
            <boxGeometry args={[0.15, 0.02, 0.03]} />
            <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.2} />
          </mesh>

          {/* Motor housing */}
          <mesh castShadow position={[0, 0.025, 0]}>
            <cylinderGeometry args={[0.025, 0.03, 0.04, 32]} />
            <meshStandardMaterial color="#1f2937" metalness={0.9} roughness={0.1} />
          </mesh>

          {/* Motor heat fins */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * Math.PI * 2) / 8;
            return (
              <mesh 
                key={i} 
                castShadow 
                position={[
                  Math.cos(angle) * 0.032,
                  0.025,
                  Math.sin(angle) * 0.032
                ]}
                rotation={[0, angle, 0]}
              >
                <boxGeometry args={[0.001, 0.04, 0.008]} />
                <meshStandardMaterial color="#374151" metalness={0.7} roughness={0.3} />
              </mesh>
            );
          })}

          {/* Enhanced propeller system */}
          <group 
            ref={(el) => { 
              if (el && !propellersRef.current.includes(el)) {
                propellersRef.current[index] = el;
              }
            }}
            position={[0, 0.045, 0]}
          >
            {/* Propeller hub */}
            <mesh castShadow>
              <cylinderGeometry args={[0.008, 0.008, 0.01, 16]} />
              <meshStandardMaterial color="#1f2937" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Propeller blades - more realistic shape */}
            {[0, Math.PI/2, Math.PI, 3*Math.PI/2].map((rotation, i) => (
              <group key={i} rotation={[0, rotation, 0]}>
                <mesh castShadow position={[0, 0, 0.08]}>
                  <boxGeometry args={[0.004, 0.002, 0.12]} />
                  <meshStandardMaterial 
                    color="#1f2937" 
                    metalness={0.6} 
                    roughness={0.3}
                    opacity={robotState?.isMoving ? 0.2 : 0.9}
                    transparent
                  />
                </mesh>
                
                {/* Blade tip */}
                <mesh castShadow position={[0, 0, 0.13]}>
                  <boxGeometry args={[0.008, 0.003, 0.02]} />
                  <meshStandardMaterial color="#fb923c" metalness={0.7} roughness={0.2} />
                </mesh>
              </group>
            ))}
          </group>

          {/* Navigation LED */}
          <pointLight
            color={color}
            intensity={robotState?.isMoving ? 3 : 1.5}
            distance={0.5}
            position={[0, 0.03, 0]}
          />

          {/* LED housing */}
          <mesh castShadow position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.005, 0.005, 0.002, 16]} />
            <meshStandardMaterial 
              color={color}
              emissive={color}
              emissiveIntensity={robotState?.isMoving ? 0.5 : 0.3}
            />
          </mesh>
        </group>
      ))}

      {/* Additional navigation lights */}
      <pointLight
        color="#ffffff"
        intensity={2}
        distance={0.6}
        position={[0, 0.05, -0.15]}
      />
      <pointLight
        color="#ff0000"
        intensity={1.5}
        distance={0.4}
        position={[0, 0.05, 0.15]}
      />

      {/* Status indicator panel */}
      <mesh castShadow position={[0, 0.03, -0.12]}>
        <boxGeometry args={[0.08, 0.01, 0.02]} />
        <meshStandardMaterial 
          color="#000000" 
          emissive="#3b82f6"
          emissiveIntensity={robotState?.isMoving ? 0.4 : 0.2}
        />
      </mesh>
    </>
  );

  const activeGLTF = robotConfig.type === 'explorer' || robotConfig.type === 'mobile'
    ? explorerGLTF
    : robotConfig.type === 'spider' 
    ? spiderGLTF 
    : robotConfig.type === 'tank'
    ? tankGLTF 
    : humanoidGLTF;

  const { scene, animations } = (isDrone || isArm) ? { scene: null, animations: [] } : activeGLTF;

  const processedScene = React.useMemo(() => {
    if (isDrone || isArm) return null;
    
    const clonedScene = scene.clone();
    
    // Special handling for explorer bot visibility and positioning
    if (isExplorer && clonedScene) {
      // Calculate bounding box to understand the model's actual dimensions
      const box = new THREE.Box3().setFromObject(clonedScene);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      
      console.log('🔍 Explorer bot bounding box:', {
        size: { x: size.x, y: size.y, z: size.z },
        center: { x: center.x, y: center.y, z: center.z },
        min: { x: box.min.x, y: box.min.y, z: box.min.z },
        max: { x: box.max.x, y: box.max.y, z: box.max.z }
      });

      // Traverse the scene and ensure all materials are visible
      clonedScene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // Make sure the mesh is visible
          child.visible = true;
          child.castShadow = true;
          child.receiveShadow = true;
          
          // Fix material properties for better visibility
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach(mat => {
                mat.transparent = false;
                mat.opacity = 1;
                if (mat instanceof THREE.MeshStandardMaterial) {
                  mat.metalness = 0.3;
                  mat.roughness = 0.7;
                }
              });
            } else {
              child.material.transparent = false;
              child.material.opacity = 1;
              if (child.material instanceof THREE.MeshStandardMaterial) {
                child.material.metalness = 0.3;
                child.material.roughness = 0.7;
              }
            }
          }
        }
      });
    }
    
    return (isSpider || isTank || isExplorer) ? clonedScene : scene;
  }, [scene, isSpider, isTank, isExplorer, isDrone, isArm]);

  const { actions, mixer } = useAnimations(animations, processedScene);

  useEffect(() => {
    if (isDrone) {
      console.log('🚁 Drone model loaded (procedural geometry)');
      // Initialize drone altitude
      droneAltitude.current = robotState?.position.y || 0.5;
      return;
    }

    if (isArm) {
      console.log('🦾 Robotic arm model loaded (procedural geometry)');
      console.log('Available joints: base, shoulder, elbow, wrist');
      console.log('Control with moveRobot({ direction: "forward/backward", joint: "base" })');
      console.log('Gripper: Use grabObject() and releaseObject() or forward/backward without joint');
      return;
    }

    console.log(`🤖 ${isSpider ? 'Spider' : isTank ? 'Tank' : isExplorer ? 'Explorer/Mobile' : 'Humanoid'} model loaded:`);
    console.log('Available animations:', animations?.map(anim => anim.name) || 'None');
    console.log('Available actions:', Object.keys(actions || {}));
    
    if (animations && animations.length > 0) {
      animations.forEach((clip, index) => {
        console.log(`Animation ${index}: "${clip.name}" - Duration: ${clip.duration}s`);
      });
    }

    // Debug explorer bot scene structure
    if (isExplorer && processedScene) {
      console.log('🔍 Explorer bot scene structure:');
      processedScene.traverse((child) => {
        console.log(`- ${child.name} (${child.type}), visible: ${child.visible}`);
        if (child instanceof THREE.Mesh) {
          console.log(`  Material: ${child.material?.type}, opacity: ${child.material?.opacity}`);
        }
      });
    }
  }, [animations, actions, isSpider, isTank, isExplorer, processedScene, isDrone, isArm]);

  const animToPlay = React.useMemo(() => {
    if (isDrone || isArm || !actions || Object.keys(actions).length === 0) {
      return null;
    }

    const allKeys = Object.keys(actions);

    if (isSpider) {
      const spiderAnimNames = ['walk', 'walking', 'Walk', 'Walking', 'walk_cycle', 'spider_walk', 'move', 'Move', 'locomotion', 'Locomotion'];
      for (const name of spiderAnimNames) {
        if (allKeys.includes(name)) {
          return name;
        }
      }
    }

    if (isTank) {
      const tankAnimNames = ['Scene', 'Take 001', 'Take001', 'Armature|Take 001', 'Armature|Take001', 'ArmatureAction', 'Action', 'drive', 'move', 'animation', 'default', 'Main'];
      for (const name of tankAnimNames) {
        if (allKeys.includes(name)) {
          return name;
        }
      }
    }

    if (isExplorer) {
      const explorerAnimNames = [
        'sphere body|sphere bodyAction',
        'sphere bodyAction',
        'sphere body',
        'sphere bodyAction.001',
        'rotate', 
        'rolling', 
        'ExplorerSpin', 
        'Move',
        'Action',
        'Scene'
      ];
      for (const name of explorerAnimNames) {
        if (allKeys.includes(name)) {
          console.log(`🎯 Found explorer animation: "${name}"`);
          return name;
        }
      }
    }

    if (allKeys.includes('mixamo.com')) return 'mixamo.com';
    if (allKeys.length > 0) return allKeys[0];
    return null;
  }, [actions, isSpider, isTank, isExplorer, isDrone, isArm]);

  useEffect(() => {
    if (!robotState) return;

    const currentPos = new THREE.Vector3(
      robotState.position.x,
      robotState.position.y,
      robotState.position.z
    );

    const distance = currentPos.distanceTo(lastPositionRef.current);
    movementThresholdRef.current = distance > 0.01 ? movementThresholdRef.current + 1 : 0;

    const positionBasedMoving = movementThresholdRef.current > 2;
    const shouldBeMoving = storeIsMoving || robotState.isMoving || positionBasedMoving;

    if (shouldBeMoving !== isMoving) {
      setIsMoving(shouldBeMoving);
      console.log(`🎭 Movement state changed: ${shouldBeMoving ? 'MOVING' : 'STOPPED'}`);
    }

    lastPositionRef.current.copy(currentPos);
  }, [robotState?.position, robotState?.isMoving, storeIsMoving, isMoving]);

  const stopAllActions = () => {
    if (!actions || !mixer) return;
    Object.values(actions).forEach((action) => {
      if (action?.isRunning()) {
        action.stop();
      }
    });
    setCurrentAction(null);
  };

  const switchAnimation = (name: string) => {
    if (!actions || !name || currentAction === name) return;
    const next = actions[name];
    if (!next) return;

    console.log(`🎬 Switching to animation: "${name}" for ${isExplorer ? 'Explorer/Mobile' : isSpider ? 'Spider' : isTank ? 'Tank' : 'Humanoid'}`);

    if (currentAction && actions[currentAction]?.isRunning()) {
      actions[currentAction].fadeOut(0.3);
    }

    next.reset().fadeIn(0.3).play();
    next.setLoop(THREE.LoopRepeat, Infinity);
    next.clampWhenFinished = false;
    
    // Adjusted speed multipliers for different robot types
    const speedMultiplier = isSpider ? 1.2 : isTank ? 0.6 : isExplorer ? 0.8 : 0.8;
    next.setEffectiveTimeScale(speedMultiplier);
    setCurrentAction(name);
  };

  useEffect(() => {
    if (isDrone || isArm || !actions || !animToPlay) return;

    if (isMoving) {
      if (currentAction !== animToPlay) {
        switchAnimation(animToPlay);
      }
    } else {
      if (currentAction && actions[currentAction]?.isRunning()) {
        stopAllActions();
      }
    }
  }, [isMoving, actions, animToPlay, currentAction, isDrone, isArm]);

  useEffect(() => {
    return () => {
      if (!isDrone && !isArm) {
        stopAllActions();
      }
    };
  }, [actions, isDrone, isArm]);

  useFrame((state, delta) => {
    if (!robotState || !modelRef.current) return;

    if (mixer && !isDrone && !isArm) {
      mixer.update(delta);
    }

    const targetPos = new THREE.Vector3(
      robotState.position.x,
      robotState.position.y,
      robotState.position.z
    );

    const currentPos = modelRef.current.position;
    const distance = currentPos.distanceTo(targetPos);
    
    // Apply the explorer float height offset to the target position
    if (isExplorer) {
      targetPos.y += explorerFloatHeight;
    }
    
    // Robotic arm specific animation
    if (isArm) {
      const current = armCurrentAnglesRef.current;
      const target = armTargetAnglesRef.current;
      const lerpSpeed = 5 * delta;

      // Handle grab/release for gripper
      if (robotState.isGrabbing && target.gripper > 0.015) {
        target.gripper = 0.015; // Close gripper when grabbing (tighter for larger gripper)
      } else if (!robotState.isGrabbing && target.gripper < 0.08) {
        target.gripper = 0.08; // Open gripper when not grabbing (wider opening)
      }

      // Interpolate each joint
      Object.keys(current).forEach(joint => {
        current[joint] = THREE.MathUtils.lerp(current[joint], target[joint], lerpSpeed);
      });

      // Apply rotations
      if (armBaseRef.current) {
        armBaseRef.current.rotation.y = current.base;
      }
      if (armShoulderRef.current) {
        armShoulderRef.current.rotation.x = current.shoulder;
      }
      if (armElbowRef.current) {
        armElbowRef.current.rotation.x = current.elbow;
      }
      if (armWristPitchRef.current) {
        armWristPitchRef.current.rotation.x = current.wristPitch;
      }
      if (armWristRollRef.current) {
        armWristRollRef.current.rotation.z = current.wristRoll;
      }
      if (armGripperLeftRef.current && armGripperRightRef.current) {
        armGripperLeftRef.current.position.x = -current.gripper;
        armGripperRightRef.current.position.x = current.gripper;
      }

      // Apply position (arms are typically stationary but can be mounted on mobile platforms)
      modelRef.current.position.copy(targetPos);
      
      // Apply base rotation from robotState (for mobile mounted arms)
      const targetRot = robotState.rotation.y;
      const currentRot = modelRef.current.rotation.y;
      const rotDiff = targetRot - currentRot;
      const normalizedDiff = ((rotDiff + Math.PI) % (Math.PI * 2)) - Math.PI;
      modelRef.current.rotation.y += normalizedDiff * 0.1;
      
      return; // Exit early for arm
    }
    
    // Drone-specific movement and animation
    if (isDrone) {
      // Enhanced drone physics with realistic flight dynamics
      const time = state.clock.elapsedTime;
      
      // Apply altitude changes
      if (moveCommands?.joint === 'altitude') {
        const altitudeChange = moveCommands.direction === 'up' 
          ? PHYSICS.droneLiftAcceleration 
          : -PHYSICS.droneLiftAcceleration;
        droneAltitude.current = THREE.MathUtils.clamp(
          droneAltitude.current + altitudeChange,
          PHYSICS.droneMinAltitude,
          PHYSICS.droneMaxAltitude
        );
      }
      
      // Smooth hovering motion with multiple oscillations for realism
      const hoverY = Math.sin(time * PHYSICS.droneHoverSpeed) * PHYSICS.droneHoverAmplitude;
      const microHover = Math.sin(time * 8) * 0.003;
      targetPos.y += (hoverY + microHover) * 0.5;
      
      // Advanced propeller physics with realistic counter-rotation
      propellersRef.current.forEach((propeller, index) => {
        if (propeller) {
          const baseSpeed = robotState.isMoving 
            ? PHYSICS.propellerSpeedActive 
            : PHYSICS.propellerSpeedIdle;
          
          // Counter-rotating pairs for stability
          const isClockwise = (index === 0 || index === 3);
          const direction = isClockwise ? 1 : -1;
          const rotationSpeed = baseSpeed + Math.sin(time * 2 + index) * 2;
          
          propeller.rotation.y += rotationSpeed * delta * direction;
          
          // Individual motor vibrations
          if (robotState.isMoving) {
            propeller.position.y = Math.sin(time * 25 + index * 1.5) * 0.001;
            propeller.rotation.x = Math.sin(time * 15 + index) * 0.005;
          } else {
            propeller.position.y = THREE.MathUtils.lerp(propeller.position.y, 0, delta * 5);
            propeller.rotation.x = THREE.MathUtils.lerp(propeller.rotation.x, 0, delta * 3);
          }
        }
      });
      
      // Realistic flight dynamics with banking and pitching
      if (robotState.isMoving) {
        const forwardTilt = -0.12;
        modelRef.current.rotation.x = THREE.MathUtils.lerp(
          modelRef.current.rotation.x,
          forwardTilt,
          delta * 3
        );
        
        const turnRate = angularVelocityRef.current;
        const bankAngle = THREE.MathUtils.clamp(turnRate * 4, -0.25, 0.25);
        modelRef.current.rotation.z = THREE.MathUtils.lerp(
          modelRef.current.rotation.z,
          bankAngle,
          delta * 4
        );
        
        const yawOscillation = Math.sin(time * 3) * 0.02;
        modelRef.current.rotation.y += yawOscillation * delta;
      } else {
        modelRef.current.rotation.x = THREE.MathUtils.lerp(
          modelRef.current.rotation.x,
          Math.sin(time * 1.5) * 0.01,
          delta * 5
        );
        modelRef.current.rotation.z = THREE.MathUtils.lerp(
          modelRef.current.rotation.z,
          Math.cos(time * 1.2) * 0.008,
          delta * 5
        );
      }
      
      // Apply target altitude smoothly
      modelRef.current.position.y = THREE.MathUtils.lerp(
        modelRef.current.position.y,
        droneAltitude.current,
        delta * 2
      );
      
      // Wind effect simulation
      if (Math.random() < 0.01) {
        const windStrength = 0.002;
        modelRef.current.position.x += (Math.random() - 0.5) * windStrength;
        modelRef.current.position.z += (Math.random() - 0.5) * windStrength;
        modelRef.current.rotation.z += (Math.random() - 0.5) * 0.01;
      }
    } else {
      // Original movement logic for GLTF models
      if (isMoving && distance > 0.01) {
        const moveSpeed = Math.min(distance * 8, 0.25);
        prevPositionRef.current.lerp(targetPos, moveSpeed * delta * 60);
      } else if (!isMoving) {
        const stopSpeed = 0.08;
        prevPositionRef.current.lerp(targetPos, stopSpeed);
      } else {
        prevPositionRef.current.copy(targetPos);
      }

      modelRef.current.position.copy(prevPositionRef.current);
    }

    // Rotation handling for all models except arm (handled above)
    if (!isDrone && !isArm) {
      const targetRot = robotState.rotation.y;
      const currentRot = modelRef.current.rotation.y;
      const rotDiff = targetRot - currentRot;
      const normalizedDiff = ((rotDiff + Math.PI) % (Math.PI * 2)) - Math.PI;
      const rotSpeed = isMoving ? 0.15 : 0.08;
      modelRef.current.rotation.y += normalizedDiff * rotSpeed;

      // Enhanced bobbing animation for different robot types
      if (isMoving && currentAction) {
        const bobFrequency = isSpider ? 8 : isTank ? 2 : isExplorer ? 6 : 4;
        const bobAmplitude = isSpider ? 0.005 : isTank ? 0.002 : isExplorer ? 0.003 : 0.01;
        const bobOffset = Math.sin(Date.now() * 0.01 * bobFrequency) * bobAmplitude;
        modelRef.current.position.y = prevPositionRef.current.y + bobOffset;
      }
    }
  });

  // Safe explorer scaling to prevent crashes
  const explorerScale = Math.min(2.5, 5);
  const explorerFloatHeight = isExplorer ? 0.5 : 0;

  // Render robotic arm procedurally
  if (isArm) {
    return (
      <group ref={modelRef}>
        <RoboticArmGeometry />
      </group>
    );
  }

  // Render drone procedurally
  if (isDrone) {
    return (
      <group ref={modelRef}>
        <DroneGeometry />
      </group>
    );
  }

  // Render GLTF models
  return (
    <primitive
      ref={modelRef}
      object={processedScene}
      position={isExplorer ? [0, explorerFloatHeight, 0] : [0, 0, 0]}
      rotation={[0, Math.PI, 0]}
      scale={
        isSpider
          ? [0.1, 0.1, 0.1]
          : isTank
          ? [0.3, 0.3, 0.3]
          : isExplorer
          ? [explorerScale, explorerScale, explorerScale]
          : [1, 1, 1]
      }
      castShadow
      receiveShadow
    />
  );
};

useGLTF.preload('/models/humanoid-robot/rusty_robot_walking_animated.glb');
useGLTF.preload('/models/spider-model/source/spider_bot.glb');
useGLTF.preload('/models/tank-model/t-35_heavy_five-turret_tank.glb');
useGLTF.preload('/models/explorer-bot/360_sphere_robot_no_glass.glb');

export default RobotModel;