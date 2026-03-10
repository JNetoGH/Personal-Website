import { BrowserRouter, Routes, Route } from "react-router-dom";
import GameDeveloperPortfolio from "./GameDeveloperPortfolio";
import GamePage from "./GamePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GameDeveloperPortfolio />} />
        <Route path="/games/:slug" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;