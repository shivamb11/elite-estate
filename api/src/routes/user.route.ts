import express from "express";
import { authorizeUser, verifyToken } from "../middlewares/auth";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller";

const router = express.Router();

router.get("/", verifyToken, getUsers);

router.get("/:id", verifyToken, authorizeUser, getUser);

router.patch("/:id", verifyToken, authorizeUser, updateUser);

router.delete("/:id", verifyToken, authorizeUser, deleteUser);

export default router;
