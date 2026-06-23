'use client';

import NextLink from 'next/link';
import { AppBar, Toolbar, Typography, Stack, Box } from '@mui/material';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/',         label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact',  label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ maxWidth: 1200, mx: 'auto', width: '100%', px: { xs: 2, sm: 3 } }}>

        <Typography
          component={NextLink}
          href="/"
          variant="subtitle1"
          sx={{
            color: 'text.primary',
            textDecoration: 'none',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            fontSize: '0.95rem',
            '& span': { color: 'var(--accent-purple)' },
          }}
        >
          Mereck<span> McGowan</span>
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" spacing={0.5}>
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Box
                key={l.href}
                component={NextLink}
                href={l.href}
                sx={{
                  px: 1.5,
                  py: 0.6,
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontWeight: active ? 500 : 400,
                  color: active ? 'text.primary' : 'text.secondary',
                  background: active ? 'rgba(139,92,246,0.12)' : 'transparent',
                  border: active ? '1px solid rgba(139,92,246,0.25)' : '1px solid transparent',
                  textDecoration: 'none',
                  transition: 'all 0.15s',
                  '&:hover': {
                    color: 'text.primary',
                    background: 'rgba(255,255,255,0.05)',
                  },
                }}
              >
                {l.label}
              </Box>
            );
          })}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
