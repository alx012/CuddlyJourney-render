import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import MooMoo from "@/components/MooMoo";
import Woofles from "@/components/Woofles";
import HeartEffect from "@/components/HeartEffect";
import StickyNote from "@/components/StickyNote";
import FountainDialog from "@/components/FountainDialog";
import { locations, fountainDialogs } from "@/lib/locations";

const AdventurePage: React.FC = () => {
  const [, setLocation] = useLocation();
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
  const [characterMode, setCharacterMode] = useState<"walking" | "center">("walking");
  const [characterDirection, setCharacterDirection] = useState<"left-to-center" | "center-to-right">("left-to-center");
  const [isSticky, setIsSticky] = useState(false);
  const [heartEffect, setHeartEffect] = useState<{ active: boolean, x: number, y: number }>({ 
    active: false, 
    x: 0, 
    y: 0 
  });
  
  // Fountain dialog state
  const [showDialog, setShowDialog] = useState(false);
  const [dialogIndex, setDialogIndex] = useState(0);
  
  const currentLocation = locations[currentLocationIndex];
  const isFountain = currentLocation.type === 'fountain';
  const isFirstLocation = currentLocationIndex === 0;
  const isLastLocation = currentLocationIndex === locations.length - 1;
  
  // Start walking animation when page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setCharacterMode("center");
    }, 5000); // Match animation duration
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle character click (hearts or fountain dialog)
  const handleCharacterClick = (e: React.MouseEvent): void => {
    // Create heart effect
    setHeartEffect({ 
      active: true, 
      x: e.clientX, 
      y: e.clientY 
    });
    
    // Show fountain dialog if at final location
    if (isFountain) {
      setShowDialog(true);
      setDialogIndex(prev => (prev + 1) % fountainDialogs.length);
      
      setTimeout(() => {
        setShowDialog(false);
      }, 4000);
    }
    
    // Reset heart effect
    setTimeout(() => {
      setHeartEffect(prev => ({ ...prev, active: false }));
    }, 3000);
  };
  
  // Handle navigation
  const goToPrevLocation = () => {
    if (!isFirstLocation) {
      // First move characters off-screen right-to-left (reversed)
      setCharacterDirection("center-to-right");
      setCharacterMode("walking");
      
      // Then change location after animation
      setTimeout(() => {
        setCurrentLocationIndex(prev => prev - 1);
        setCharacterDirection("left-to-center");
        
        // Reset character to walking from left after location change
        setTimeout(() => {
          setCharacterMode("center");
        }, 5000); // Match animation duration
      }, 1000);
    }
  };
  
  const goToNextLocation = () => {
    if (!isLastLocation) {
      // First move characters off-screen left-to-right
      setCharacterDirection("center-to-right");
      setCharacterMode("walking");
      
      // Then change location after animation
      setTimeout(() => {
        setCurrentLocationIndex(prev => prev + 1);
        setCharacterDirection("left-to-center");
        
        // Reset character to walking from left after location change
        setTimeout(() => {
          setCharacterMode("center");
        }, 5000); // Match animation duration
      }, 1000);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center transition-all duration-1000 bg-[#F9EAE1] bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27100%27 height=%27100%27 viewBox=%270 0 100 100%27%3E%3Cg fill-rule=%27evenodd%27%3E%3Cg fill=%27%23d4d4d4%27 fill-opacity=%270.1%27%3E%3Cpath opacity=%27.5%27 d=%27M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]">
      {/* A hand-drawn landscape that changes based on location */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentLocationIndex}
          className="w-full h-screen bg-cover bg-center relative"
          style={{ 
            backgroundImage: `url('${currentLocation.background}')`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-[#A5C8E1] bg-opacity-20"></div>
          
          {/* Walking characters */}
          <div className="absolute bottom-24 left-0">
            <MooMoo 
              mode={characterMode} 
              onClick={handleCharacterClick}
              direction={characterDirection}
            />
          </div>
          
          <div className="absolute bottom-24 left-8">
            <Woofles 
              mode={characterMode} 
              onClick={handleCharacterClick}
              direction={characterDirection}
            />
          </div>
          
          {/* Heart effects */}
          <HeartEffect 
            isActive={heartEffect.active} 
            x={heartEffect.x} 
            y={heartEffect.y}
          />
          
          {/* Location Title */}
          <div className="absolute top-8 left-0 w-full text-center">
            <motion.h2 
              className="font-indie text-4xl text-[#8B6E4E] bg-white bg-opacity-70 inline-block px-6 py-2 rounded-full"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {currentLocation.name}
            </motion.h2>
          </div>
          
          {/* Location icon (clickable) */}
          <motion.div 
            className="absolute top-32 left-1/2 transform -translate-x-1/2 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSticky(true)}
          >
            <div className={`w-16 h-16 ${isFountain ? 'bg-[#E0BBE4]' : currentLocation.type === 'restaurant' ? 'bg-[#F9D5BB]' : 'bg-[#D4E4BC]'} rounded-full flex items-center justify-center border-2 border-[#8B6E4E]`}>
              <span className="text-2xl">{currentLocation.icon}</span>
            </div>
          </motion.div>
          
          {/* Navigation Controls */}
          <div className="absolute bottom-8 left-0 w-full flex justify-between px-6">
            <Button
              onClick={goToPrevLocation}
              disabled={isFirstLocation}
              className={`bg-[#F9D5BB] hover:bg-orange-200 text-[#8B6E4E] font-indie text-xl px-5 py-3 rounded-xl border-2 border-[#8B6E4E] shadow-[3px_3px_0_#8B6E4E] hover:shadow-[5px_5px_0_#8B6E4E] hover:-translate-y-1 active:translate-y-0 active:shadow-[1px_1px_0_#8B6E4E] transition-all ${isFirstLocation ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              ◀ Previous
            </Button>
            
            <Button
              onClick={() => setLocation("/")}
              className="bg-[#E0BBE4] hover:bg-purple-200 text-[#8B6E4E] font-indie text-xl px-5 py-3 rounded-xl border-2 border-[#8B6E4E] shadow-[3px_3px_0_#8B6E4E] hover:shadow-[5px_5px_0_#8B6E4E] hover:-translate-y-1 active:translate-y-0 active:shadow-[1px_1px_0_#8B6E4E] transition-all"
            >
              🏠 Home
            </Button>
            
            <Button
              onClick={goToNextLocation}
              disabled={isLastLocation}
              className={`bg-[#F9D5BB] hover:bg-orange-200 text-[#8B6E4E] font-indie text-xl px-5 py-3 rounded-xl border-2 border-[#8B6E4E] shadow-[3px_3px_0_#8B6E4E] hover:shadow-[5px_5px_0_#8B6E4E] hover:-translate-y-1 active:translate-y-0 active:shadow-[1px_1px_0_#8B6E4E] transition-all ${isLastLocation ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Next ▶
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Sticky Note Component */}
      <StickyNote 
        isOpen={isSticky}
        onClose={() => setIsSticky(false)}
        locationId={currentLocation.id}
        locationName={currentLocation.name}
      />
      
      {/* Fountain Dialog */}
      <FountainDialog 
        isVisible={showDialog} 
        text={fountainDialogs[dialogIndex]} 
      />
    </div>
  );
};

export default AdventurePage;
