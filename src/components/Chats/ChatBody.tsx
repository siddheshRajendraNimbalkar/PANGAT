import React, { useEffect, useState, useRef } from 'react';

interface Message {
  text: string;
  sender: string;
  timestamp: string;
}

interface ChatBodyProps {
  id: string;
  profile1: {
    username: string;
    imageUrl: string;
    id: string;
  };
  profile2: {
    username: string;
    imageUrl: string;
    id: string;
  };
  channel: {
    name: string;
    imageUrl: string;
    id: string;
  };
}

const ChatBody: React.FC<ChatBodyProps> = ({id, profile1, profile2, channel}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Connect to your Gorilla WebSocket server
    const wsUrl = `${process.env.NEXT_PUBLIC_WS_GOSOCKET}/conversation/${id}`;
    ws.current = new WebSocket(wsUrl);

    ws.current.onmessage = (event: any) => {
      const message: Message = JSON.parse(event.data);
      setMessages(prev => [...prev, message]);
    };

    // Cleanup on component unmount
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [id]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (ws.current && inputMessage.trim()) {
      const newMessage: Message = {
        text: inputMessage,
        sender: profile1.username, // You might want to get this from authentication
        timestamp: new Date().toISOString(),
      };

      ws.current.send(JSON.stringify(newMessage));
      setInputMessage('');
    }
  };

  return (
    <div>
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index}>{message.text}</div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
        />
      </form>
    </div>
  );
};

export default ChatBody;
