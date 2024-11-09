import { create } from 'zustand';
import { User, Room } from './types';

interface Message {
  id: string;
  userId: string; // Changed from user string to userId for better tracking
  text: string;
  timestamp: number;
}

interface GameState {
  currentUser: User | null;
  users: User[];
  currentRoom: Room | null;
  messages: Message[];
  setCurrentUser: (user: User) => void;
  updateUserPosition: (userId: string, x: number, y: number) => void;
  setCurrentRoom: (room: Room) => void;
  addMessage: (userId: string, text: string) => void;
}

export const useGameStore = create<GameState>((set) => ({
  currentUser: null,
  users: [],
  currentRoom: null,
  messages: [],
  setCurrentUser: (user) => set((state) => ({ 
    currentUser: user,
    users: [...state.users.filter(u => u.id !== user.id), user]
  })),
  updateUserPosition: (userId, x, y) =>
    set((state) => ({
      users: state.users.map((u) =>
        u.id === userId ? { ...u, position: { x, y } } : u
      ),
      currentUser: state.currentUser?.id === userId 
        ? { ...state.currentUser, position: { x, y } }
        : state.currentUser
    })),
  setCurrentRoom: (room) => set({ currentRoom: room }),
  addMessage: (userId, text) =>
    set((state) => ({
      messages: [...state.messages, { 
        id: Math.random().toString(36).substr(2, 9),
        userId,
        text, 
        timestamp: Date.now() 
      }],
    })),
}));