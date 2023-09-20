import express from "express";
import connectDB from "./configs/db.js";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import 'dotenv/config';
import ChatRouter from "./routers/ChatRouter.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
      origin: "*",
  }
}); 
const PORT = 5000;

app.use(express.static("public"));
app.use(express.json({ extended: false }));
app.use(cors({ origin: true, credentials: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

connectDB();

app.use("/api", ChatRouter);

app.get("/", (req, res) => {
  res.json({ message: "Test" });
});

io.on('connection', (socket) => {
  socket.on("sendDataClient", (data) => io.emit("sendDataServer", { data }));
  socket.on("disconnect", () => console.log("Client disconnected"));
});

server.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});