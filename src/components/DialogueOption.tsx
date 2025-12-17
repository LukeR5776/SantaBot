import React from 'react';
import './DialogueOption.css';

interface DialogueOptionProps {
  text: string;
  points: number;
  onClick: () => void;
}

const DialogueOption: React.FC<DialogueOptionProps> = ({ text, onClick }) => {
  return (
    <div className="dialogue-option-card" onClick={onClick}>
      <div className="dialogue-option-content">
        <p className="dialogue-option-text">{text}</p>
      </div>
      <div className="dialogue-option-glow"></div>
    </div>
  );
};

export default DialogueOption;
