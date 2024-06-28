import * as React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import type { AppProps } from 'next/app'
import ThemeRegistry from '@/components/theme-registry/ThemeRegistry.component'
import { Provider } from '@/utils/Providers'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeRegistry>
      <CssBaseline />
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </ThemeRegistry>
  )
}

export default MyApp
