import React from 'react';
import './MessageBubble.css';

interface MessageBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: Date;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isUser, timestamp }) => {
  return (
    <div className={`message-bubble ${isUser ? 'user-message' : 'santa-message'}`}>
      <div className="message-header">
        <span className="message-sender">{isUser ? 'You' : 'Santa'}</span>
        {timestamp && (
          <span className="message-time">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>
      <div className="message-content">{message}</div>
    </div>
  );
};

export default MessageBubble;
