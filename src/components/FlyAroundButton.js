'use client';
import { Tooltip, useMediaQuery } from '@mui/material';
import { Box } from '@mui/material';

export default function FlyAroundButton() {
  const isDesktop = useMediaQuery('(min-width:900px) and (pointer:fine)');

  const btn = (
    <Box
      component={isDesktop ? 'a' : 'span'}
      href={isDesktop ? '/game' : undefined}
      sx={{
        px: 3,
        py: 1.25,
        borderRadius: '10px',
        border: `1px solid ${isDesktop ? 'rgba(34,211,238,0.3)' : 'rgba(34,211,238,0.15)'}`,
        color: isDesktop ? 'var(--accent-cyan)' : 'rgba(34,211,238,0.4)',
        fontWeight: 500,
        fontSize: '0.9rem',
        textDecoration: 'none',
        background: isDesktop ? 'rgba(34,211,238,0.04)' : 'transparent',
        fontFamily: "'JetBrains Mono', monospace",
        cursor: isDesktop ? 'pointer' : 'not-allowed',
        display: 'inline-block',
        transition: 'border-color 0.15s, background 0.15s, transform 0.15s',
        ...(isDesktop && {
          '&:hover': {
            borderColor: 'rgba(34,211,238,0.6)',
            background: 'rgba(34,211,238,0.08)',
            transform: 'translateY(-1px)',
          },
        }),
      }}
    >
      🚀 fly around
    </Box>
  );

  if (!isDesktop) {
    return (
      <Tooltip
        title="Only available on desktop"
        placement="top"
        arrow
        slotProps={{
          tooltip: {
            sx: {
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.72rem',
              bgcolor: 'rgba(4,4,15,0.95)',
              border: '1px solid rgba(34,211,238,0.25)',
              color: 'var(--accent-cyan)',
            },
          },
          arrow: { sx: { color: 'rgba(4,4,15,0.95)' } },
        }}
      >
        <span>{btn}</span>
      </Tooltip>
    );
  }

  return btn;
}
