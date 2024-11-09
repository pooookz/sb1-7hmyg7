import React from 'react';
import { User } from '../types';

interface AvatarProps {
  user: User;
  isCurrentUser?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({ user, isCurrentUser }) => {
  return (
    <div
      className="absolute transition-all duration-300 ease-out will-change-transform"
      style={{ 
        left: user.position.x,
        top: user.position.y,
        transform: 'translate3d(0,0,0)' // Force GPU acceleration
      }}
    >
      <div className="relative group">
        <img
          src={user.avatar}
          alt={user.name}
          className={`w-12 h-12 rounded-full border-2 ${
            isCurrentUser ? 'border-blue-500 shadow-lg shadow-blue-500/50' : 'border-gray-300'
          }`}
        />
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 px-2 py-1 rounded-full text-white text-xs whitespace-nowrap">
          {user.name}
        </div>
      </div>
    </div>
  );
};