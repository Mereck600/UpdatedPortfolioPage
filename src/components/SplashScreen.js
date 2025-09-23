'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Ensure the path starts with a single leading slash
function ensureLeadingSlash(path) {
  if (!path) return '/';
  return path.startsWith('/') ? path : `/${path}`;
}

// Prefix with the repo base path in production (set in next.config.mjs)
function withBasePrefix(path) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  // avoid double-prefixing if already includes the base
  if (base && path.startsWith(base + '/')) return path;
  return `${base}${path}`;
}

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
  const normalized = ensureLeadingSlash(src);
  const finalSrc = withBasePrefix(normalized);

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
                src={finalSrc}
                alt="Splash"
                fill
                sizes="80vw"
                priority
                style={{ objectFit: 'contain' }}
              />
            </div>
          ) : (
            <Image
              src={finalSrc}
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
