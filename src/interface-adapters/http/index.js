import http from 'http';
import expressApp from './express';

http
  .createServer(expressApp)
  .listen(process.env.PORT || 3000, () => console.log(`server running at ${process.env.PORT} 🚀`));
