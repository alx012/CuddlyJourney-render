import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define the memory schema for locations
export const memories = pgTable("memories", {
  id: serial("id").primaryKey(),
  locationId: integer("location_id").notNull(),
  text: text("text"),
  photoUrl: text("photo_url"),
});

// Define the message schema for memories
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  memoryId: integer("memory_id").notNull(),
  author: text("author").notNull(),
  content: text("content").notNull(),
});

// Create insert schemas
export const insertMemorySchema = createInsertSchema(memories).pick({
  locationId: true,
  text: true,
  photoUrl: true,
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  memoryId: true,
  author: true,
  content: true,
});

// Export types
export type InsertMemory = z.infer<typeof insertMemorySchema>;
export type Memory = typeof memories.$inferSelect;

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;

// User schema is kept from the template
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
