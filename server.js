import express from "express";
import find from "local-devices";
// Without using a transpiler
import net from "net";

// server
const server = net
  .createServer(function (socket) {
    console.log("connected");

    socket.on("data", function (data) {
      console.log(data.toString());
    });
  })

  .listen(12345);

// Find all local network devices.
const getDevices = () => find();

const app = express();
const port = 3002;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/init", (req, res) => {
  const { query } = req;
  const { ip = "", comment = "" } = query;
  console.log({ ip, comment });
  io.emit("init_esp", {
    ip,
    comment,
  });
  res.send(`${ip},${comment}`);
});
