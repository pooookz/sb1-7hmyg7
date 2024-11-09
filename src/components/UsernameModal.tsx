import React, { useState } from 'react';
import { User } from '../types';
import { useGameStore } from '../store';

export const UsernameModal: React.FC = () => {
  const [username, setUsername] = useState('');
  const { setCurrentUser } = useGameStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      const user: User = {
        id: 'user_' + Math.random().toString(36).substring(2),
        name: username.trim(),
        position: { x: Math.random() * 300 + 100, y: Math.random() * 300 + 100 },
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
        room: 'lobby'
      };
      setCurrentUser(user);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 shadow-2xl max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome to Virtual Chat</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Choose your username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username..."
              autoFocus
              required
              minLength={3}
              maxLength={15}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            disabled={username.length < 3}
          >
            Join Chat
          </button>
        </form>
      </div>
    </div>
  );
};