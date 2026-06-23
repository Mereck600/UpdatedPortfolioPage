'use client';

import { Box, Typography, Stack, Grid } from '@mui/material';
import PdfViewer from '@/components/PDFViewer';

const socials = [
  {
    label: 'LinkedIn',
    handle: 'mereck-mcgowan',
    href: 'https://www.linkedin.com/in/mereck-mcgowan-3b68232b6/',
    color: '#3b82f6',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    handle: 'mereck600',
    href: 'https://github.com/mereck600',
    color: '#8b5cf6',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <Box component="section" sx={{ position: 'relative', zIndex: 1 }}>
      {/* Header */}
      <Box sx={{ mb: 8 }}>
        <Typography
          sx={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.72rem',
            color: 'var(--accent-purple)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            mb: 1.5,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            '&::before': {
              content: '""',
              display: 'inline-block',
              width: 24,
              height: 1,
              background: 'var(--accent-purple)',
              opacity: 0.6,
            },
          }}
        >
          Get In Touch
        </Typography>
        <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, mb: 2 }}>
          Contact
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 520 }}>
          The fastest way to reach me is through LinkedIn. If you are interested in building a website please reach out VIA linkedIn. You can also find my resume and
          github linked below.
        </Typography>
      </Box>

      {/* Social links */}
      <Grid container spacing={2} sx={{ mb: 10, maxWidth: 560 }}>
        {socials.map((s) => (
          <Grid item xs={12} sm={6} key={s.label}>
            <Box
              component="a"
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 2.5,
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '14px',
                background: 'rgba(255,255,255,0.02)',
                textDecoration: 'none',
                color: 'text.primary',
                transition: 'border-color 0.2s, background 0.2s, transform 0.15s',
                '&:hover': {
                  borderColor: `${s.color}55`,
                  background: `${s.color}0a`,
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <Box sx={{ color: s.color, flexShrink: 0 }}>{s.icon}</Box>
              <Box>
                <Typography variant="body1" fontWeight={600} sx={{ lineHeight: 1.2 }}>
                  {s.label}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.72rem',
                    color: 'text.secondary',
                    mt: 0.25,
                  }}
                >
                  @{s.handle}
                </Typography>
              </Box>
              <Box sx={{ ml: 'auto', opacity: 0.3 }}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M5 15L15 5M15 5H7M15 5V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Resume */}
      <Box>
        <Typography
          sx={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.72rem',
            color: 'var(--accent-cyan)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            mb: 3,
          }}
        >
          Resume
        </Typography>
        <Box
          sx={{
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '14px',
            overflow: 'hidden',
            mb: 10,
          }}
        >
          <PdfViewer src="/MereckMcGowanResume2026.pdf" title="Resume" />
        </Box>
      </Box>
    </Box>
  );
}
