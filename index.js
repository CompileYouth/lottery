import http from 'http';
import app from './lib/app';

const httpServer = http.createServer(app);
httpServer.listen(3000, () => {
  console.log('Server is running at 3000...');
});
