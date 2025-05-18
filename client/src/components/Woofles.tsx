import { motion } from "framer-motion";
import React from "react";

interface WooflesProps {
  mode: "home" | "walking" | "center";
  onClick?: (e: React.MouseEvent) => void;
  showSpeech?: boolean;
  speechText?: string;
  direction?: "left-to-center" | "center-to-right";
}

const Woofles: React.FC<WooflesProps> = ({ 
  mode, 
  onClick, 
  showSpeech = false,
  speechText = "Woof! I'm ready!",
  direction = "left-to-center"
}) => {
  if (mode === "home") {
    return (
      <div
        onClick={onClick}
        className="character cursor-pointer transition-transform hover:animate-bounce-slow"
      >
        <motion.div 
          className="relative w-40 h-40 flex items-center justify-center"
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <img 
            src="./images/woofles.jpg" 
            alt="Woofles" 
            style={{ 
              width: '200px', 
              height: '200px',
              objectFit: 'contain',
              maxWidth: 'none',
              filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.2))' 
            }}
          />
          {showSpeech && (
            <motion.div 
              className="bg-white rounded-xl p-3 shadow-lg absolute -top-16 w-32 text-center font-indie z-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{ position: "relative" }}
            >
              {speechText}
              <div 
                className="absolute w-4 h-4 bg-white transform rotate-45"
                style={{
                  bottom: "-8px",
                  left: "calc(50% - 8px)"
                }}
              />
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  }
  
  if (mode === "walking" || mode === "center") {
    // Get position values for animation
    let initialX: string | number;
    let targetX: string | number;
    
    if (mode === "walking") {
      if (direction === "left-to-center") {
        initialX = "-100%";
        targetX = "calc(50vw - 20px)";
      } else {
        initialX = "calc(50vw - 20px)";
        targetX = "100%";
      }
    } else {
      initialX = "calc(50vw - 20px)";
      targetX = "calc(50vw - 20px)";
    }
    
    return (
      <motion.div
        onClick={onClick}
        className="w-32 h-32 cursor-pointer"
        style={{ position: "absolute" }}
        initial={{ x: initialX }}
        animate={{ x: targetX }}
        transition={{ duration: 5, ease: "easeInOut" }}
        whileTap={{ scale: 0.95 }}
      >
        <img 
          src="./images/woofles.jpg" 
          alt="Woofles" 
          style={{ 
            width: '150px', 
            height: '150px',
            objectFit: 'contain',
            maxWidth: 'none',
            filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.2))' 
          }}
        />
      </motion.div>
    );
  }
  
  return null;
};

export default Woofles;
