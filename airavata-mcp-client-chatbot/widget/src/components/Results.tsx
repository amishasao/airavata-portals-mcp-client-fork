import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./Results2.css";
import Chatbox from "./Chatbox";
import ReactMarkdown from "react-markdown";
import FormattedMessage from "./FormattedMessage";


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

  useEffect(() => {
    if (state?.question && messages.length === 0) {
      const initialMessage: Message = {
        id: Date.now().toString(),
        from: "user",
        text: state.question,
        timestamp: new Date(),
      };

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

            style={{
              animation: `slideIn 0.3s ease-out ${idx * 0.1}s both`,
            }}
          >

            <div className={`messageRow ${msg.from}`}>
              <div className="messageGroup">
                <div className={`messageBubble ${msg.from}`}>
                  {/* <span className="messageText">{msg.text}</span> */}
                  <span className="messageText">
                    {msg.from === "bot" ? (
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    ) : (
                      msg.text
                    )}
                  </span>
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

