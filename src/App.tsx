import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, useEffect, lazy } from "react";

const GameDeveloperPortfolio = lazy(() => import("./GameDeveloperPortfolio"));
const GamePage = lazy(() => import("./GamePage"));

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
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#060814] text-zinc-100 flex items-center justify-center text-sm">
            Loading…
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<GameDeveloperPortfolio />} />
          <Route path="/games/:slug" element={<GamePage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;