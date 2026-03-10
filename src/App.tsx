import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import GameDeveloperPortfolio from "./GameDeveloperPortfolio";
import GamePage from "./GamePage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<GameDeveloperPortfolio />} />
        <Route path="/games/:slug" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;