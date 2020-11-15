import express from "express";
import { userController } from "./user.controller";
import { validateUserData } from "./user.middleware";

export const userRouter = express.Router();

userRouter.post("/users", validateUserData, userController.store);
