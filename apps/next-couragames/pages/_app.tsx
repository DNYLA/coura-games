import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Navbar } from '@couragames/ui';
import { AppProps } from 'next/app';
import Head from 'next/head';

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};
const config = extendTheme({
  config: { initialColorMode: 'dark', useSystemColorMode: false },
  styles: {
    global: (props) => ({
      body: {
        bg: '#2c2c2c',
      },
    }),
  },
  colors,
});

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to next-couragames!</title>
      </Head>
      <main className="app">
        <ChakraProvider theme={config}>
          <Navbar />
          <Component {...pageProps} />
        </ChakraProvider>
      </main>
    </>
  );
}

export default CustomApp;
