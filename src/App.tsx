
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { LanguageProvider } from "./contexts/LanguageContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBotUI from "./components/ChatBotUI";
import LoginPopup from "./components/LoginPopup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Trends from "./pages/Trends";
import Forecast from "./pages/Forecast";
import Health from "./pages/Health";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [hasSeenPopup, setHasSeenPopup] = useState(false);

  useEffect(() => {
    // Show login popup on first visit
    const hasVisited = localStorage.getItem('hasVisitedTarkVayu');
    if (!hasVisited && !hasSeenPopup) {
      setTimeout(() => {
        setShowLoginPopup(true);
        setHasSeenPopup(true);
      }, 2000); // Show after 2 seconds
    }
  }, [hasSeenPopup]);

  const handleClosePopup = () => {
    setShowLoginPopup(false);
    localStorage.setItem('hasVisitedTarkVayu', 'true');
  };

  const handleSkipPopup = () => {
    setShowLoginPopup(false);
    localStorage.setItem('hasVisitedTarkVayu', 'true');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/trends" element={<Trends />} />
                <Route path="/forecast" element={<Forecast />} />
                <Route path="/health" element={<Health />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
              <ChatBotUI />
              <LoginPopup 
                isOpen={showLoginPopup}
                onClose={handleClosePopup}
                onSkip={handleSkipPopup}
              />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
