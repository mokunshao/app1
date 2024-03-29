import express from "express";
import postRouter from "../post/post.router";
import { appMiddleware } from "../app/app.middleware";
import { userRouter } from "../user/user.router";
import authRouter from "../auth/auth.router";
import fileRouter from "../file/file.router";
import tagRouter from "../tag/tag.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(postRouter, userRouter, authRouter, fileRouter, tagRouter);

app.use(appMiddleware.defaultErrorHandler);

export default app;
