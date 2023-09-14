import express from "express";
import connectDB from "./configs/db.js";
import { createServer } from "http";
import { Server } from "socket.io";
import ChatRouter from "./routers/ChatRouter.js";

const app = express();
const httpServer = createServer();
const io = new Server(httpServer, {
	cors: {
		origin: "*",
	}
});
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", ChatRouter);

connectDB();

app.get("/", (request, response) => {
  response.send({ message: "Hello from an Express API!" });
});

app.post("/post", (req, res) => {
  console.log("Connected to React");
  res.redirect("/");
});

io.on('connection', (socket) => {
  socket.on("sendDataClient", (data) => io.emit("sendDataServer", { data }));
  socket.on("disconnect", () => console.log("Client disconnected"));
});

httpServer.listen(PORT, () => {
  console.log(process.env.PORT)
});
