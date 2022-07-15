const http = require("http");

http
  .createServer(async (req, res) => {
    if (req.url === "/") {
      return res.end("Smooth Squid");
    }

    if (req.url !== "/move") {
      return res.end();
    }

    const chunks = [];

    for await (const chunk of req) {
      chunks.push(chunk);
    }

    const { board } = JSON.parse(Buffer.concat(chunks).toString());

    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        if (board[x][y] === "empty") {
          return res.end(JSON.stringify({ move: { x, y } }));
        }
      }
    }

    res.end();
  })
  .listen(4321);
