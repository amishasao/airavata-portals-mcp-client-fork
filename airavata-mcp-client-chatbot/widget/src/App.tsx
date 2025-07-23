import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chatbox from "./components/Chatbox";
import Results from "./components/Results";

const App: React.FC = () => {
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
                <Chatbox fixedBottom={false} />
              </>
            }
          />
          <Route
            path="/results"
            element={
              <>
                <Results />
                <Chatbox fixedBottom={true} />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
