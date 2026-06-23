'use client';
import { useEffect, useRef } from 'react';

const PARTICLE_COLORS = [
  [139, 92, 246],  // violet
  [59, 130, 246],  // blue
  [34, 211, 238],  // cyan
];

// Constellation definitions — normalized [0,1] coords, with edge lists
const CONSTELLATIONS = [
  {
    // Big Dipper
    name: 'bigdipper',
    stars: [
      { x: 0.12, y: 0.18 },
      { x: 0.16, y: 0.14 },
      { x: 0.21, y: 0.13 },
      { x: 0.25, y: 0.16 },
      { x: 0.22, y: 0.22 },
      { x: 0.17, y: 0.24 },
      { x: 0.13, y: 0.23 },
    ],
    edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,0]],
    color: [139, 92, 246],
  },
  {
    // Orion (simplified)
    name: 'orion',
    stars: [
      { x: 0.70, y: 0.12 }, // left shoulder
      { x: 0.78, y: 0.10 }, // right shoulder
      { x: 0.72, y: 0.22 }, // belt left
      { x: 0.75, y: 0.22 }, // belt mid
      { x: 0.78, y: 0.22 }, // belt right
      { x: 0.71, y: 0.32 }, // left foot
      { x: 0.79, y: 0.30 }, // right foot
      { x: 0.745, y: 0.15 }, // head
    ],
    edges: [[0,2],[1,4],[2,3],[3,4],[0,1],[2,5],[4,6],[7,0],[7,1]],
    color: [34, 211, 238],
  },
  {
    // Cassiopeia (W shape)
    name: 'cassiopeia',
    stars: [
      { x: 0.55, y: 0.72 },
      { x: 0.60, y: 0.68 },
      { x: 0.65, y: 0.74 },
      { x: 0.70, y: 0.69 },
      { x: 0.75, y: 0.73 },
    ],
    edges: [[0,1],[1,2],[2,3],[3,4]],
    color: [59, 130, 246],
  },
  {
    // Southern Cross (Crux)
    name: 'crux',
    stars: [
      { x: 0.42, y: 0.50 }, // top
      { x: 0.42, y: 0.60 }, // bottom
      { x: 0.37, y: 0.55 }, // left
      { x: 0.47, y: 0.55 }, // right
    ],
    edges: [[0,1],[2,3]],
    color: [139, 92, 246],
  },
];

export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let mouse = { x: -9999, y: -9999 };
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });

    // Build constellation star positions (absolute px) with a slow drift offset
    const constellations = CONSTELLATIONS.map((c) => ({
      ...c,
      // random slow drift per constellation
      driftX: (Math.random() - 0.5) * 0.015,
      driftY: (Math.random() - 0.5) * 0.008,
      offsetX: 0,
      offsetY: 0,
    }));

    // Floating particles
    const COUNT = 55;
    const MAX_DIST = 150;
    const MOUSE_RADIUS = 110;

    const particles = Array.from({ length: COUNT }, () => {
      const c = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.4 + 0.4,
        c,
      };
    });

    const drawConstellation = (con) => {
      const w = canvas.width;
      const h = canvas.height;
      const [r, g, b] = con.color;

      // Compute absolute star positions
      const pts = con.stars.map((s) => ({
        x: s.x * w + con.offsetX,
        y: s.y * h + con.offsetY,
      }));

      // Draw edges
      con.edges.forEach(([a, b_]) => {
        const pa = pts[a], pb = pts[b_];
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.strokeStyle = `rgba(${r},${g},${b},0.18)`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      });

      // Draw stars with twinkle
      pts.forEach((p, i) => {
        const twinkle = 0.55 + 0.45 * Math.sin(t * 0.8 + i * 1.3 + con.stars[i].x * 10);
        const radius = 1.6 + 0.6 * twinkle;

        // Glow
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 5);
        grd.addColorStop(0, `rgba(${r},${g},${b},${0.25 * twinkle})`);
        grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${0.75 * twinkle + 0.25})`;
        ctx.fill();
      });

      // Slow drift
      con.offsetX += con.driftX;
      con.offsetY += con.driftY;
      // Gentle bounce at edges (keep within 10% margin)
      const margin = 0.1;
      if (con.offsetX > w * margin) con.driftX *= -1;
      if (con.offsetX < -w * margin) con.driftX *= -1;
      if (con.offsetY > h * margin) con.driftY *= -1;
      if (con.offsetY < -h * margin) con.driftY *= -1;
    };

    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Constellations (behind particles)
      constellations.forEach(drawConstellation);

      // Particle connections
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_DIST) {
            const a = (1 - d / MAX_DIST) * 0.1;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(120,100,220,${a})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Particles
      particles.forEach((p) => {
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - md) / MOUSE_RADIUS;
          p.vx += (mdx / md) * force * 0.07;
          p.vy += (mdy / md) * force * 0.07;
        }
        p.vx *= 0.99;
        p.vy *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const [r, g, b] = p.c;
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        grd.addColorStop(0, `rgba(${r},${g},${b},0.16)`);
        grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},0.7)`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
