import { motion } from "framer-motion";
import React from "react";

interface CloudProps {
  top: string;
  delay?: number;
  duration?: number;
  size?: "small" | "medium" | "large";
}

const Cloud: React.FC<CloudProps> = ({ 
  top, 
  delay = 0, 
  duration = 50,
  size = "medium"
}) => {
  const cloudSizes = {
    small: {
      width: 150,
      height: 45
    },
    medium: {
      width: 200,
      height: 60
    },
    large: {
      width: 250,
      height: 75
    }
  };
  
  const { width, height } = cloudSizes[size];
  
  return (
    <motion.div
      className="absolute"
      style={{ top }}
      initial={{ x: "-100%" }}
      animate={{ x: "100vw" }}
      transition={{ 
        duration, 
        delay, 
        ease: "linear", 
        repeat: Infinity,
        repeatType: "loop"
      }}
    >
      <svg width={width} height={height} viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx={width * 0.23} cy={height * 0.5} rx={width * 0.23} ry={height * 0.5} fill="white" fillOpacity="0.8"/>
        <ellipse cx={width * 0.8} cy={height * 0.5} rx={width * 0.2} ry={height * 0.42} fill="white" fillOpacity="0.8"/>
        <ellipse cx={width * 0.52} cy={height * 0.33} rx={width * 0.3} ry={height * 0.33} fill="white" fillOpacity="0.8"/>
      </svg>
    </motion.div>
  );
};

export default Cloud;
