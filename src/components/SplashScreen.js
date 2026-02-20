'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
/**
 * Props:
 *  - src: string path under /public (e.g. "/logo.png" or "logo.png")
 *  - fadeIn, hold, fadeOut: seconds
 *  - mode: "fixed" | "fill"
 *  - width, height: used only when mode === "fixed"
 */
export default function SplashScreen({
  src = '/logo.png',
  fadeIn = 1.2,
  hold = 3.6,
  fadeOut = 1.0,
  mode = 'fixed',
  width = 900,
  height = 260,
}) {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const hasSeen = localStorage.getItem('hasSeenSplash');

    if (!hasSeen) {
      setShow(true);

      // mark as seen so we never show again
      localStorage.setItem('hasSeenSplash', 'true');
    }
  }, []);

  useEffect(() => {
    if (!show) return;

    const totalTime = (fadeIn + hold + fadeOut) * 1000;

    const timer = setTimeout(() => {
      setShow(false);
    }, totalTime);

    return () => clearTimeout(timer);
  }, [show, fadeIn, hold, fadeOut]);

  if (!mounted || !show) return null;

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1300,
          display: 'grid',
          placeItems: 'center',
          background: '#000',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: fadeIn, ease: 'easeInOut' }}
        >
          {mode === 'fill' ? (
            <div style={{ position: 'relative', width: '80vw', height: '40vh' }}>
              <Image
                src={src}
                alt="Splash"
                fill
                sizes="80vw"
                priority
                style={{ objectFit: 'contain' }}
              />
            </div>
          ) : (
            <Image
              src={src}
              alt="Splash"
              width={width}
              height={height}
              priority
            />
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: fadeIn + hold, duration: fadeOut }}
          style={{ position: 'absolute', inset: 0, background: '#000' }}
        />
      </div>
    </AnimatePresence>
  );
}