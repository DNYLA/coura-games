import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { UserContext } from '@couragames/ui';
import styled from '@emotion/styled';
import { MessageCentre } from '../components/message-centre';
import { AppProps } from 'next/app';
import { useContext, useEffect } from 'react';
import AppProviders from '../components/app-providers';
import Chat from '../components/Chat';
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
          <MessageCentre />
        </Container>
      </ChakraProvider>
    </AppProviders>
  );
}

const Container = styled.div`
  display: flex;
`;

export default CustomApp;
