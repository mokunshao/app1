import express from "express";
import { postController } from "./post.controller";
import { logRequestData, logRequestURL } from "../app/app.middleware";

export const postRouter = express.Router();

postRouter.get("/posts", logRequestURL, postController.index);
postRouter.post("/posts", logRequestData, postController.store);
postRouter.patch("/posts/:postId", logRequestData, postController.update);
