const http = require("http");
const expressApp = require("./http");

http
  .createServer(expressApp)
  .listen(3000, () => console.log(`server running at 3000 🚀`));
