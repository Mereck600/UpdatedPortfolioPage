'use client';

import { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import Navbar from '@/components/Navbar';
import SplashScreen from '@/components/SplashScreen';

export default function ClientLayout({ children }) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 5000); 
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {showSplash && 
        <SplashScreen
            src="/logo.png"   
            width={900}
            height={260}
            fadeIn={1.2}        
            hold={2.0}          
            fadeOut={1.2}       
            />

      }
      <div style={{ pointerEvents: showSplash ? 'none' : 'auto' }}>
        <Navbar />
        <Container maxWidth="lg" sx={{ py: 6 }}>
          {children}
        </Container>
      </div>
    </>
  );
}
