'use client';

import { useEffect, useState } from 'react';
import { Container, Box } from '@mui/material';
import Navbar from '@/components/Navbar';
import SplashScreen from '@/components/SplashScreen';

export default function ClientLayout({ children }) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #000000 0%, #1a0033 100%)',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      {showSplash && (
        <SplashScreen
          src="/logo.png"
          width={900}
          height={260}
          fadeIn={1.2}
          hold={2.0}
          fadeOut={1.2}
        />
      )}

      <Box sx={{ pointerEvents: showSplash ? 'none' : 'auto' }}>
        <Navbar />
        <Container maxWidth="lg" sx={{ py: 6 }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
}