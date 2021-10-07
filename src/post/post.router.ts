import express from "express";
import { postController } from "./post.controller";
import { appMiddleware } from "../app/app.middleware";
import { authGuard, accessControl } from "../auth/auth.middleware";

export const postRouter = express.Router();

postRouter.get("/posts", appMiddleware.logRequestURL, postController.index);
postRouter.post("/posts", authGuard, postController.store);
postRouter.patch(
  "/posts/:postId",
  authGuard,
  accessControl({ possession: true }),
  postController.update
);
postRouter.delete(
  "/posts/:postId",
  authGuard,
  accessControl({ possession: true }),
  postController.destroy
);
