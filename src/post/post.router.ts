import express from "express";
import * as postController from "./post.controller";
import { appMiddleware } from "../app/app.middleware";
import { authGuard, accessControl } from "../auth/auth.middleware";

const router = express.Router();

router.get("/posts", appMiddleware.logRequestURL, postController.index);
router.post("/posts", authGuard, postController.store);
router.patch(
  "/posts/:postId",
  authGuard,
  accessControl({ possession: true }),
  postController.update
);
router.delete(
  "/posts/:postId",
  authGuard,
  accessControl({ possession: true }),
  postController.destroy
);

/**
 * 添加内容标签
 */
router.post(
  "/posts/:postId/tag",
  authGuard,
  accessControl({ possession: true }),
  postController.storePostTag
);

/**
 * 移除内容标签
 */
router.delete(
  "/posts/:postId/tag",
  authGuard,
  accessControl({ possession: true }),
  postController.destroyPostTag
);

export default router;
