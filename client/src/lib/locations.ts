export interface Location {
  id: number;
  name: string;
  type: 'landmark' | 'restaurant' | 'fountain';
  background: string;
  icon: string;
}

// Define location data
export const locations: Location[] = [
  { 
    id: 0, 
    name: "Sunny Park", 
    type: "landmark",
    background: "https://images.unsplash.com/photo-1510797215324-95aa89f43c33?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=1080", 
    icon: "📍"
  },
  { 
    id: 1, 
    name: "Ghibli Cafe", 
    type: "restaurant", 
    background: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=1080", 
    icon: "🍽️"
  },
  { 
    id: 2, 
    name: "Enchanted Forest", 
    type: "landmark", 
    background: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=1080", 
    icon: "📍"
  },
  { 
    id: 3, 
    name: "Seaside Restaurant", 
    type: "restaurant", 
    background: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=1080", 
    icon: "🍽️"
  },
  { 
    id: 4, 
    name: "Starry Wishing Fountain", 
    type: "fountain", 
    background: "https://images.unsplash.com/photo-1542652694-40abf526446e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=1080", 
    icon: "✨"
  }
];

// Fountain dialog sequences
export const fountainDialogs = [
  "Moo-Moo: This journey with you has been amazing, Woofles!",
  "Woofles: Every step was an adventure because we were together!",
  "Moo-Moo: Remember when we first met? I was so nervous!",
  "Woofles: And now look at us, traveling the world together!",
  "Moo-Moo: I wish we could stay like this forever...",
  "Woofles: With you, Moo-Moo, I know we will!"
];
