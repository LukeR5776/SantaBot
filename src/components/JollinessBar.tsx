import React from 'react';
import './JollinessBar.css';

interface JollinessBarProps {
  jolliness: number;
}

const JollinessBar: React.FC<JollinessBarProps> = ({ jolliness }) => {
  return (
    <div className="jolliness-bar-container">
      <div className="jolliness-label">
        <span className="label-text">Jolliness Level</span>
        <span className="jolliness-score">{jolliness}/100</span>
      </div>
      <div className="jolliness-bar">
        <div
          className="jolliness-fill"
          style={{ width: `${jolliness}%` }}
        >
          <div className="jolliness-shine"></div>
        </div>
      </div>
    </div>
  );
};

export default JollinessBar;
