import express from "express";
import { postController } from "./post.controller";
import { logRequestBody, logRequestURL } from "../app/app.middleware";

export const postRouter = express.Router();

postRouter.get("/posts", logRequestURL, postController.index);
postRouter.post("/posts", logRequestBody, postController.store);
