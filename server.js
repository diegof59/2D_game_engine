const express = require('express');

const server = express();

server.use(express.static(`${__dirname}`));

server.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`, (err) => {
    if (err) {
      console.log(err);
      res.end(err.message);
    }
  })
});

server.listen(3000, "localhost", () => {
  console.log("Server running on port 3000")
});
