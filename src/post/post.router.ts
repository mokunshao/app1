import express from "express";
import { postController } from "./post.controller";

export const postRouter = express.Router();

postRouter.get("/posts", postController.index);
