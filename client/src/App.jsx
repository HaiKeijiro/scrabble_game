import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import ScrabbleGame from "./pages/ScrabbleGame";
import ExportPage from "./pages/ExportPage";
import StartPage from "./pages/StartPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/scrabble" element={<ScrabbleGame />} />
        <Route path="/export" element={<ExportPage />} />
      </Routes>
    </>
  );
}

export default App;
