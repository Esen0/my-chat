import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MessageList from './componets/MessageList/MessageList';
import MessageForm from './componets/MessageForm/MessageForm';
import './App.css'

interface Message {
  _id: string;
  message: string;
  author: string;
  datetime: string;
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [lastDatetime, setLastDatetime] = useState<string>('');

  useEffect(() => {
    const fetchMessages = async () => {
      const url = lastDatetime 
        ? `http://146.185.154.90:8000/messages?datetime=${lastDatetime}` 
        : 'http://146.185.154.90:8000/messages';

      try {
        const response = await axios.get<Message[]>(url);
        if (response.data.length > 0) {
          setMessages((prev) => [...prev, ...response.data]);
          setLastDatetime(response.data[response.data.length - 1].datetime);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [lastDatetime]);

  const handleSendMessage = async (message: string, author: string) => {
    try {
      await axios.post('http://146.185.154.90:8000/messages', new URLSearchParams({ message, author }));
      setLastDatetime('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <h1>Chat App</h1>
      <MessageList messages={messages} />
      <MessageForm onSendMessage={handleSendMessage} />
    </div>
  );
};

export default App;