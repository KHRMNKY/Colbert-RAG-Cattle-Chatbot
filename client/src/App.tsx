import React from 'react';
import { ChatContainer } from './components/Chat/ChatContainer';

function App() {
  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
      <ChatContainer />
    </div>
  );
}

export default App;