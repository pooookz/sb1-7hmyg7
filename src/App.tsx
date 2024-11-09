import React from 'react';
import { Room } from './components/Room';
import { useGameStore } from './store';
import { UsernameModal } from './components/UsernameModal';
import { User, Room as RoomType } from './types';

// Sample room data
const sampleRoom: RoomType = {
  id: 'lobby',
  name: 'Lobby',
  background: 'https://images.unsplash.com/photo-1554189097-ffe88e998a2b?w=1200&q=80',
  exits: {
    room2: 'right',
  },
};

function App() {
  const { currentUser, setCurrentRoom } = useGameStore();

  React.useEffect(() => {
    setCurrentRoom(sampleRoom);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gray-900">
      <div className="absolute inset-4 rounded-xl overflow-hidden shadow-2xl">
        {currentUser ? <Room /> : <UsernameModal />}
      </div>
    </div>
  );
}

export default App;