import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertMemorySchema, 
  insertMessageSchema 
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for memories and messages
  
  // Get memory by location ID
  app.get("/api/memories/:locationId", async (req, res) => {
    try {
      const locationId = parseInt(req.params.locationId);
      
      if (isNaN(locationId)) {
        return res.status(400).json({ message: "Invalid location ID" });
      }
      
      const memory = await storage.getMemoryByLocationId(locationId);
      
      if (!memory) {
        return res.status(404).json({ message: "Memory not found" });
      }
      
      // Get messages for this memory
      const messages = await storage.getMessagesByMemoryId(memory.id);
      
      res.json({ 
        memory,
        messages 
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Create or update memory
  app.post("/api/memories", async (req, res) => {
    try {
      const validatedData = insertMemorySchema.parse(req.body);
      
      // Check if memory exists for this location
      const existingMemory = await storage.getMemoryByLocationId(validatedData.locationId);
      
      let memory;
      if (existingMemory) {
        // Update existing memory
        memory = await storage.updateMemory(existingMemory.id, validatedData);
      } else {
        // Create new memory
        memory = await storage.createMemory(validatedData);
      }
      
      res.json(memory);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Add message to memory
  app.post("/api/messages", async (req, res) => {
    try {
      const validatedData = insertMessageSchema.parse(req.body);
      
      const message = await storage.createMessage(validatedData);
      
      res.json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Get messages for a memory
  app.get("/api/messages/:memoryId", async (req, res) => {
    try {
      const memoryId = parseInt(req.params.memoryId);
      
      if (isNaN(memoryId)) {
        return res.status(400).json({ message: "Invalid memory ID" });
      }
      
      const messages = await storage.getMessagesByMemoryId(memoryId);
      
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
