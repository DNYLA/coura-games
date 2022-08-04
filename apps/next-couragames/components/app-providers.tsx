import React, { useEffect, useState } from 'react';
import UserContext from '../context/auth';
import useAuth from '../hooks/useAuth';
import { getSocketUrl } from '../utils';
import { io, Socket } from 'socket.io-client';
import SocketContext from 'apps/next-couragames/context/socket';

export default function AppProviders({ children }: any) {
  const { user, login, logout, signup, error, setError } = useAuth();
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    if (socket) return;

    const sockConnection = io(getSocketUrl(), {
      transports: ['websocket'],
    });

    sockConnection.on('connect', () => {
      console.log('Socket Conected');
    });

    setSocket(sockConnection);
  }, []);

  return (
    <UserContext.Provider
      value={{
        isLoggedIn: !!user,
        user,
        login,
        logout,
        signup,
        alertMsg: error,
        setAlert: setError,
        resetAlert: () => setError({ show: false, message: '' }),
      }}
    >
      <SocketContext.Provider value={{ socket }}>
        {children}
      </SocketContext.Provider>
    </UserContext.Provider>
  );
}
