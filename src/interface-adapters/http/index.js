import http from 'http';
import expressApp from './express';

const PORT = process.env.PORT || 3000;

http.createServer(expressApp).listen(PORT, () => console.log(`server running at ${PORT} 🚀`));
