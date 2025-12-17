import React from 'react';
import './SantaDisplay.css';

interface SantaDisplayProps {
  jolliness: number;
}

const SantaDisplay: React.FC<SantaDisplayProps> = ({ jolliness }) => {
  // Map jolliness score (0-100) to expression images
  const getExpression = () => {
    if (jolliness <= 20) return 'grumpy';
    if (jolliness <= 40) return 'neutral';
    if (jolliness <= 60) return 'slight-smile';
    if (jolliness <= 80) return 'happy';
    return 'jolly';
  };

  const expression = getExpression();

  return (
    <div className="santa-display">
      <div className="santa-container">
        <img
          src={`/images/santa-${expression}.png`}
          alt={`Santa ${expression}`}
          className="santa-image"
        />
      </div>
    </div>
  );
};

export default SantaDisplay;
