import React from 'react';

interface Message {
  _id: string;
  message: string;
  author: string;
  datetime: string;
}

interface MessageListProps {
  messages: Message[];
}

const Message: React.FC<MessageListProps> = ({messages}) => {

    return (
      <ul>
        {messages.map((msg) => (
          <li key={msg._id}>
            <strong>{msg.author}</strong>: {msg.message} <em>({new Date(msg.datetime).toLocaleString()})</em>
          </li>
        ))}
      </ul>
    )
  }
  
  export default Message