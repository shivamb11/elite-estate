import { Request, Response } from "express";
import bcrypt from "bcrypt";

import prisma from "../lib/prisma";
import { catchAsync } from "../utils";
import cloudinary from "../cloudinary";

export const getUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({ include: { avatar: true } });

  const usersWithoutPassword = users.map((user) => {
    return {
      id: user.id,
      username: user.username,
      fullname: user.fullname,
      email: user.email,
      avatar: {
        id: user.avatar?.id,
        filename: user.avatar?.filename,
        url: user.avatar?.url,
        public_id: user.avatar?.public_id,
      },
    };
  });

  res.status(200).send(usersWithoutPassword);
});

export const getUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      username: true,
      fullname: true,
      email: true,
      avatar: {
        select: {
          id: true,
          filename: true,
          url: true,
          public_id: true,
        },
      },
      posts: {
        select: {
          id: true,
          title: true,
          price: true,
          latitude: true,
          longitude: true,
          address: true,
          transaction: true,
          property: true,
          images: true,
          features: {
            select: {
              sizes: true,
            },
          },
        },
      },
      savedPosts: {
        select: {
          id: true,
          title: true,
          price: true,
          latitude: true,
          longitude: true,
          address: true,
          transaction: true,
          property: true,
          images: true,
          features: {
            select: {
              sizes: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    return res.status(200).send("User not found");
  }

  res.status(200).send(user);
});

export const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const { fullname, email, password, avatar } = req.body;

  let newPassword = null;
  if (password) {
    newPassword = await bcrypt.hash(password, 12);
  }

  if (avatar) {
    // Delete the previous one from cloudinary by first finding the avatar and then deleting it.
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        avatar: true,
      },
    });

    if (user?.avatar?.filename) {
      cloudinary.uploader
        .destroy(user.avatar.public_id, { invalidate: true })
        .then((result) => console.log(result));
    }
  }

  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      fullname,
      email,
      ...(newPassword && { password: newPassword }),
      ...(avatar && {
        avatar: {
          update: avatar,
        },
      }),
    },
    select: {
      id: true,
      username: true,
      fullname: true,
      email: true,
      avatar: {
        select: {
          id: true,
          filename: true,
          url: true,
          public_id: true,
        },
      },
    },
  });

  res.status(200).send(user);
});

export const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.user.delete({
    where: {
      id,
    },
  });

  res.status(200).send("User deleted successfully");
});
