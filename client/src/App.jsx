import { Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import Scrabble from "./Pages/ScrabbleGame";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/scrabble" element={<Scrabble />} />
      </Routes>
    </>
  );
}

export default App;
