import React, { useState } from 'react';
import './Chatbox.css';
import { FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface ChatboxProps {
  fixedBottom?: boolean;
  onSend?: (message: string) => void;
}

const Chatbox: React.FC<ChatboxProps> = ({ fixedBottom = false, onSend }) => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();


  const handleSend = () => {
    
    if (input.trim() === '') return;
  
    if (onSend) {
    onSend(input);
    } else {
      navigate('/results', { state: { question: input } });
    }
    setInput('');
  };


  return (
    <div className={fixedBottom ? 'inputContainerFixed' : 'inputContainer'}>
      <div className="inputRow">
        <input
          type="text"
          placeholder="Ask away :)"
          value={input}
          onChange={(e) => {
            console.log('Typing:', e.target.value); // ✅ log here
            setInput(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSend();
            }
          }}
          className="inputField"
          
        />
        <button onClick={handleSend} className="iconButton">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="29"
            height="29"
            viewBox="0 0 29 29"
            fill="none"
          >
            <path
              d="M3.625 24.1666V4.83331L26.5833 14.5L3.625 24.1666ZM6.04167 20.5416L20.3604 14.5L6.04167 8.45831V12.6875L13.2917 14.5L6.04167 16.3125V20.5416ZM6.04167 20.5416V14.5V8.45831V12.6875V16.3125V20.5416Z"
              fill="#1D1B20"
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
          <FaGithub size={13} />
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
  );
}

export default Chatbox;
