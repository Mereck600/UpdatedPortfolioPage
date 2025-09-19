'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Fixed, behind-the-content background that fades an image in as you scroll.
 *
 * Props:
 *  - src   : image path under /public (e.g. "/bg.jpg")
 *  - start : scrollY (px) where image starts appearing
 *  - end   : scrollY (px) where image is fully visible
 *  - blur  : optional blur (px) to soften the image
 */
export default function ScrollFadeBackground({
  src = '/bg.jpg',
  start = 120,
  end = 600,
  blur = 0,
}) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [start, end], [0, 1], { clamp: true });
  const y = useTransform(scrollY, [start, end], [0, 20], { clamp: true }); // subtle parallax

  return (
    <motion.div
      aria-hidden
      style={{
        opacity,
        y,
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      {/* Fill the viewport with the image */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <Image
          src={src}
          alt=""
          fill
          sizes="100vw"
          priority
          style={{
            objectFit: 'cover',
            filter: blur ? `blur(${blur}px)` : 'none',
            transform: 'translateZ(0)', // hint for GPU
          }}
        />
      </div>

      {/* Optional dark vignette to preserve text contrast */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(1200px 600px at 50% -10%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.55) 100%)',
        }}
      />
    </motion.div>
  );
}
