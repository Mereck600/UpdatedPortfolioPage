'use client';
import { useEffect, useRef, useState } from 'react';

export default function SpaceshipCursor() {
  const cursorRef = useRef(null);
  const canvasRef = useRef(null);
  const pos = useRef({ x: -200, y: -200 });
  const prev = useRef({ x: -200, y: -200 });
  const angle = useRef(-90);
  const particles = useRef([]);
  const rafId = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    const tick = () => {
      const el = cursorRef.current;

      // ── Ship position & rotation ──────────────────────────────────────
      const dx = pos.current.x - prev.current.x;
      const dy = pos.current.y - prev.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (speed > 0.5) {
        const target = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        let diff = target - angle.current;
        while (diff > 180) diff -= 360;
        while (diff < -180) diff += 360;
        angle.current += diff * 0.18;
      }

      if (el) {
        el.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) rotate(${angle.current}deg)`;
      }

      // ── Spawn trail particles from engine nozzle ──────────────────────
      const rad = (angle.current - 90) * (Math.PI / 180);
      // Engine is ~14px behind the ship center (bottom of ship SVG)
      const engineX = pos.current.x - Math.cos(rad) * 14;
      const engineY = pos.current.y - Math.sin(rad) * 14;

      const count = speed > 1 ? 3 : 1;
      for (let i = 0; i < count; i++) {
        const spread = (Math.random() - 0.5) * 0.4;
        const backAngle = rad + Math.PI + spread;
        const spd = 0.6 + Math.random() * 1.2;
        particles.current.push({
          x: engineX + (Math.random() - 0.5) * 3,
          y: engineY + (Math.random() - 0.5) * 3,
          vx: Math.cos(backAngle) * spd,
          vy: Math.sin(backAngle) * spd,
          life: 1,
          decay: 0.03 + Math.random() * 0.03,
          r: 1.5 + Math.random() * 1.5,
          // Alternate purple / cyan glow
          color: Math.random() > 0.5 ? [139, 92, 246] : [34, 211, 238],
        });
      }

      // ── Draw trail ────────────────────────────────────────────────────
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current = particles.current.filter((p) => p.life > 0);

      particles.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.95;
        p.vy *= 0.95;
        p.life -= p.decay;
        p.r *= 0.97;

        const [r, g, b] = p.color;
        const a = Math.max(0, p.life);

        // Glow
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        grd.addColorStop(0, `rgba(${r},${g},${b},${a * 0.4})`);
        grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${a * 0.9})`;
        ctx.fill();
      });

      prev.current = { x: pos.current.x, y: pos.current.y };
      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      {/* Trail canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 9998,
        }}
      />

      {/* Ship SVG */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 0,
          height: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.2s',
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          style={{ position: 'absolute', top: -16, left: -16 }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="16" cy="26" rx="4" ry="3" fill="rgba(139,92,246,0.35)" />
          <ellipse cx="16" cy="27" rx="2.5" ry="2" fill="rgba(34,211,238,0.5)" />
          <path d="M16 3 L21 20 L16 17 L11 20 Z" fill="#e2e8f0" stroke="rgba(139,92,246,0.8)" strokeWidth="0.8" />
          <path d="M11 20 L5 24 L10 18 Z" fill="#94a3b8" stroke="rgba(59,130,246,0.6)" strokeWidth="0.6" />
          <path d="M21 20 L27 24 L22 18 Z" fill="#94a3b8" stroke="rgba(59,130,246,0.6)" strokeWidth="0.6" />
          <ellipse cx="16" cy="11" rx="2.5" ry="3.5" fill="rgba(34,211,238,0.7)" />
        </svg>
      </div>
    </>
  );
}
