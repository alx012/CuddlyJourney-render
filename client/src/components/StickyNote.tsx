import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMemory, useCreateOrUpdateMemory, useAddMessage } from "@/hooks/useMemories";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StickyNoteProps {
  isOpen: boolean;
  onClose: () => void;
  locationId: number;
  locationName: string;
}

const StickyNote: React.FC<StickyNoteProps> = ({ 
  isOpen, 
  onClose, 
  locationId, 
  locationName 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newMessage, setNewMessage] = useState("");
  const { toast } = useToast();
  
  // Fetch memory data for this location
  const { data, isLoading } = useMemory(locationId);
  
  // Memory text state
  const [memoryText, setMemoryText] = useState("");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  
  // Mutations
  const createMemory = useCreateOrUpdateMemory();
  const addMessage = useAddMessage();
  
  // Update local state when data is loaded
  useEffect(() => {
    if (data && data.memory) {
      setMemoryText(data.memory.text || "");
      setPhotoUrl(data.memory.photoUrl || null);
    }
  }, [data]);
  
  // Handle photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setPhotoUrl(event.target.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  // Handle form submission
  const handleSave = async () => {
    try {
      await createMemory.mutateAsync({
        locationId,
        text: memoryText,
        photoUrl: photoUrl || undefined
      });
      
      toast({
        title: "Memory saved!",
        description: "Your memory has been saved successfully.",
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Error saving memory",
        description: "There was an error saving your memory.",
        variant: "destructive",
      });
    }
  };
  
  // Send a new message
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !data?.memory) return;
    
    try {
      await addMessage.mutateAsync({
        memoryId: data.memory.id,
        author: "You",
        content: newMessage
      });
      
      setNewMessage("");
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "There was an error sending your message.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="sticky-note bg-yellow-100 w-full max-w-md p-8 rounded-lg relative shadow-xl transform rotate-[-2deg]"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30 
            }}
          >
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="absolute top-2 right-3 text-2xl font-bold text-[#8B6E4E] hover:text-red-500 transition-colors bg-transparent hover:bg-transparent"
            >
              <X className="h-6 w-6" />
            </Button>
            
            <h3 className="font-indie text-2xl text-[#8B6E4E] mb-4">
              Our Memory at <span>{locationName}</span>
            </h3>
            
            <Textarea 
              id="memory-text" 
              value={memoryText}
              onChange={(e) => setMemoryText(e.target.value)}
              className="w-full h-32 p-4 bg-white bg-opacity-60 rounded border border-[#8B6E4E] font-comic resize-none focus:outline-none focus:ring-2 focus:ring-[#8B6E4E]" 
              placeholder="Write your memory here..."
            />
            
            <div className="mt-4 flex flex-col space-y-2">
              <label className="font-comic text-[#8B6E4E] flex items-center cursor-pointer">
                <div className="bg-white bg-opacity-60 w-full p-3 rounded border border-[#8B6E4E] hover:bg-opacity-80 transition-colors text-center">
                  📷 Add a photo
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={handlePhotoUpload}
                  />
                </div>
              </label>
              
              {photoUrl && (
                <div className="mt-2 max-h-40 overflow-hidden rounded border border-[#8B6E4E]">
                  <img 
                    src={photoUrl} 
                    className="w-full object-cover" 
                    alt="Your memory" 
                  />
                </div>
              )}
            </div>
            
            <div className="mt-4 border-t border-[#8B6E4E] pt-4">
              <h4 className="font-indie text-xl text-[#8B6E4E] mb-2">Messages</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {isLoading ? (
                  <div className="animate-pulse bg-white bg-opacity-60 p-2 rounded h-12"></div>
                ) : (
                  data?.messages.map((message, index) => (
                    <div key={message.id || index} className="bg-white bg-opacity-60 p-2 rounded font-comic text-sm">
                      <strong>{message.author}:</strong> {message.content}
                    </div>
                  ))
                )}
              </div>
              
              <div className="mt-2 flex space-x-2">
                <Input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 p-2 bg-white bg-opacity-60 rounded border border-[#8B6E4E] font-comic text-sm focus:outline-none focus:ring-2 focus:ring-[#8B6E4E]"
                  placeholder="Add a message..."
                />
                <Button 
                  onClick={handleSendMessage}
                  className="bg-[#D4E4BC] hover:bg-green-200 text-[#8B6E4E] font-indie px-3 py-1 rounded border-2 border-[#8B6E4E] shadow-[3px_3px_0_#8B6E4E] hover:shadow-[5px_5px_0_#8B6E4E] hover:-translate-y-1 active:translate-y-0 active:shadow-[1px_1px_0_#8B6E4E] transition-all"
                >
                  Send
                </Button>
              </div>
            </div>
            
            <Button 
              onClick={handleSave}
              className="mt-4 w-full bg-[#E0BBE4] hover:bg-purple-200 text-[#8B6E4E] font-indie py-2 rounded-lg border-2 border-[#8B6E4E] shadow-[3px_3px_0_#8B6E4E] hover:shadow-[5px_5px_0_#8B6E4E] hover:-translate-y-1 active:translate-y-0 active:shadow-[1px_1px_0_#8B6E4E] transition-all"
            >
              Save Memory
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyNote;
