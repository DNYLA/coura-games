import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { AppProps } from 'next/app';
import AppProviders from '../components/app-providers';
import Chat from '../components/Chat';
import Chat2 from '../components/Chat2';
import Sidebar from '../components/sidebar';

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
        // bg: '#2c2c2c',
        // bg: '#2B2B2B',
        bg: '#313131',
      },
    }),
  },
  colors,
});

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <AppProviders>
      <ChakraProvider theme={config}>
        <Container>
          {/* <Navbar /> */}
          <Sidebar />
          <Component {...pageProps} />
          {/* <Chat /> */}
          <Chat2 />
        </Container>
      </ChakraProvider>
    </AppProviders>
  );
}

const Container = styled.div`
  display: flex;
`;

export default CustomApp;
