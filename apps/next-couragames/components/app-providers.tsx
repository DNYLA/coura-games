import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { getSocketUrl } from '../utils';
import { io, Socket } from 'socket.io-client';
import SocketContext from '../context/socket';
import { UserContext } from '@couragames/ui';

export default function AppProviders({ children }: any) {
  const { user, login, logout, signup, updateUser, error, setError, loading } =
    useAuth();
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
  }, [socket]);

  if (loading) return <div>Loading2..</div>;
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
        updateUser: updateUser,
        resetAlert: () => setError({ show: false, message: '' }),
      }}
    >
      <SocketContext.Provider value={{ socket }}>
        {children}
      </SocketContext.Provider>
    </UserContext.Provider>
  );
}
