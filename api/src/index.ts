import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route";
import postRoutes from "./routes/post.route";
import userRoutes from "./routes/user.route";
import AppError from "./AppError";
import { verifyToken } from "./middlewares/auth";
import { RequestWithUser } from "./RequestWithUser.types";

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

app.use("/api", verifyToken, (req: RequestWithUser, res) => {
  console.log(req.user);
  res.send("hello");
});

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  const { status = 500, message } = err;

  res.status(status).send(message);
});

app.listen(PORT, () => {
  console.log("LISTENING AT PORT ", +PORT);
});
