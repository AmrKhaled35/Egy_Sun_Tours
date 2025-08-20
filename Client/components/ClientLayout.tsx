"use client";
import { useState, useEffect } from 'react';
import SplashScreen from './SplashScreen';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  const [showSplash, setShowSplash] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <div className={showSplash ? 'hidden' : 'block'}>
        {children}
      </div>
    </>
  );
};

export default ClientLayout;