import { motion } from "framer-motion";
import React from "react";

interface MooMooProps {
  mode: "home" | "walking" | "center";
  onClick?: (e: React.MouseEvent) => void;
  showSpeech?: boolean;
  speechText?: string;
  direction?: "left-to-center" | "center-to-right";
}

const MooMoo: React.FC<MooMooProps> = ({ 
  mode, 
  onClick, 
  showSpeech = false,
  speechText = "Moo! Let's explore!",
  direction = "left-to-center"
}) => {
  if (mode === "home") {
    return (
      <div
        onClick={onClick}
        className="character cursor-pointer transition-transform hover:animate-bounce-slow"
      >
        <motion.div 
          className="relative w-40 h-40 bg-white rounded-full flex items-center justify-center"
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="absolute w-36 h-36 rounded-full bg-white border-4 border-brown flex items-center justify-center overflow-hidden">
            <div className="bg-[#8B6E4E] w-12 h-12 rounded-full absolute top-4"></div>
            <div className="bg-[#8B6E4E] w-12 h-12 rounded-full absolute top-4 right-4"></div>
            <div className="bg-black w-3 h-3 rounded-full absolute top-16 left-10"></div>
            <div className="bg-black w-3 h-3 rounded-full absolute top-16 right-10"></div>
            <div className="bg-pink-300 w-10 h-6 rounded-full absolute top-24"></div>
          </div>
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
        targetX = "calc(50vw - 60px)";
      } else {
        initialX = "calc(50vw - 60px)";
        targetX = "100%";
      }
    } else {
      initialX = "calc(50vw - 60px)";
      targetX = "calc(50vw - 60px)";
    }
    
    return (
      <motion.div
        onClick={onClick}
        className="w-24 h-24 cursor-pointer"
        style={{ position: "absolute" }}
        initial={{ x: initialX }}
        animate={{ x: targetX }}
        transition={{ duration: 5, ease: "easeInOut" }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center border-2 border-[#8B6E4E]">
          <div className="bg-[#8B6E4E] w-8 h-8 rounded-full absolute top-2 left-2"></div>
          <div className="bg-[#8B6E4E] w-8 h-8 rounded-full absolute top-2 right-2"></div>
          <div className="bg-black w-2 h-2 rounded-full absolute top-12 left-8"></div>
          <div className="bg-black w-2 h-2 rounded-full absolute top-12 right-8"></div>
          <div className="bg-pink-300 w-6 h-4 rounded-full absolute top-16"></div>
        </div>
      </motion.div>
    );
  }
  
  return null;
};

export default MooMoo;
