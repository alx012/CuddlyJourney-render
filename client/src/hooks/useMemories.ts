import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { insertMemorySchema, insertMessageSchema } from "@shared/schema";
import type { Memory, Message } from "@shared/schema";

interface MemoryWithMessages {
  memory: Memory;
  messages: Message[];
}

export function useMemory(locationId: number) {
  return useQuery<MemoryWithMessages>({
    queryKey: ['/api/memories', locationId.toString()],
    queryFn: async () => {
      const response = await fetch(`/api/memories/${locationId}`, {
        credentials: 'include'
      });
      
      if (response.status === 404) {
        // Return default empty memory with default messages
        return {
          memory: {
            id: 0,
            locationId,
            text: "",
            photoUrl: null
          },
          messages: [
            { 
              id: 1, 
              memoryId: 0, 
              author: "Woofles", 
              content: "This place is pawsome! 🐾" 
            },
            { 
              id: 2, 
              memoryId: 0, 
              author: "Moo-Moo", 
              content: "Mooo-velous memories here! 🐮" 
            }
          ]
        };
      }
      
      if (!response.ok) {
        throw new Error("Failed to fetch memory");
      }
      
      return response.json();
    },
    refetchOnWindowFocus: false,
  });
}

export function useCreateOrUpdateMemory() {
  return useMutation({
    mutationFn: async (data: {
      locationId: number,
      text?: string,
      photoUrl?: string
    }) => {
      const validatedData = insertMemorySchema.parse(data);
      const result = await apiRequest('POST', '/api/memories', validatedData);
      return result.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['/api/memories', variables.locationId.toString()] });
    }
  });
}

export function useAddMessage() {
  return useMutation({
    mutationFn: async (data: {
      memoryId: number,
      author: string,
      content: string
    }) => {
      const validatedData = insertMessageSchema.parse(data);
      const result = await apiRequest('POST', '/api/messages', validatedData);
      return result.json();
    },
    onSuccess: (_, variables) => {
      // Use memoryId to find the locationId
      queryClient.invalidateQueries({ queryKey: ['/api/memories'] });
    }
  });
}
