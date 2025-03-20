// Without using a transpiler
import net from "net";
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 12346 });

net.createServer((socket) => {
  // Handle data from the TCP client
  socket.on("data", (data) => {
    socket.write("Hello from TCP server");
    wss.clients.forEach((ws) => {
      if (ws.readyState === ws.OPEN) {
        ws.send(data.toString()); // Send data to WebSocket client
      }
    });
  });

  // Handle errors
  socket.on("error", (err) => {
    console.error("TCP Client error:", err);
  });

  // Handle TCP client disconnecting
  socket.on("end", () => {
    console.log("TCP Client disconnected");
  });
});

// Handle WebSocket connections from React
wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    console.log("Received message from WebSocket:", message);
  });

  // Handle WebSocket disconnection
  ws.on("close", () => {
    console.log("WebSocket Client disconnected");
  });

  // Handle WebSocket errors
  ws.on("error", (err) => {
    console.error("WebSocket error:", err);
  });
});
