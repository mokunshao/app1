import express from "express";
import { postRouter } from "../post/post.router";
import { defaultErrorHandler } from "../app/app.middleware";
import { userRouter } from "../user/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(postRouter, userRouter);

app.use(defaultErrorHandler);

export default app;
