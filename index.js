import app from './lib/app';
import http from 'http';

const httpServer = http.createServer(app);
httpServer.listen(8080, () => {
  console.log('Server is running at 8080...');
});
