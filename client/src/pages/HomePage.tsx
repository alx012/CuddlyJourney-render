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
    <div className="min-h-screen flex flex-col items-center transition-all duration-1000 bg-[#F9EAE1] bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27100%27 height=%27100%27 viewBox=%270 0 100 100%27%3E%3Cg fill-rule=%27evenodd%27%3E%3Cg fill=%27%23d4d4d4%27 fill-opacity=%270.1%27%3E%3Cpath opacity=%27.5%27 d=%27M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]">
      {/* A cozy living room illustration with soft colors and warm lighting */}
      <div 
        className="w-full h-screen bg-cover bg-center relative"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1617103996702-96ff29b1c467?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=1080')", 
          backgroundPosition: "center" 
        }}
      >
        <div className="absolute inset-0 bg-[#F9EAE1] bg-opacity-30"></div>
        
        <div className="absolute top-6 left-0 w-full text-center">
          <h1 className="font-indie text-5xl md:text-6xl text-[#8B6E4E]">Moo-Moo & Woofles</h1>
          <p className="font-comic text-lg md:text-xl text-[#8B6E4E] mt-2">A Magical Adventure</p>
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
