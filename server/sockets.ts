import { Server, Socket, ServerOptions } from 'socket.io';
import { Server as httpServer } from 'http';

/* Here are some ideas to improve the application:
Add private messaging.
*/

interface OktaMiddleWareUser {
  sub: string;
  name: string;
  local: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  zoneinfo: string;
  updated_at: number;
}

interface connectError {
  req: any,
  code: number,
  message: string,
  context: any
}

const connectSockets = (server: httpServer, serverOptions: Partial<ServerOptions> = {}) => {
  const io = new Server(server, serverOptions);
  let guestCount = 0;

  io.on('connection', (socket: Socket) => {

    socket.onAny((event, ...args) => {
      console.log(event, args);
    });

    socket.on('add user', (user: OktaMiddleWareUser | boolean) => {
      let msg = '';
      if (typeof user === 'boolean') {
        socket.data.user = `Guest ${guestCount}`;
        guestCount += 1;
        msg = `${socket.data.user} has connected`;
      } else {
        socket.data.user = user.name;
        msg = `${user.name} has connected`
      }

      io.emit('message', {
        label: false,
        msg: msg
      });
    });

    socket.on('disconnect', () => {
      io.emit('message', {
        label: false,
        msg: `${socket.data.user} has disconnected`
      });
    });

    socket.on('message', msg => {
      socket.broadcast.emit('message', {
        label: socket.data.user,
        msg: msg
      });
    })

    socket.on('typing', isTyping => {
      socket.broadcast.emit('typing', {
        id: socket.id,
        user: socket.data.user,
        isTyping
      });
    })
  });

  io.engine.on('connection_error', (err: connectError) => {
    console.log(err.req);
    console.log(err.code);
    console.log(err.message);
    console.log(err.context);
  });
}

export = connectSockets

