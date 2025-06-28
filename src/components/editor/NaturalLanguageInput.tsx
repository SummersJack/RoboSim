import React, { useState, useRef } from 'react';
import { Send, Mic, MicOff, Lightbulb, Zap, Square } from 'lucide-react';
import { useRobotStore } from '@/store/robotStore';
import { motion } from 'framer-motion';

interface NaturalLanguageInputProps {
  onCommandExecute?: (command: string) => void;
}

const NaturalLanguageInput: React.FC<NaturalLanguageInputProps> = ({ onCommandExecute }) => {
  const { selectedRobot, moveRobot, rotateRobot, stopRobot, grabObject, releaseObject, readSensor } = useRobotStore();
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [output, setOutput] = useState<Array<{type: 'user' | 'system' | 'error' | 'success', message: string}>>([
    { type: 'system', message: 'Welcome to Natural Language Robot Control! Try commands like "move forward 5 meters" or "turn right 90 degrees".' },
  ]);
  
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isExecutingRef = useRef(false);

  // Example commands for user guidance
  const exampleCommands = [
    "Move forward 3 meters",
    "Turn right 90 degrees", 
    "Move backward 2 meters",
    "Turn left 45 degrees",
    "Stop the robot",
    "Read the distance sensor",
    "Grab the object",
    "Release the object"
  ];

  const addOutput = (type: 'user' | 'system' | 'error' | 'success', message: string) => {
    setOutput(prev => [...prev, { type, message }]);
  };

  // Parse natural language commands into robot actions
  const parseCommand = (command: string): { action: string; params: any } | null => {
    const cmd = command.toLowerCase().trim();
    
    // Movement commands
    if (cmd.includes('move') || cmd.includes('go')) {
      const direction = cmd.includes('forward') ? 'forward' :
                       cmd.includes('backward') || cmd.includes('back') ? 'backward' :
                       cmd.includes('left') ? 'left' :
                       cmd.includes('right') ? 'right' : 'forward';
      
      // Extract distance/duration
      const distanceMatch = cmd.match(/(\d+(?:\.\d+)?)\s*(meter|metre|m|unit|step)/);
      const timeMatch = cmd.match(/(\d+(?:\.\d+)?)\s*(second|sec|s)/);
      
      let duration = 2000; // default 2 seconds
      if (distanceMatch) {
        const distance = parseFloat(distanceMatch[1]);
        duration = Math.max(1000, distance * 800); // rough estimation
      } else if (timeMatch) {
        duration = parseFloat(timeMatch[1]) * 1000;
      }
      
      return { action: 'move', params: { direction, duration, speed: 0.5 } };
    }
    
    // Rotation commands
    if (cmd.includes('turn') || cmd.includes('rotate')) {
      const direction = cmd.includes('left') ? 'left' : 'right';
      const angleMatch = cmd.match(/(\d+(?:\.\d+)?)\s*(degree|deg|°)/);
      const angle = angleMatch ? parseFloat(angleMatch[1]) : 90;
      
      return { action: 'rotate', params: { direction, angle, speed: 0.5 } };
    }
    
    // Stop command
    if (cmd.includes('stop') || cmd.includes('halt')) {
      return { action: 'stop', params: {} };
    }
    
    // Sensor commands
    if (cmd.includes('sensor') || cmd.includes('distance') || cmd.includes('read')) {
      const sensorType = cmd.includes('camera') ? 'camera' :
                        cmd.includes('lidar') ? 'lidar' : 'ultrasonic';
      return { action: 'sensor', params: { type: sensorType } };
    }
    
    // Grab/Release commands
    if (cmd.includes('grab') || cmd.includes('pick') || cmd.includes('take')) {
      return { action: 'grab', params: {} };
    }
    
    if (cmd.includes('release') || cmd.includes('drop') || cmd.includes('let go')) {
      return { action: 'release', params: {} };
    }
    
    return null;
  };

  const executeCommand = async (command: string) => {
    if (!selectedRobot) {
      addOutput('error', 'No robot selected. Please select a robot first.');
      return;
    }

    if (isExecutingRef.current) {
      addOutput('error', 'Another command is already executing. Please wait.');
      return;
    }

    isExecutingRef.current = true;
    setIsExecuting(true);
    
    addOutput('user', command);
    
    try {
      const parsedCommand = parseCommand(command);
      
      if (!parsedCommand) {
        addOutput('error', 'Sorry, I didn\'t understand that command. Try something like "move forward 3 meters" or "turn right 90 degrees".');
        return;
      }
      
      addOutput('system', `Executing: ${parsedCommand.action} with parameters ${JSON.stringify(parsedCommand.params)}`);
      
      switch (parsedCommand.action) {
        case 'move':
          const { direction, duration, speed } = parsedCommand.params;
          addOutput('system', `Moving ${direction} for ${duration}ms at ${speed * 100}% speed...`);
          
          moveRobot({ direction, speed });
          await new Promise(resolve => setTimeout(resolve, duration));
          stopRobot();
          
          addOutput('success', `✓ Movement completed: ${direction} for ${duration}ms`);
          break;
          
        case 'rotate':
          const { direction: rotDir, angle, speed: rotSpeed } = parsedCommand.params;
          const rotDuration = Math.max(500, angle * 10);
          addOutput('system', `Rotating ${rotDir} ${angle}° at ${rotSpeed * 100}% speed...`);
          
          rotateRobot({ direction: rotDir, speed: rotSpeed });
          await new Promise(resolve => setTimeout(resolve, rotDuration));
          stopRobot();
          
          addOutput('success', `✓ Rotation completed: ${rotDir} ${angle}°`);
          break;
          
        case 'stop':
          addOutput('system', 'Stopping robot...');
          stopRobot();
          addOutput('success', '✓ Robot stopped');
          break;
          
        case 'sensor':
          const { type } = parsedCommand.params;
          addOutput('system', `Reading ${type} sensor...`);
          const reading = await readSensor(type);
          addOutput('success', `✓ Sensor reading: ${reading.toFixed(2)} ${type === 'ultrasonic' ? 'meters' : 'units'}`);
          break;
          
        case 'grab':
          addOutput('system', 'Grabbing object...');
          grabObject();
          await new Promise(resolve => setTimeout(resolve, 1000));
          addOutput('success', '✓ Object grabbed');
          break;
          
        case 'release':
          addOutput('system', 'Releasing object...');
          releaseObject();
          await new Promise(resolve => setTimeout(resolve, 1000));
          addOutput('success', '✓ Object released');
          break;
          
        default:
          addOutput('error', 'Unknown command action');
      }
      
      if (onCommandExecute) {
        onCommandExecute(command);
      }
      
    } catch (error) {
      addOutput('error', `Execution error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      console.error('Natural language command error:', error);
    } finally {
      isExecutingRef.current = false;
      setIsExecuting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isExecuting) {
      executeCommand(input.trim());
      setInput('');
    }
  };

  const handleExampleClick = (example: string) => {
    if (!isExecuting) {
      setInput(example);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Mock speech recognition toggle
  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      addOutput('system', 'Speech recognition started... (Note: This is a demo - speech recognition not fully implemented)');
      // In a real implementation, you would start speech recognition here
      setTimeout(() => {
        setIsListening(false);
        addOutput('system', 'Speech recognition stopped');
      }, 3000);
    }
  };

  return (
    <div className="bg-dark-800 rounded-lg border border-dark-600 h-full flex flex-col">
      <div className="border-b border-dark-600 p-3 flex justify-between items-center">
        <div className="flex items-center">
          <h3 className="text-lg font-semibold text-white">Natural Language Control</h3>
          <div className="ml-3 px-2 py-1 rounded-md bg-dark-700 text-dark-300 text-xs">
            AI Powered
          </div>
          {isExecuting && (
            <div className="ml-3 flex items-center text-sm text-primary-400">
              <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse mr-2"></div>
              Executing
            </div>
          )}
        </div>
        <div className="flex space-x-2">
          <button 
            className={`btn text-sm py-1 px-3 flex items-center ${
              isListening 
                ? 'bg-error-500 hover:bg-error-600' 
                : 'bg-secondary-500 hover:bg-secondary-600'
            } text-white`}
            onClick={toggleListening}
            disabled={isExecuting}
          >
            {isListening ? (
              <>
                <MicOff size={14} className="mr-1" />
                <span>Stop</span>
              </>
            ) : (
              <>
                <Mic size={14} className="mr-1" />
                <span>Voice</span>
              </>
            )}
          </button>
          {isExecuting && (
            <button 
              className="btn bg-error-500 hover:bg-error-600 text-white text-sm py-1 px-3 flex items-center"
              onClick={() => {
                stopRobot();
                isExecutingRef.current = false;
                setIsExecuting(false);
                addOutput('system', 'Command execution stopped by user');
              }}
            >
              <Square size={14} className="mr-1" />
              <span>Stop</span>
            </button>
          )}
        </div>
      </div>
      
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Chat/Output Area */}
        <div className="flex-1 flex flex-col border-b md:border-b-0 md:border-r border-dark-600">
          <div className="flex-1 overflow-auto p-4 space-y-3">
            {output.map((line, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-3 rounded-lg max-w-[80%] ${
                  line.type === 'user' 
                    ? 'bg-primary-600 text-white ml-auto' 
                    : line.type === 'error'
                      ? 'bg-error-900/50 text-error-300 border border-error-700'
                      : line.type === 'success'
                        ? 'bg-success-900/50 text-success-300 border border-success-700'
                        : 'bg-dark-700 text-dark-200 border border-dark-600'
                }`}
              >
                <div className="text-sm leading-relaxed">
                  {line.message}
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Input Area */}
          <div className="border-t border-dark-600 p-4">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-dark-400 resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Tell the robot what to do... (e.g., 'move forward 3 meters')"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={2}
                  disabled={isExecuting}
                />
                {isListening && (
                  <div className="absolute top-2 right-2">
                    <div className="w-3 h-3 bg-error-400 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
              <button 
                type="submit"
                className="btn-primary px-4 py-3 flex items-center"
                disabled={!input.trim() || isExecuting}
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
        
        {/* Examples and Help Panel */}
        <div className="w-full md:w-2/5 flex flex-col">
          <div className="p-3 border-b border-dark-600 bg-dark-700 flex items-center">
            <Lightbulb size={16} className="mr-2 text-warning-400" />
            <h4 className="text-sm font-medium text-white">Example Commands</h4>
          </div>
          
          <div className="flex-1 overflow-auto p-4">
            <div className="space-y-2 mb-6">
              {exampleCommands.map((example, index) => (
                <motion.button
                  key={index}
                  className="w-full text-left p-3 bg-dark-700 hover:bg-dark-600 rounded-lg border border-dark-600 hover:border-dark-500 transition-all text-sm text-dark-200 hover:text-white"
                  onClick={() => handleExampleClick(example)}
                  disabled={isExecuting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center">
                    <Zap size={14} className="mr-2 text-primary-400" />
                    <span>"{example}"</span>
                  </div>
                </motion.button>
              ))}
            </div>
            
            <div className="bg-dark-700 rounded-lg p-4 border border-dark-600">
              <h5 className="text-white font-medium mb-3 flex items-center">
                <Lightbulb size={14} className="mr-2 text-warning-400" />
                Tips
              </h5>
              <ul className="text-sm text-dark-300 space-y-2">
                <li>• Use natural language like "move forward 5 meters"</li>
                <li>• Specify distances in meters or time in seconds</li>
                <li>• Try "turn left 90 degrees" for rotations</li>
                <li>• Use "read sensor" to get sensor data</li>
                <li>• Say "stop" to halt the robot immediately</li>
                <li>• Commands are processed sequentially</li>
              </ul>
            </div>
            
            {selectedRobot && (
              <div className="mt-4 bg-primary-900/20 rounded-lg p-4 border border-primary-700">
                <h5 className="text-primary-400 font-medium mb-2">Current Robot</h5>
                <p className="text-sm text-white">{selectedRobot.name}</p>
                <p className="text-xs text-dark-300">{selectedRobot.description}</p>
              </div>
            )}
            
            {!selectedRobot && (
              <div className="mt-4 bg-warning-900/20 rounded-lg p-4 border border-warning-700">
                <h5 className="text-warning-400 font-medium mb-2">No Robot Selected</h5>
                <p className="text-sm text-dark-300">Please select a robot from the control panel to start giving commands.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NaturalLanguageInput;