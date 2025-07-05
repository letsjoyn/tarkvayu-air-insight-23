
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Trends from "./pages/Trends";
import Forecast from "./pages/Forecast";
import Health from "./pages/Health";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPopup from "./components/LoginPopup";

function App() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    // Check if user has seen the login popup before
    const hasSeenLogin = localStorage.getItem('hasSeenLogin');
    if (!hasSeenLogin) {
      // Show popup after a short delay
      setTimeout(() => {
        setShowLoginPopup(true);
      }, 2000);
    }
  }, []);

  const handleCloseLogin = () => {
    setShowLoginPopup(false);
    localStorage.setItem('hasSeenLogin', 'true');
  };

  const handleSkipLogin = () => {
    setShowLoginPopup(false);
    localStorage.setItem('hasSeenLogin', 'true');
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Router>
        <div className="min-h-screen bg-background flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/trends" element={<Trends />} />
              <Route path="/forecast" element={<Forecast />} />
              <Route path="/health" element={<Health />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <Toaster />
          
          {/* Login Popup */}
          <LoginPopup 
            isOpen={showLoginPopup} 
            onClose={handleCloseLogin}
            onSkip={handleSkipLogin}
          />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
