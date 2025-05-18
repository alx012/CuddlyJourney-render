import React, { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import MooMoo from "@/components/MooMoo";
import Woofles from "@/components/Woofles";
import HeartEffect from "@/components/HeartEffect";

const HomePage: React.FC = () => {
  const [, setLocation] = useLocation();
  const [mooMooSpeech, setMooMooSpeech] = useState(false);
  const [wooflesSpeech, setWooflesSpeech] = useState(false);
  const [heartEffect, setHeartEffect] = useState<{ active: boolean, x: number, y: number }>({ 
    active: false, 
    x: 0, 
    y: 0 
  });
  
  const handleMooMooClick = (e: React.MouseEvent) => {
    setMooMooSpeech(true);
    setHeartEffect({ 
      active: true, 
      x: e.clientX, 
      y: e.clientY 
    });
    
    setTimeout(() => {
      setMooMooSpeech(false);
      setHeartEffect(prev => ({ ...prev, active: false }));
    }, 3000);
  };
  
  const handleWooflesClick = (e: React.MouseEvent) => {
    setWooflesSpeech(true);
    setHeartEffect({ 
      active: true, 
      x: e.clientX, 
      y: e.clientY 
    });
    
    setTimeout(() => {
      setWooflesSpeech(false);
      setHeartEffect(prev => ({ ...prev, active: false }));
    }, 3000);
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center transition-all duration-1000 bg-[#F9EAE1]">
      {/* A cozy living room illustration with soft colors and warm lighting */}
      <div 
        className="w-full h-screen bg-cover bg-center relative"
        style={{ 
          backgroundImage: "url('./images/home-background.jpg')", 
          backgroundPosition: "center" 
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        
        <div className="absolute top-6 left-0 w-full text-center">
          <h1 className="font-indie text-5xl md:text-6xl text-white drop-shadow-lg">牛牛 & 狗狗</h1>
          <p className="font-comic text-lg md:text-xl text-white drop-shadow-md mt-2">A Magical Adventure</p>
        </div>
        
        {/* Characters */}
        <div className="absolute bottom-40 left-1/4 transform -translate-x-1/2">
          <MooMoo 
            mode="home" 
            onClick={handleMooMooClick}
            showSpeech={mooMooSpeech}
          />
        </div>
        
        <div className="absolute bottom-40 right-1/4 transform translate-x-1/2">
          <Woofles 
            mode="home" 
            onClick={handleWooflesClick}
            showSpeech={wooflesSpeech}
          />
        </div>
        
        <HeartEffect 
          isActive={heartEffect.active} 
          x={heartEffect.x} 
          y={heartEffect.y}
        />
        
        {/* Enter Map Button */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <motion.button
            onClick={() => setLocation("/adventure")}
            className="bg-[#D4E4BC] hover:bg-green-200 text-[#8B6E4E] font-indie text-2xl px-8 py-4 rounded-xl border-2 border-[#8B6E4E] shadow-[3px_3px_0_#8B6E4E] hover:shadow-[5px_5px_0_#8B6E4E] hover:-translate-y-1 active:translate-y-0 active:shadow-[1px_1px_0_#8B6E4E] transition-all"
            whileHover={{ y: -3 }}
            whileTap={{ y: 0 }}
          >
            Start Adventure
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
