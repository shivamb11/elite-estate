import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Prisma } from "@prisma/client";

import authRoutes from "./routes/auth.route";
import postRoutes from "./routes/post.route";
import userRoutes from "./routes/user.route";
import chatRoutes from "./routes/chat.route";
import messageRoutes from "./routes/message.route";
import AppError from "./AppError";
import { handlePrismaError } from "./customErrors";

const app = express();
const { CLIENT_URL, PORT = 8080 } = process.env;

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  const { status = 500, message } = err;

  console.log(err);

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const { status, message } = handlePrismaError(err);
    return res.status(status).send(message);
  }

  res.status(status).send(message);
});

app.listen(PORT, () => {
  console.log("LISTENING AT PORT ", +PORT);
});
