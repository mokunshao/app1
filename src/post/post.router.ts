import express from "express";
import { postController } from "./post.controller";
import { appMiddleware } from "../app/app.middleware";

export const postRouter = express.Router();

postRouter.get("/posts", appMiddleware.logRequestURL, postController.index);
postRouter.post("/posts", appMiddleware.logRequestData, postController.store);
postRouter.patch(
  "/posts/:postId",
  appMiddleware.logRequestData,
  postController.update
);
postRouter.delete("/posts/:postId", postController.destroy);
