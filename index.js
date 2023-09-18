import express from "express";
import dotenv from "dotenv";
import { SocketIO } from "socket.io";

const io = new SocketIO.Server(expressApp);
const jwtMiddleware = (socket, next) => {
  const {token} = socket.handshake.query;
  // verify token
};

io.use(jwtMiddleware);

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('hello from server!')
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all(['/api/*', '/socket.io/*'], (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
  next();
})

app.get('/api/helloworld', (req, res) => {
  res.json({sayHi: `hello from server, nice to meet you ${process.env.NODE_ENV}!`})
})

io.on('connection', (socket) => {
  socket.on("sendDataClient", (data) => io.emit("sendDataServer", { data }));
  socket.on("disconnect", () => console.log("Client disconnected"));
});

app.listen(PORT, () => {
  console.log('Chat listening on port 5000')
})
