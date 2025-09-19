'use client';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { useServerInsertedHTML } from 'next/navigation';
import { useState } from 'react';

export default function ThemeRegistry({ children }) {
  // Create a single cache for the whole app (stable across renders)
  const [cache] = useState(() => {
    const c = createCache({ key: 'mui', prepend: true });
    c.compat = true; // important for MUI + Emotion with App Router
    return c;
  });

  // Inject Emotion's critical CSS during SSR so markup matches on the client
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

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
