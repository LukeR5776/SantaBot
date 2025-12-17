import { useState } from 'react';
import SantaDisplay from './components/SantaDisplay';
import JollinessBar from './components/JollinessBar';
import ChatInterface from './components/ChatInterface';
import VictoryModal from './components/VictoryModal';
import './App.css';

function App() {
  const [jolliness, setJolliness] = useState(0);
  const [showVictory, setShowVictory] = useState(false);

  const handleJollinessChange = (newJolliness: number) => {
    setJolliness(newJolliness);
    if (newJolliness >= 100 && !showVictory) {
      setShowVictory(true);
    }
  };

  const handleRestart = () => {
    setJolliness(0);
    setShowVictory(false);
    window.location.reload();
  };

  return (
    <div className="app">
      <JollinessBar jolliness={jolliness} />
      <SantaDisplay jolliness={jolliness} />
      <ChatInterface
        onJollinessChange={handleJollinessChange}
        currentJolliness={jolliness}
      />
      {showVictory && <VictoryModal onRestart={handleRestart} />}
    </div>
  );
}

export default App;
