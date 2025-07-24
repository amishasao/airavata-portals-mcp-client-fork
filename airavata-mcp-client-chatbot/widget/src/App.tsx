import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chatbox from "./components/Chatbox";
import Results from "./components/Results";

export interface Message {
  id: string;
  from: "user" | "bot";
  text: string;
  timestamp: Date;
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (text: string, from: "user" | "bot") => {
    const newMessage: Message = {
      id: Date.now().toString(),
      from,
      text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleUserMessage = (text: string) => {
    addMessage(text, "user");

    // simulate bot response after a short delay
    setTimeout(() => {
      addMessage(`Thanks for your message: "${text}"`, "bot");
    }, 1000);
  };

  return (
    <Router>
      <div
        style={{
          height: "100vh",
          backgroundColor: "#f5f5f5",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>What can I do for your research?</h1>
                <Chatbox
                  fixedBottom={false}
                  onSend={handleUserMessage}
                  messages={messages}
                />
              </>
            }
          />
          <Route
            path="/results"
            element={
              <>
                <Results
                  messages={messages}
                  onSendMessage={handleUserMessage}
                />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
