import React, { useState } from 'react';

interface MessageFormProps {
  onSendMessage: (message: string, author: string) => void;
}

const MessageForm: React.FC<MessageFormProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSendMessage(message, author);
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <div>
        <button type="submit">Send</button>
      </div>
    </form>
  );
};

export default MessageForm;