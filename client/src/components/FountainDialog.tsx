import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FountainDialogProps {
  isVisible: boolean;
  text: string;
}

const FountainDialog: React.FC<FountainDialogProps> = ({ isVisible, text }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed inset-0 z-40 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="absolute bottom-48 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 p-4 rounded-xl border-2 border-[#8B6E4E] max-w-md font-comic text-[#8B6E4E]"
            initial={{ y: 20, scale: 0.8, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 20, scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <p className="text-center">{text}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FountainDialog;
