import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import { Server } from "socket.io";
import routes from "./routes";
import { initSocket } from "./sockets/signaling";

const app = express();
const server = http.createServer(app);

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use("/api", routes);

const io = new Server(server, {
  cors: { origin: process.env.FRONTEND_URL }
});

initSocket(io);

server.listen(4000, () =>
  console.log("API running on port 4000")
);
