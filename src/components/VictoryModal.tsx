import React from 'react';
import './VictoryModal.css';

interface VictoryModalProps {
  onRestart: () => void;
}

const VictoryModal: React.FC<VictoryModalProps> = ({ onRestart }) => {
  return (
    <div className="victory-modal-overlay">
      <div className="victory-modal">
        <div className="victory-content">
          <h1 className="victory-title">🎄 HO HO HO! 🎄</h1>
          <p className="victory-message">
            You've restored my Christmas spirit to maximum jolliness!
            Thank you for the wonderful conversation!
          </p>
          <p className="victory-subtitle">
            Science Santa is ready to spread joy and knowledge throughout the land!
          </p>
          <div className="victory-sparkles">✨ ⭐ ✨ ⭐ ✨</div>
          <button className="restart-button" onClick={onRestart}>
            Start New Conversation
          </button>
        </div>
      </div>
    </div>
  );
};

export default VictoryModal;
