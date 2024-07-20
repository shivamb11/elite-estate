import express from "express";

import {
  addChat,
  getChatByChatId,
  getChatByUserIds,
  getChats,
  readChat,
} from "../controllers/chat.controller";
import { authorizeChatParticipant, verifyToken } from "../middlewares/auth";

const router = express.Router();

router.get("/", verifyToken, getChats);

router.get("/:id1/:id2", verifyToken, getChatByUserIds);

router.get("/:id", verifyToken, authorizeChatParticipant, getChatByChatId);

router.post("/", verifyToken, addChat);

router.patch("/:id", verifyToken, authorizeChatParticipant, readChat);

export default router;
