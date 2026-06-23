'use client';

import { Chip, Stack, Typography, Box } from '@mui/material';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const ACCENT_COLORS = ['#8b5cf6', '#3b82f6', '#22d3ee', '#f59e0b', '#10b981'];

function hashColor(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  return ACCENT_COLORS[Math.abs(h) % ACCENT_COLORS.length];
}

export default function ProjectCard({ project }) {
  const accent = hashColor(project.title || '');

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-60, 60], [6, -6]);
  const rotateY = useTransform(mx, [-60, 60], [-6, 6]);

  function onMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 60);
    my.set(((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * 60);
  }

  function onMouseLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      whileHover={{ scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 280, damping: 24 }}
    >
      <Box
        component="a"
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          display: 'block',
          p: 3,
          height: '100%',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '14px',
          background: 'rgba(255,255,255,0.025)',
          backdropFilter: 'blur(12px)',
          textDecoration: 'none',
          color: 'inherit',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          transition: 'border-color 0.2s, box-shadow 0.2s',
          '&:hover': {
            borderColor: `${accent}55`,
            boxShadow: `0 0 32px ${accent}18, 0 8px 32px rgba(0,0,0,0.3)`,
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
            opacity: 0,
            transition: 'opacity 0.25s',
          },
          '&:hover::before': { opacity: 1 },
        }}
      >
        {/* Top-right arrow */}
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            width: 20,
            height: 20,
            opacity: 0.3,
            transition: 'opacity 0.2s',
            '.MuiBox-root:hover &': { opacity: 0.7 },
            svg: { display: 'block' },
          }}
        >
          <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 15L15 5M15 5H7M15 5V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Box>

        <Typography
          sx={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.68rem',
            color: accent,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            mb: 1.5,
          }}
        >
          {project.tags?.[0] ?? 'Project'}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 1,
            fontSize: '1.05rem',
            letterSpacing: '-0.01em',
            transform: 'translateZ(20px)',
          }}
        >
          {project.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2.5, lineHeight: 1.65, transform: 'translateZ(15px)' }}
        >
          {project.description}
        </Typography>

        {!!project.tags?.length && (
          <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.75, transform: 'translateZ(10px)' }}>
            {project.tags.map((t) => (
              <Chip
                key={t}
                label={t}
                size="small"
                variant="outlined"
                sx={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.68rem',
                  height: 24,
                  borderColor: 'rgba(255,255,255,0.1)',
                  color: 'text.secondary',
                }}
              />
            ))}
          </Stack>
        )}
      </Box>
    </motion.div>
  );
}
