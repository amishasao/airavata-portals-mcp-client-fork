import React, { useState, useEffect, useRef } from "react";
import "./Chatbox2.css";
import { useNavigate } from "react-router-dom";

// added this so that App.tsx and Results.tsx can import and use the same Message type
export interface Message {
  id: string;
  from: "user" | "bot";
  text: string;
  timestamp: Date;
}

interface ChatboxProps {
  fixedBottom?: boolean;
  onSend?: (message: string) => void;
  messages?: Message[];
  showMessages?: boolean;
}

const Chatbox: React.FC<ChatboxProps> = ({
  fixedBottom = false,
  onSend,
  messages = [],
  showMessages = false,
}) => {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false); // provides feedback when sending a message
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // added typing state and better validation
  const handleSend = () => {
    if (input.trim() === "") {
      return;
    }
    setIsTyping(true);
    if (onSend) {
      onSend(input.trim());
      setTimeout(() => {
        navigate("/results");
      }, 100);
    } else {
      navigate("/results", { state: { question: input.trim() } });
    }

    console.log("🧹 Clearing input"); // Debug log
    setInput("");
    setTimeout(() => {
      setIsTyping(false);
    }, 500);
  };

  // key handling (prevents form submission if multiple keys pressed)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`chatbox-wrapper ${fixedBottom ? "fixed-bottom" : ""}`}>
      {showMessages && messages.length > 0 && (
        <div className="message-preview">
          {messages.slice(-3).map((message) => (
            <div key={message.id} className={`preview-message ${message.from}`}>
              <span>{message.text}</span>
            </div>
          ))}
        </div>
      )}

      <div className={fixedBottom ? "inputContainerFixed" : "inputContainer"}>
        <div className="inputRow">
          <input
            ref={inputRef}
            type="text"
            placeholder="Ask away :)"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                console.log(
                  "↩️ Enter key detected, preventing default and calling handleSend"
                ); // Debug log
                e.preventDefault();
                handleSend();
              }
            }}
            className={`inputField ${isTyping ? "sending" : ""}`}
            disabled={isTyping}
          />
          <button
            onClick={() => {
              console.log("🖱️ Send button clicked"); // Debug log
              handleSend();
            }}
            className={`iconButton`}
            disabled={isTyping || input.trim() === ""}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="29"
              height="29"
              viewBox="0 0 29 29"
              fill="none"
            >
              <path
                d="M3.625 24.1666V4.83331L26.5833 14.5L3.625 24.1666ZM6.04167 20.5416L20.3604 14.5L6.04167 8.45831V12.6875L13.2917 14.5L6.04167 16.3125V20.5416ZM6.04167 20.5416V14.5V8.45831V12.6875V16.3125V20.5416Z"
                fill={isTyping ? "#ccc" : "#1D1B20"}
              />
            </svg>
          </button>
        </div>

        <div className="footerRow">
          <div className="pill">
            <span>GPT 4o-Mini</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="14"
              viewBox="0 0 16 14"
              fill="none"
            >
              <path
                d="M4 5.25L8 8.75L12 5.25"
                stroke="#1E1E1E"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="pill">
            <span>Datasets</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="9"
              height="8"
              viewBox="0 0 9 8"
              fill="none"
            >
              <g clipPath="url(#clip0)">
                <path
                  d="M7.875 1.66669C7.875 2.21897 6.36396 2.66669 4.5 2.66669C2.63604 2.66669 1.125 2.21897 1.125 1.66669M7.875 1.66669C7.875 1.1144 6.36396 0.666687 4.5 0.666687C2.63604 0.666687 1.125 1.1144 1.125 1.66669M7.875 1.66669V6.33335C7.875 6.88669 6.375 7.33335 4.5 7.33335C2.625 7.33335 1.125 6.88669 1.125 6.33335V1.66669M7.875 4.00002C7.875 4.55335 6.375 5.00002 4.5 5.00002C2.625 5.00002 1.125 4.55335 1.125 4.00002"
                  stroke="#1E1E1E"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="9" height="8" rx="2" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>

          <div className="pill">
            <span>Repositories</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </div>

          <div className="pill">
            <span>Notebooks</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="11"
              viewBox="0 0 12 11"
              fill="none"
            >
              <g clipPath="url(#clip0_12_56)">
                <path
                  d="M6 3.20833C6 2.7221 5.78929 2.25579 5.41421 1.91197C5.03914 1.56815 4.53043 1.375 4 1.375H1V8.25H4.5C4.89782 8.25 5.27936 8.39487 5.56066 8.65273C5.84196 8.91059 6 9.26033 6 9.625M6 3.20833V9.625M6 3.20833C6 2.7221 6.21071 2.25579 6.58579 1.91197C6.96086 1.56815 7.46957 1.375 8 1.375H11V8.25H7.5C7.10218 8.25 6.72064 8.39487 6.43934 8.65273C6.15804 8.91059 6 9.26033 6 9.625"
                  stroke="#1E1E1E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_12_56">
                  <rect width="12" height="11" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
