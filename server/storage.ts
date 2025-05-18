import { 
  users, type User, type InsertUser,
  memories, type Memory, type InsertMemory,
  messages, type Message, type InsertMessage 
} from "@shared/schema";

export interface IStorage {
  // User operations (kept from template)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Memory operations
  getMemoryByLocationId(locationId: number): Promise<Memory | undefined>;
  createMemory(memory: InsertMemory): Promise<Memory>;
  updateMemory(id: number, memory: Partial<InsertMemory>): Promise<Memory | undefined>;
  
  // Message operations
  getMessagesByMemoryId(memoryId: number): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private memoriesMap: Map<number, Memory>;
  private messagesMap: Map<number, Message[]>;
  
  userCurrentId: number;
  memoryCurrentId: number;
  messageCurrentId: number;

  constructor() {
    this.users = new Map();
    this.memoriesMap = new Map();
    this.messagesMap = new Map();
    
    this.userCurrentId = 1;
    this.memoryCurrentId = 1;
    this.messageCurrentId = 1;
    
    // Add default messages for the initial locations
    this.initializeDefaultData();
  }

  // Initialize with some default data
  private initializeDefaultData() {
    // Create default memories for each location
    for(let i = 0; i < 5; i++) {
      const memoryId = this.memoryCurrentId++;
      const memory: Memory = { 
        id: memoryId, 
        locationId: i, 
        text: "", 
        photoUrl: null 
      };
      this.memoriesMap.set(memoryId, memory);
      
      // Add default messages for each memory
      const defaultMessages: Message[] = [
        { 
          id: this.messageCurrentId++, 
          memoryId, 
          author: "Woofles", 
          content: "This place is pawsome! 🐾" 
        },
        { 
          id: this.messageCurrentId++, 
          memoryId, 
          author: "Moo-Moo", 
          content: "Mooo-velous memories here! 🐮" 
        }
      ];
      
      this.messagesMap.set(memoryId, defaultMessages);
    }
  }

  // User operations (kept from template)
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Memory operations
  async getMemoryByLocationId(locationId: number): Promise<Memory | undefined> {
    return Array.from(this.memoriesMap.values()).find(
      (memory) => memory.locationId === locationId
    );
  }
  
  async createMemory(insertMemory: InsertMemory): Promise<Memory> {
    // Check if a memory already exists for this location
    const existingMemory = await this.getMemoryByLocationId(insertMemory.locationId);
    
    if (existingMemory) {
      // Update existing memory
      return this.updateMemory(existingMemory.id, insertMemory) as Promise<Memory>;
    }
    
    // Create new memory
    const id = this.memoryCurrentId++;
    const memory: Memory = { ...insertMemory, id };
    this.memoriesMap.set(id, memory);
    
    // Initialize empty messages array for this memory
    this.messagesMap.set(id, []);
    
    return memory;
  }
  
  async updateMemory(id: number, memoryUpdate: Partial<InsertMemory>): Promise<Memory | undefined> {
    const memory = this.memoriesMap.get(id);
    
    if (!memory) {
      return undefined;
    }
    
    const updatedMemory: Memory = { 
      ...memory, 
      ...memoryUpdate 
    };
    
    this.memoriesMap.set(id, updatedMemory);
    return updatedMemory;
  }
  
  // Message operations
  async getMessagesByMemoryId(memoryId: number): Promise<Message[]> {
    return this.messagesMap.get(memoryId) || [];
  }
  
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.messageCurrentId++;
    const message: Message = { ...insertMessage, id };
    
    // Get existing messages or create new array
    const existingMessages = this.messagesMap.get(insertMessage.memoryId) || [];
    
    // Add new message
    this.messagesMap.set(insertMessage.memoryId, [...existingMessages, message]);
    
    return message;
  }
}

export const storage = new MemStorage();
