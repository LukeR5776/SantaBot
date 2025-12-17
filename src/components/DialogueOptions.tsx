import React from 'react';
import DialogueOption from './DialogueOption';
import './DialogueOptions.css';

export interface Option {
  text: string;
  points: number;
}

interface DialogueOptionsProps {
  options: Option[];
  onSelect: (option: Option) => void;
}

const DialogueOptions: React.FC<DialogueOptionsProps> = ({ options, onSelect }) => {
  return (
    <div className="dialogue-options-container">
      <div className="dialogue-options-grid">
        {options.map((option, index) => (
          <DialogueOption
            key={index}
            text={option.text}
            points={option.points}
            onClick={() => onSelect(option)}
          />
        ))}
      </div>
    </div>
  );
};

export default DialogueOptions;
