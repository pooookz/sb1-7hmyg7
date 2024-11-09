export interface Position {
  x: number;
  y: number;
}

export interface User {
  id: string;
  name: string;
  position: Position;
  avatar: string;
  room: string;
}

export interface Room {
  id: string;
  name: string;
  background: string;
  exits: {
    [key: string]: string; // roomId: position
  };
}