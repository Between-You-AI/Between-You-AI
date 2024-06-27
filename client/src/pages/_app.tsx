import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app';
import ThemeRegistry from '@/components/theme-registry/ThemeRegistry.component';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeRegistry>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeRegistry>
  );
}

export default MyApp;
