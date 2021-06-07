import { Server, Socket } from 'socket.io';
import { Server as httpServer } from 'http';

interface connectError {
  req: Express.Request,
  code: number,
  message: string,
  context: any
}

const connectSockets = (server: httpServer) => {
  const io = new Server(server, { serveClient: false });

  io.on('connection', (socket: Socket) => {
    io.emit('has connected', true);
    socket.on('disconnect', () => {
      io.emit('has disconnected', true)
    });

    socket.on('chat message', msg => {
      io.emit('chat message', msg);
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

