import http from 'http';
import app from './lib/app';

const httpServer = http.createServer(app);
httpServer.listen(8080, () => {
  console.log('Server is running at 8080...');
});
