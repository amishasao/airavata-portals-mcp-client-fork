import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./Results2.css";
import Chatbox from "./Chatbox";

export interface Message {
  id: string;
  from: "user" | "bot";
  text: string;
  timestamp: Date;
}

interface ResultsProps {
  messages?: Message[];
  onSendMessage?: (message: string) => void;
}

interface LocationState {
  question: string;
}

const Results: React.FC<ResultsProps> = ({ messages = [], onSendMessage }) => {
  const location = useLocation();
  const state = location.state as LocationState | undefined;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);

// (Removed commented-out code for better readability and maintainability)

  useEffect(() => {
    if (state?.question && messages.length === 0) {
      const initialMessage: Message = {
        id: Date.now().toString(),
        from: "user",
        text: state.question,
        timestamp: new Date(),
      };
      // setMessages([
      //   { from: "user", text: state.question },
      //   { from: "bot", text: "Hi {username} :)" },
      // ]);
      setDisplayedMessages([initialMessage]);

      // add bot response after delay
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          from: "bot",
          text: "Hi there! Thanks for your question. How can I help you with your research?",
          timestamp: new Date(),
        };
        setDisplayedMessages((prev) => [...prev, botResponse]);
      }, 1000);
    } else {
      setDisplayedMessages(messages);
    }
  }, [state?.question, messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [displayedMessages]);

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleDateString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="resultsContainer">
      <div className="chatMessages">
        {displayedMessages.map((msg, idx) => (
          <div
            key={msg.id}
            className={`messageRow ${msg.from}`}
            // adding an animation to make it smoother
            style={{
              animation: `slideIn 0.3s ease-out ${idx * 0.1}s both`,
            }}
          >
            <div className={`messageRow ${msg.from}`}>
            <div className="messageGroup">
                <div className={`messageBubble ${msg.from}`}>
                  <span className="messageText">{msg.text}</span>
                </div>
                <div className={`messageTimestamp ${msg.from}`}>
                  {formatTime(msg.timestamp)}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <Chatbox
        fixedBottom
        onSend={onSendMessage} // src code in Chatbox.tsx
        messages={displayedMessages}
      />
    </div>
  );
};

export default Results;
