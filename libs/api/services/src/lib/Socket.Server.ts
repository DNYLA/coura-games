import { SocketData } from '@couragames/shared-types';
import { Server } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export class SocketIO {
  static server: Server<
    DefaultEventsMap,
    DefaultEventsMap,
    DefaultEventsMap,
    SocketData
  >;

  static initialiseServer(httpServer: any, url: string) {
    this.server = new Server<
      DefaultEventsMap,
      DefaultEventsMap,
      DefaultEventsMap,
      SocketData
    >(httpServer, {
      cors: { origin: [url], credentials: true },
    });
  }
}
