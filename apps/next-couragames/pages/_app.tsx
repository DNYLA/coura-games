import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  ChakraProvider,
} from '@chakra-ui/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to next-couragames!</title>
      </Head>
      <main className="app">
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </main>
    </>
  );
}

export default CustomApp;
