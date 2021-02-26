import '../styles/global.css';

import { useState } from 'react';
import { CountdownContext, CountdownProvider } from '../contexts/CountdownContext';

function MyApp({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
  )
}

export default MyApp
