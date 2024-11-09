import React, { useState } from 'react';
import { useGameStore } from '../store';
import { MessageCircle } from 'lucide-react';

export const ChatBox: React.FC = () => {
  const [message, setMessage] = useState('');
  const { messages, addMessage, currentUser } = useGameStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && currentUser) {
      addMessage(currentUser.name, message.trim());
      setMessage('');
    }
  };

  return (
    <div className="absolute bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          <h3 className="font-semibold">Chat</h3>
        </div>
      </div>
      <div className="h-64 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className="flex flex-col">
            <span className="text-sm font-semibold">{msg.user}</span>
            <p className="text-sm bg-gray-100 rounded-lg p-2">{msg.text}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form>
    </div>
  );
};