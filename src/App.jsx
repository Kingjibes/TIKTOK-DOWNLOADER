
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/HomePage';
import ContactPage from '@/pages/ContactPage';
import SplashScreen from '@/components/SplashScreen';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/contexts/ThemeContext';

const AppContent = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<HomePage />} /> {/* Fallback to HomePage for unknown routes */}
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000); // Keep splash screen for 4 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <AnimatePresence>
        {loading && <SplashScreen onLoaded={() => setLoading(false)} websiteName="HACKERPRO'S TIKTOK VIDEO DOWNLOADER" />}
      </AnimatePresence>
      {!loading && (
        <Router>
          <AppContent />
        </Router>
      )}
      <Toaster />
    </ThemeProvider>
  );
};

export default App;
