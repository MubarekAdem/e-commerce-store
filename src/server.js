const express = require("express");
const mongoose = require("mongoose");
const next = require("next");
const cors = require("cors");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const server = express();
server.use(cors());
server.use(express.json());

mongoose.connect("your_mongodb_connection_string", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

server.all("*", (req, res) => {
  return handle(req, res);
});

app.prepare().then(() => {
  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("Server ready on http://localhost:3000");
  });
});
