import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import SigninPage from "./pages/Signin";
import SignupPage from "./pages/Signup";
import Leaderboard from "./pages/Leaderboard";
import PremiumPage from "./pages/PremiumPage";
import { BlockchainProvider } from "./context/blockchainContext"; // ✅ Import the blockchain provider

const App = () => {
  return (
    <BlockchainProvider> {/* ✅ Wrap the whole app inside BlockchainProvider */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/premium" element={<PremiumPage />} />
        </Routes>
      </Router>
    </BlockchainProvider>
  );
};

export default App;
