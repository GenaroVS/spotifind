import app = require('./app');
import { createServer } from 'http';
import connectSocket = require('./sockets');
const server = createServer(app);

connectSocket(server, { serveClient: false });

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log('server is working at ' + port);
});