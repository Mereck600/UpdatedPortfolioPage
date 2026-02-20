'use client';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { useServerInsertedHTML } from 'next/navigation';
import { useState } from 'react';

import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@/theme/theme'; // adjust if your theme file path differs

export default function ThemeRegistry({ children }) {
  const [cache] = useState(() => {
    const c = createCache({ key: 'mui', prepend: true });
    c.compat = true;
    return c;
  });

  useServerInsertedHTML(() => {
    const { inserted } = cache;
    const names = Object.keys(inserted);
    const css = names.map((n) => inserted[n]).join(' ');
    return (
      <style
        data-emotion={`${cache.key} ${names.join(' ')}`}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: css }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}