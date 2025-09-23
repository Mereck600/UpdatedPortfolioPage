'use client';

import { Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useMemo } from 'react';

function hashTitleToTilt(title) {
  // Simple deterministic hash → stable per title on server & client
  let h = 0;
  for (let i = 0; i < title.length; i++) {
    h = ((h << 5) - h + title.charCodeAt(i)) | 0;
  }
  const rand = (seed) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };
  const x = Math.round(rand(h) * 10 - 5);      // [-5, 5]
  const y = Math.round(rand(h + 1) * 10 - 5);  // [-5, 5]
  return { x, y };
}

export default function ProjectCard({ project }) {
  const tilt = useMemo(
    () => project.tilt ?? hashTitleToTilt(project.title || ''),
    [project.tilt, project.title]
  );

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [60, -60], [tilt.x, -tilt.x]);
  const rotateY = useTransform(x, [-60, 60], [-tilt.y, tilt.y]);

  function onMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left - rect.width / 2;
    const py = e.clientY - rect.top - rect.height / 2;
    x.set((px / (rect.width / 2)) * 60);
    y.set((py / (rect.height / 2)) * 60);
  }

  return (
    <motion.div
      onMouseMove={onMouseMove}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 250, damping: 22 }}
    >
      <Card sx={{ p: 2, height: '100%' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ transform: 'translateZ(30px)' }}>
            {project.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, transform: 'translateZ(25px)' }}>
            {project.description}
          </Typography>
          {!!project.tags?.length && (
            <Stack direction="row" spacing={1} sx={{ transform: 'translateZ(20px)', flexWrap: 'wrap' }}>
              {project.tags.map((t) => (
                <Chip key={t} label={t} size="small" variant="outlined" sx={{ borderColor: 'rgba(255,255,255,0.24)' }} />
              ))}
            </Stack>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
