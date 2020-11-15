import express from "express";
import { userController } from "./user.controller";
import { userMiddleware } from "./user.middleware";

export const userRouter = express.Router();

userRouter.post(
  "/users",
  userMiddleware.validateUserData,
  userMiddleware.hashPassword,
  userController.store
);
