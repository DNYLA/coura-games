import SocketContext from 'apps/next-couragames/context/socket';
import { ClientLobby, Games, LobbyEvents } from 'libs/shared-types/src';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import CreateLobby from 'apps/next-couragames/components/lobby/create-lobby';
import ActiveLobby from 'apps/next-couragames/components/lobby/lobby';

export interface HomeProps {
  redirect: string;
  game: Games;
  children: React.ReactNode;
}

export function Lobby({ redirect, game, children }: HomeProps) {
  const router = useRouter();
  const { lobby } = router.query;
  const [lobbyInfo, setLobbyInfo] = useState<ClientLobby>(null);
  const [errorMessage, setErrMessage] = useState(null);

  const socket = useContext(SocketContext).socket;

  const handleJoin = (code: string) => {
    socket.emit('lobby', { game: game, type: LobbyEvents.Join, id: code });
  };

  useEffect(() => {
    //Called when someone hosts a game
    socket?.on('lobby_info', (data) => {
      router.push(`?lobby=${data.id}`);
      console.log(data);
      setLobbyInfo({ ...data, isHost: true });
    });

    //Called when client attempts to connect
    socket?.on('join_lobby', (data) => {
      console.log(data);
      if (data.invalid) {
        setErrMessage(data.reason);
        // setTimeout(() => setErrMessage(null), 5000);
        setTimeout(() => {
          setErrMessage(null);
        }, 5000);
        router.push('');
      } else {
        setLobbyInfo({ ...data, isHost: false });
        router.push(`?lobby=${data.id}`);
      }
    });

    socket?.on('game_started', () => {
      setLobbyInfo({ ...lobbyInfo, started: true });
    });

    return () => {
      socket?.off('lobby_info');
      socket?.off('join_lobby');
      socket?.off('game_started');
    };
  }, [socket, router, lobbyInfo]);

  if (lobby) {
    if (typeof lobby !== 'string') {
      router.push(`/play/${redirect}/`);
    } else {
      if (lobbyInfo && lobbyInfo.started) {
        return <>{children}</>;
      } else if (lobbyInfo) {
        return (
          <ActiveLobby
            game={game}
            lobby={lobbyInfo}
            setLobby={setLobbyInfo}
            // settings={}
          />
        );
      } else {
        handleJoin(lobby);
      }
    }
  }

  //If !Lobby Render Create || Join Game.
  return (
    <CreateLobby game={game} onJoin={handleJoin} errorMessage={errorMessage} />
  );
}

export default Lobby;
