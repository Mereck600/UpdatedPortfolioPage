'use client';

import { useEffect, useState } from 'react';
import { Container, Box } from '@mui/material';
import Navbar from '@/components/Navbar';
import SplashScreen from '@/components/SplashScreen';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function ClientLayout({ children }) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', background: '#04040f', position: 'relative' }}>
      <AnimatedBackground />

      {showSplash && (
        <SplashScreen
          src="/logo.png"
          width={900}
          height={260}
          fadeIn={0.5}
          hold={1.2}
          fadeOut={0.5}
        />
      )}

      <Box sx={{ position: 'relative', zIndex: 1, pointerEvents: showSplash ? 'none' : 'auto' }}>
        <Navbar />
        <Container maxWidth="lg" sx={{ py: 8 }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
}
