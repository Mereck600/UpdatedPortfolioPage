'use client';
import { useEffect, useRef, useState } from 'react';
import { Box, Typography, Chip, Stack } from '@mui/material';
import NextLink from 'next/link';

const PROJECTS = [
  { title: 'Reinforcement911', description: 'Nonprofit platform with Stripe donations, Dockerized deploys, and AWS infrastructure.', href: 'https://reinforcement911.org', tags: ['Next.js', 'Stripe', 'AWS'] },
  { title: 'Northland Psychological', description: 'Full-stack clinic website with appointment booking and AWS hosting.', href: 'https://northlandpsychological.com/', tags: ['Next.js', 'Docker', 'AWS'] },
  { title: 'Reinforcement Consulting', description: 'Consulting firm website with React frontend and cloud infrastructure.', href: 'https://reinforcement911.org', tags: ['React.js', 'Docker', 'AWS'] },
  { title: 'BluetoothPi', description: 'Raspberry Pi 5 speaker controller with real-time LED effects and React dashboard.', href: 'https://github.com/Mereck600/BluetoothPi', tags: ['React', 'FastAPI', 'Pi'] },
  { title: 'DelphiShell', description: 'C-based Unix shell with a trainable Transformer neural network built-in.', href: 'https://github.com/Mereck600/DelphiShell', tags: ['C', 'Python', 'ML'] },
  { title: 'Evala', description: 'Java programming language that auto-generates test cases and grades code.', href: 'https://github.com/Mereck600/Evala', tags: ['Java', 'Compilers'] },
  { title: 'Mereckos', description: 'Hobby OS with FAT12 filesystem, bootloader, and memory management.', href: 'https://github.com/Mereck600/MereckOS', tags: ['x86 ASM', 'C'] },
  { title: 'FleetPay Audit', description: 'ETL pipeline and analytics for logistics fleet auditing at Mohawk Industries.', href: 'https://github.com/mereck600', tags: ['Python', 'PostgreSQL'] },
];

function randomBetween(a, b) { return a + Math.random() * (b - a); }
function wrap(v, max) { return ((v % max) + max) % max; }

export default function GamePage() {
  const canvasRef = useRef(null);
  const stateRef = useRef(null);
  const [popup, setPopup] = useState(null);   // { project, x, y }
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [dead, setDead] = useState(false);
  const [hint, setHint] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let W = window.innerWidth, H = window.innerHeight;
    let animId;

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // ── Stars ─────────────────────────────────────────────────────────────
    const STARS = Array.from({ length: 180 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.2 + 0.2,
      a: Math.random() * 0.7 + 0.2,
    }));

    // ── Ship ──────────────────────────────────────────────────────────────
    const ship = {
      x: W / 2, y: H / 2,
      vx: 0, vy: 0,
      angle: -Math.PI / 2,   // pointing up
      thrusting: false,
      invincible: 0,          // frames of invincibility after hit
    };

    // ── Bullets ───────────────────────────────────────────────────────────
    let bullets = [];
    let bulletCooldown = 0;

    // ── Asteroids ─────────────────────────────────────────────────────────
    function titleToSize(title) {
      // Measure the widest word at the canvas font size, add padding
      ctx.font = 'bold 11px Inter, system-ui, sans-serif';
      const words = title.split(' ');
      const maxWordW = Math.max(...words.map(w => ctx.measureText(w).width));
      // Size = half the widest word + padding, clamped to a sensible range
      return Math.max(44, Math.min(82, maxWordW + 32));
    }

    function makeAsteroid(project, x, y, size) {
      if (size === undefined) size = titleToSize(project.title);
      const angle = randomBetween(0, Math.PI * 2);
      const speed = randomBetween(0.3, 0.9);
      const verts = 9 + Math.floor(Math.random() * 5);
      const offsets = Array.from({ length: verts }, () => randomBetween(0.75, 1.15));
      return {
        project, x, y, size,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        rot: 0,
        rotSpeed: randomBetween(-0.008, 0.008),
        verts, offsets,
        hp: 1,
      };
    }

    function spawnAsteroids() {
      return PROJECTS.map((p, i) => {
        // Spread them around edges initially
        const angle = (i / PROJECTS.length) * Math.PI * 2;
        const r = Math.min(W, H) * 0.38;
        return makeAsteroid(p, W / 2 + Math.cos(angle) * r, H / 2 + Math.sin(angle) * r);
      });
    }

    let asteroids = spawnAsteroids();

    // ── Explosions ────────────────────────────────────────────────────────
    let explosions = [];
    function addExplosion(x, y, color = [139, 92, 246]) {
      for (let i = 0; i < 18; i++) {
        const a = randomBetween(0, Math.PI * 2);
        const spd = randomBetween(0.5, 3.5);
        explosions.push({ x, y, vx: Math.cos(a) * spd, vy: Math.sin(a) * spd, life: 1, decay: randomBetween(0.02, 0.05), r: randomBetween(1, 3), color });
      }
    }

    // ── Keys ──────────────────────────────────────────────────────────────
    const keys = {};
    const onKey = (e) => { keys[e.code] = e.type === 'keydown'; };
    window.addEventListener('keydown', onKey);
    window.addEventListener('keyup', onKey);

    // ── Draw helpers ──────────────────────────────────────────────────────
    function drawShip(s) {
      if (s.invincible > 0 && Math.floor(s.invincible / 4) % 2 === 0) return;
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.angle + Math.PI / 2);

      // Engine glow
      if (s.thrusting) {
        const grd = ctx.createRadialGradient(0, 14, 0, 0, 14, 16);
        grd.addColorStop(0, 'rgba(34,211,238,0.8)');
        grd.addColorStop(1, 'rgba(139,92,246,0)');
        ctx.beginPath(); ctx.arc(0, 14, 16, 0, Math.PI * 2);
        ctx.fillStyle = grd; ctx.fill();
      }

      ctx.strokeStyle = 'rgba(139,92,246,0.9)';
      ctx.fillStyle = '#e2e8f0';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(0, -13); ctx.lineTo(8, 8); ctx.lineTo(0, 4); ctx.lineTo(-8, 8); ctx.closePath();
      ctx.fill(); ctx.stroke();

      // Wings
      ctx.fillStyle = '#94a3b8';
      ctx.strokeStyle = 'rgba(59,130,246,0.7)';
      ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.moveTo(-8, 8); ctx.lineTo(-14, 13); ctx.lineTo(-6, 4); ctx.closePath();
      ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(8, 8); ctx.lineTo(14, 13); ctx.lineTo(6, 4); ctx.closePath();
      ctx.fill(); ctx.stroke();

      // Cockpit
      ctx.fillStyle = 'rgba(34,211,238,0.75)';
      ctx.beginPath(); ctx.ellipse(0, -4, 2.5, 4, 0, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }

    function drawAsteroid(a) {
      ctx.save();
      ctx.translate(a.x, a.y);
      ctx.rotate(a.rot);

      // Rocky outline
      ctx.beginPath();
      for (let i = 0; i < a.verts; i++) {
        const ang = (i / a.verts) * Math.PI * 2;
        const r = a.size * a.offsets[i];
        const x = Math.cos(ang) * r, y = Math.sin(ang) * r;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = 'rgba(30,25,50,0.85)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(139,92,246,0.45)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Project name
      ctx.rotate(-a.rot);
      ctx.fillStyle = '#e2e8f0';
      ctx.font = 'bold 11px Inter, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const words = a.project.title.split(' ');
      words.forEach((w, i) => {
        ctx.fillText(w, 0, (i - (words.length - 1) / 2) * 14);
      });
      ctx.restore();
    }

    function drawExplosions() {
      explosions = explosions.filter(p => p.life > 0);
      explosions.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        p.vx *= 0.93; p.vy *= 0.93;
        p.life -= p.decay;
        const [r, g, b] = p.color;
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
        grd.addColorStop(0, `rgba(${r},${g},${b},${p.life * 0.9})`);
        grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = grd; ctx.fill();
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${p.life})`;
        ctx.fill();
      });
    }

    // ── Game loop ─────────────────────────────────────────────────────────
    const loop = () => {
      ctx.clearRect(0, 0, W, H);

      // Background
      ctx.fillStyle = '#04040f';
      ctx.fillRect(0, 0, W, H);
      STARS.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.a})`;
        ctx.fill();
      });

      if (!stateRef.current?.dead) {
        // ── Input ──────────────────────────────────────────────────────
        const rotSpeed = 0.048;
        if (keys['ArrowLeft']  || keys['KeyA']) ship.angle -= rotSpeed;
        if (keys['ArrowRight'] || keys['KeyD']) ship.angle += rotSpeed;

        ship.thrusting = keys['ArrowUp'] || keys['KeyW'];
        if (ship.thrusting) {
          ship.vx += Math.cos(ship.angle) * 0.18;
          ship.vy += Math.sin(ship.angle) * 0.18;
        }

        // Drag
        ship.vx *= 0.985; ship.vy *= 0.985;
        // Cap speed
        const spd = Math.sqrt(ship.vx * ship.vx + ship.vy * ship.vy);
        if (spd > 7) { ship.vx = ship.vx / spd * 7; ship.vy = ship.vy / spd * 7; }

        ship.x = wrap(ship.x + ship.vx, W);
        ship.y = wrap(ship.y + ship.vy, H);
        if (ship.invincible > 0) ship.invincible--;

        // ── Shoot ─────────────────────────────────────────────────────
        if ((keys['Space'] || keys['ShiftLeft']) && bulletCooldown <= 0) {
          bullets.push({
            x: ship.x + Math.cos(ship.angle) * 14,
            y: ship.y + Math.sin(ship.angle) * 14,
            vx: Math.cos(ship.angle) * 9 + ship.vx,
            vy: Math.sin(ship.angle) * 9 + ship.vy,
            life: 55,
          });
          bulletCooldown = 12;
        }
        if (bulletCooldown > 0) bulletCooldown--;

        // ── Update bullets ─────────────────────────────────────────────
        bullets = bullets.filter(b => b.life-- > 0);
        bullets.forEach(b => {
          b.x = wrap(b.x + b.vx, W);
          b.y = wrap(b.y + b.vy, H);
        });

        // ── Update asteroids ───────────────────────────────────────────
        asteroids.forEach(a => {
          a.x = wrap(a.x + a.vx, W);
          a.y = wrap(a.y + a.vy, H);
          a.rot += a.rotSpeed;
        });

        // ── Asteroid ↔ Asteroid collisions ────────────────────────────
        for (let i = 0; i < asteroids.length; i++) {
          for (let j = i + 1; j < asteroids.length; j++) {
            const a = asteroids[i], b = asteroids[j];
            const dx = b.x - a.x, dy = b.y - a.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const minDist = a.size + b.size;
            if (dist < minDist && dist > 0) {
              // Collision normal
              const nx = dx / dist, ny = dy / dist;
              // Separate them so they don't overlap
              const overlap = (minDist - dist) / 2;
              a.x -= nx * overlap; a.y -= ny * overlap;
              b.x += nx * overlap; b.y += ny * overlap;
              // Elastic velocity exchange along the normal
              const dvx = b.vx - a.vx, dvy = b.vy - a.vy;
              const dot = dvx * nx + dvy * ny;
              if (dot < 0) {
                // Only resolve if approaching
                const impulse = dot * 0.95; // slight energy loss
                a.vx += impulse * nx; a.vy += impulse * ny;
                b.vx -= impulse * nx; b.vy -= impulse * ny;
                // Spin them a bit on impact
                a.rotSpeed += (Math.random() - 0.5) * 0.006;
                b.rotSpeed += (Math.random() - 0.5) * 0.006;
              }
            }
          }
        }

        // ── Bullet ↔ Asteroid collisions ───────────────────────────────
        bullets = bullets.filter(b => {
          for (let i = asteroids.length - 1; i >= 0; i--) {
            const a = asteroids[i];
            const dx = b.x - a.x, dy = b.y - a.y;
            if (Math.sqrt(dx * dx + dy * dy) < a.size * 0.85) {
              addExplosion(a.x, a.y, [139, 92, 246]);
              setPopup({ project: a.project, x: Math.min(a.x, W - 340), y: Math.min(a.y, H - 240) });
              setScore(s => s + 100);
              asteroids.splice(i, 1);
              // Respawn after delay
              setTimeout(() => {
                const edge = Math.floor(Math.random() * 4);
                let rx, ry;
                if (edge === 0) { rx = Math.random() * W; ry = -60; }
                else if (edge === 1) { rx = W + 60; ry = Math.random() * H; }
                else if (edge === 2) { rx = Math.random() * W; ry = H + 60; }
                else { rx = -60; ry = Math.random() * H; }
                asteroids.push(makeAsteroid(a.project, rx, ry));
              }, 8000);
              return false;
            }
          }
          return true;
        });

        // ── Ship ↔ Asteroid collision ──────────────────────────────────
        for (const a of asteroids) {
          const dx = ship.x - a.x, dy = ship.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = a.size * 0.85 + 10;
          if (dist < minDist && dist > 0) {
            // Always push the ship out — regardless of invincibility
            const nx = dx / dist, ny = dy / dist;
            const overlap = minDist - dist;
            ship.x += nx * overlap;
            ship.y += ny * overlap;
            // Reflect ship velocity along the normal (bouncy)
            const dot = ship.vx * nx + ship.vy * ny;
            if (dot < 0) {
              ship.vx -= 1.6 * dot * nx;
              ship.vy -= 1.6 * dot * ny;
              // Speed cap after bounce
              const spd = Math.sqrt(ship.vx * ship.vx + ship.vy * ship.vy);
              if (spd > 7) { ship.vx = ship.vx / spd * 7; ship.vy = ship.vy / spd * 7; }
            }
            // Only deal damage when not invincible
            if (ship.invincible === 0) {
              addExplosion(ship.x, ship.y, [34, 211, 238]);
              ship.invincible = 120;
              setLives(l => {
                const nl = l - 1;
                if (nl <= 0) { stateRef.current = { dead: true }; setDead(true); }
                return nl;
              });
              break;
            }
          }
        }
      }

      // ── Draw ──────────────────────────────────────────────────────────
      drawExplosions();
      asteroids.forEach(drawAsteroid);

      // Bullets
      bullets.forEach(b => {
        const grd = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, 5);
        grd.addColorStop(0, 'rgba(34,211,238,0.95)');
        grd.addColorStop(1, 'rgba(34,211,238,0)');
        ctx.beginPath(); ctx.arc(b.x, b.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = grd; ctx.fill();
        ctx.beginPath(); ctx.arc(b.x, b.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#fff'; ctx.fill();
      });

      drawShip(ship);
      animId = requestAnimationFrame(loop);
    };

    stateRef.current = { dead: false };
    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('keyup', onKey);
    };
  }, []);

  return (
    <Box sx={{ position: 'fixed', inset: 0, bgcolor: '#04040f', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ display: 'block' }} />

      {/* HUD */}
      <Box sx={{ position: 'absolute', top: 20, left: 24, userSelect: 'none' }}>
        <Typography sx={{ fontFamily: 'monospace', color: 'var(--accent-cyan)', fontSize: '0.8rem', letterSpacing: '0.12em' }}>
          SCORE: {score}
        </Typography>
        <Stack direction="row" spacing={0.5} mt={0.5}>
          {Array.from({ length: Math.max(0, lives) }).map((_, i) => (
            <Box key={i} sx={{ width: 14, height: 14 }}>
              <svg viewBox="0 0 32 32" width="14" height="14">
                <path d="M16 3 L21 20 L16 17 L11 20 Z" fill="#e2e8f0" />
              </svg>
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Back button */}
      <Box
        component={NextLink}
        href="/"
        sx={{
          position: 'absolute', top: 20, right: 24,
          px: 2, py: 0.75,
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '8px',
          background: 'rgba(4,4,15,0.7)',
          backdropFilter: 'blur(8px)',
          color: 'text.secondary',
          fontSize: '0.8rem',
          textDecoration: 'none',
          fontFamily: 'monospace',
          letterSpacing: '0.1em',
          transition: 'color 0.15s, border-color 0.15s',
          '&:hover': { color: 'text.primary', borderColor: 'rgba(139,92,246,0.4)' },
        }}
      >
        ← EXIT
      </Box>

      {/* Controls hint */}
      {hint && (
        <Box
          onClick={() => setHint(false)}
          sx={{
            position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
            px: 3, py: 1.5,
            background: 'rgba(4,4,15,0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '12px',
            textAlign: 'center',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <Typography sx={{ fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--accent-cyan)', letterSpacing: '0.08em' }}>
            WASD / ↑←↓→ to fly &nbsp;·&nbsp; SPACE to shoot &nbsp;·&nbsp; blast asteroids to explore projects
          </Typography>
          <Typography sx={{ fontFamily: 'monospace', fontSize: '0.65rem', color: 'text.secondary', mt: 0.5 }}>
            click to dismiss
          </Typography>
        </Box>
      )}

      {/* Project popup */}
      {popup && (
        <Box
          sx={{
            position: 'absolute',
            left: Math.max(12, Math.min(popup.x - 160, window.innerWidth - 360)),
            top: Math.max(12, Math.min(popup.y - 80, window.innerHeight - 260)),
            width: 320,
            p: 2.5,
            background: 'rgba(4,4,15,0.95)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(139,92,246,0.4)',
            borderRadius: '14px',
            boxShadow: '0 0 32px rgba(139,92,246,0.2)',
            zIndex: 10,
          }}
        >
          <Typography sx={{ fontFamily: 'monospace', fontSize: '0.65rem', color: 'var(--accent-purple)', letterSpacing: '0.15em', mb: 0.75 }}>
            {'// PROJECT UNLOCKED'}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.75, fontSize: '1rem' }}>
            {popup.project.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, lineHeight: 1.6 }}>
            {popup.project.description}
          </Typography>
          <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
            {popup.project.tags.map(t => (
              <Chip key={t} label={t} size="small" variant="outlined"
                sx={{ fontFamily: 'monospace', fontSize: '0.65rem', height: 22, borderColor: 'rgba(255,255,255,0.1)', color: 'text.secondary' }} />
            ))}
          </Stack>
          <Stack direction="row" spacing={1}>
            <Box
              component="a" href={popup.project.href} target="_blank" rel="noopener noreferrer"
              sx={{
                px: 2, py: 0.75, borderRadius: '8px',
                background: 'linear-gradient(135deg,#8b5cf6,#6d28d9)',
                color: '#fff', fontSize: '0.8rem', fontWeight: 600,
                textDecoration: 'none',
                '&:hover': { opacity: 0.85 },
              }}
            >
              View Project ↗
            </Box>
            <Box
              onClick={() => setPopup(null)}
              sx={{
                px: 2, py: 0.75, borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'text.secondary', fontSize: '0.8rem',
                cursor: 'pointer',
                '&:hover': { borderColor: 'rgba(255,255,255,0.25)', color: 'text.primary' },
              }}
            >
              Close
            </Box>
          </Stack>
        </Box>
      )}

      {/* Game over */}
      {dead && (
        <Box sx={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: 'rgba(4,4,15,0.85)', backdropFilter: 'blur(8px)',
        }}>
          <Typography variant="h3" sx={{ fontFamily: 'monospace', color: 'var(--accent-purple)', mb: 1 }}>
            GAME OVER
          </Typography>
          <Typography sx={{ fontFamily: 'monospace', color: 'var(--accent-cyan)', mb: 4, fontSize: '1rem' }}>
            SCORE: {score}
          </Typography>
          <Stack direction="row" spacing={2}>
            <Box
              onClick={() => window.location.reload()}
              sx={{
                px: 3, py: 1.25, borderRadius: '10px',
                background: 'linear-gradient(135deg,#8b5cf6,#6d28d9)',
                color: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem',
                '&:hover': { opacity: 0.85 },
              }}
            >
              Play Again
            </Box>
            <Box
              component={NextLink} href="/"
              sx={{
                px: 3, py: 1.25, borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'text.primary', fontSize: '0.9rem', textDecoration: 'none',
                '&:hover': { borderColor: 'rgba(139,92,246,0.4)' },
              }}
            >
              Back to Portfolio
            </Box>
          </Stack>
        </Box>
      )}
    </Box>
  );
}
