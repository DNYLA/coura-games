import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import styled from '@emotion/styled';
import AppProviders from 'apps/next-couragames/components/app-providers';
import Chat from 'apps/next-couragames/components/Chat';
import { Navbar } from 'apps/next-couragames/components/navbar';
import Sidebar from 'apps/next-couragames/components/sidebar';
import UserContext, {
  IUserContext,
  User,
} from 'apps/next-couragames/context/auth';
import useAuth from 'apps/next-couragames/hooks/useAuth';
import { GetServerSidePropsContext } from 'next';
// import { Navbar } from '@couragames/ui';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useState } from 'react';

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
    <AppProviders>
      <ChakraProvider theme={config}>
        <Container>
          {/* <Navbar /> */}
          <Sidebar />
          <Component {...pageProps} />
          <Chat />
        </Container>
      </ChakraProvider>
    </AppProviders>
  );
}

const Container = styled.div`
  display: flex;
`;

export default CustomApp;
