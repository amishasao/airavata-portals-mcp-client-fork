import ChatBot from "react-chatbotify";
import { useState } from "react";
import "./App.css";

function App2() {
  const [count, setCount] = useState<number>(0);

  return (
    <>
      <ChatBot />
      <div>
        <a href=""></a>
        <a href=""></a>
      </div>

      <h1>title</h1>
      <div>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>my message: let's code together!</p>
      </div>
      <p className="read-the-docs">click on the logos to learn more!</p>
    </>
  );
}

export default App2;

// old App.tsx

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Chatbox from "./components/Chatbox";
// import Results from "./components/Results";

// const App: React.FC = () => {
//   return (
//     <Router>
//       <div
//         style={{
//           height: "100vh",
//           backgroundColor: "#f5f5f5",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           padding: "20px",
//           textAlign: "center",
//         }}
//       >
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <>
//                 <h1>What can I do for your research?</h1>
//                 <Chatbox fixedBottom={false} />
//               </>
//             }
//           />
//           <Route
//             path="/results"
//             element={
//               <>
//                 <Results />
//                 <Chatbox fixedBottom={true} />
//               </>
//             }
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;
