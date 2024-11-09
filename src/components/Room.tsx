import React, { useEffect, useState } from 'react';
import { Avatar } from './Avatar';
import { ChatBubble } from './ChatBubble';
import { useGameStore } from '../store';

export const Room: React.FC = () => {
  const { currentRoom, users, currentUser, updateUserPosition, messages, addMessage } = useGameStore();
  const [chatInput, setChatInput] = useState('');

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!currentUser) return;
      
      const room = e.currentTarget as HTMLDivElement;
      const rect = room.getBoundingClientRect();
      const x = e.clientX - rect.left - 24;
      const y = e.clientY - rect.top - 24;
      
      // Ensure position stays within bounds
      const boundedX = Math.max(0, Math.min(x, room.clientWidth - 48));
      const boundedY = Math.max(0, Math.min(y, room.clientHeight - 48));
      
      updateUserPosition(currentUser.id, boundedX, boundedY);
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey && currentUser) {
        e.preventDefault();
        if (chatInput.trim()) {
          addMessage(currentUser.id, chatInput.trim());
          setChatInput('');
        }
      }
    };

    const roomElement = document.getElementById('room');
    if (roomElement) {
      roomElement.addEventListener('click', handleClick);
      document.addEventListener('keypress', handleKeyPress);
      return () => {
        roomElement.removeEventListener('click', handleClick);
        document.removeEventListener('keypress', handleKeyPress);
      };
    }
  }, [currentUser, updateUserPosition, chatInput, addMessage]);

  if (!currentRoom) return null;

  return (
    <div className="relative w-full h-full">
      <div
        id="room"
        className="relative w-full h-full bg-cover bg-center cursor-pointer"
        style={{ 
          backgroundImage: `url(${currentRoom.background})`,
          backgroundColor: '#1a1a1a'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        
        {/* Online Users Count */}
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full">
          {users.length} Online
        </div>

        {messages.map((message) => {
          const messageUser = users.find(u => u.id === message.userId);
          if (!messageUser) return null;

          return (
            <ChatBubble
              key={message.id}
              message={message.text}
              username={messageUser.name}
              position={messageUser.position}
            />
          );
        })}
        
        {users.map((user) => (
          <Avatar
            key={user.id}
            user={user}
            isCurrentUser={user.id === currentUser?.id}
          />
        ))}
      </div>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="bg-black bg-opacity-50 text-white px-4 py-1 rounded-full text-sm">
          Click anywhere to move • Press Enter to chat
        </div>
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Type your message..."
          className="px-4 py-2 rounded-full bg-white bg-opacity-90 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-96"
        />
      </div>
    </div>
  );
};