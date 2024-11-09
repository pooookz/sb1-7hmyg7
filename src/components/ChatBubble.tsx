import React, { useEffect, useState } from 'react';

interface ChatBubbleProps {
  message: string;
  username: string;
  position: { x: number; y: number };
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message, username, position }) => {
  const [visible, setVisible] = useState(true);
  const [isNew, setIsNew] = useState(true);

  useEffect(() => {
    // Remove new animation class
    const newTimer = setTimeout(() => setIsNew(false), 100);
    // Hide bubble after delay
    const hideTimer = setTimeout(() => setVisible(false), 5000);

    return () => {
      clearTimeout(newTimer);
      clearTimeout(hideTimer);
    };
  }, [message]);

  if (!visible) return null;

  return (
    <div
      className={`absolute z-10 transition-all duration-300 ease-out ${
        isNew ? 'scale-0' : 'scale-100'
      }`}
      style={{ 
        left: position.x + 24,
        top: position.y - 60,
        transform: 'translate3d(-50%, 0, 0)'
      }}
    >
      <div className="relative">
        <div className="bg-white rounded-lg p-2 shadow-lg max-w-[200px] break-words">
          <p className="text-xs text-gray-500 mb-1">{username}</p>
          <p className="text-sm font-medium">{message}</p>
        </div>
        <div 
          className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 rotate-45 w-3 h-3 bg-white shadow-lg"
          style={{ zIndex: -1 }}
        />
      </div>
    </div>
  );
};