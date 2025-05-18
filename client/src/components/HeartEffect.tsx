import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

interface HeartProps {
  x: number;
  y: number;
}

const hearts = ['❤️', '💕', '💖', '💗', '💓'];

const Heart: React.FC<HeartProps> = ({ x, y }) => {
  const [position] = useState({
    x: x + (Math.random() * 60 - 30),
    y: y + (Math.random() * 20 - 10)
  });
  
  return (
    <motion.div
      className="fixed text-2xl pointer-events-none"
      style={{ left: position.x, top: position.y }}
      initial={{ opacity: 0, scale: 0.5, y: 0 }}
      animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1, 1.2, 1.2], y: -100 }}
      transition={{ duration: 3, ease: "easeOut" }}
      exit={{ opacity: 0 }}
    >
      {hearts[Math.floor(Math.random() * hearts.length)]}
    </motion.div>
  );
};

interface HeartEffectProps {
  isActive: boolean;
  x: number;
  y: number;
}

const HeartEffect: React.FC<HeartEffectProps> = ({ isActive, x, y }) => {
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  
  useEffect(() => {
    if (isActive) {
      // Create 5 hearts with random positions
      const newHearts = Array.from({ length: 5 }, (_, i) => ({
        id: Date.now() + i, // Use timestamp + index for unique ID
        x,
        y
      }));
      
      setHearts(newHearts);
      
      // Remove hearts after animation completes
      const timer = setTimeout(() => {
        setHearts([]);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isActive, x, y]);
  
  return (
    <AnimatePresence>
      {hearts.map(heart => (
        <Heart key={heart.id} x={heart.x} y={heart.y} />
      ))}
    </AnimatePresence>
  );
};

export default HeartEffect;
