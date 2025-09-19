'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Props:
 *  - src: string path under /public (e.g. "/Splash.png")
 *  - fadeIn, hold, fadeOut: seconds
 *  - mode: "fixed" | "fill"  (choose how to size the image)
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
        {/* Fade in the image */}
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
              style={{ display: 'block' }}
            />
          )}
        </motion.div>

        {/* Fade to black overlay to transition out */}
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
