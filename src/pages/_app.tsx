import type { AppProps } from 'next/app';
import { MediaQueryProvider } from 'react-media-query-hoc';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MediaQueryProvider>
      <Component {...pageProps} />
    </MediaQueryProvider>
  );
}

export default MyApp;
