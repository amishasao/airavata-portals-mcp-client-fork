import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./Results.css";
import Chatbox from './Chatbox';


interface Message {
  from: "user" | "bot";
  text: string;
}

interface LocationState {
  question: string;
}

const Results: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState | undefined;

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (state?.question) {
      setMessages([
        { from: "user", text: state.question },
        { from: "bot", text: "Hi {username} :)" },
      ]);
    }
  }, []);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const handleSend = (msg: string) => {
    setMessages((prev) => [...prev, { text: msg, from: 'user' }]);
    // Optionally: Add fake bot reply
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: 'Thanks for your message!', from: 'bot' }]);
    }, 1000);
  };
  

  

  return (
    <div className="resultsContainer">
      <div className="chatMessages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`messageRow ${msg.from}`}>
            <span className={`messageBubble ${msg.from}`}>{msg.text}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
  
      <Chatbox
        fixedBottom
        onSend={(msg: string) => {
          setMessages((prev) => [
            ...prev,
            { from: 'user', text: msg },
            { from: 'bot', text: `You said: "${msg}"` }
          ]);
        }}
      />
    </div>
  );
};

export default Results;
