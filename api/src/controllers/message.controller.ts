import { Response } from "express";

import prisma from "../lib/prisma";
import { catchAsync } from "../utils";
import { RequestWithUser } from "../RequestWithUser.types";

export const addMessage = catchAsync(
  async (req: RequestWithUser, res: Response) => {
    const { text } = req.body;
    const { id: chatId } = req.params;

    if (chatId === "null") {
      const { receiverId } = req.body;

      const newChat = await prisma.chat.create({
        data: {
          userIds: [req.user!, receiverId],
        },
      });

      const newMessage = await prisma.message.create({
        data: {
          userId: req.user!,
          text,
          chatId: newChat.id,
        },
      });

      await prisma.chat.update({
        where: {
          id: newChat.id,
        },
        data: {
          seenBy: {
            set: [req.user!],
          },
          lastMessage: text,
        },
      });

      res.status(200).send(newMessage);
    } else {
      const newMessage = await prisma.message.create({
        data: {
          userId: req.user!,
          text,
          chatId,
        },
      });

      await prisma.chat.update({
        where: {
          id: chatId,
        },
        data: {
          seenBy: {
            set: [req.user!],
          },
          lastMessage: text,
        },
      });

      res.status(200).send(newMessage);
    }
  }
);
