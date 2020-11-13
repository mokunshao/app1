import { Request, Response, NextFunction } from "express";
import { getPosts } from "./post.service";

export const postController = {
  index: (request: Request, response: Response, next: NextFunction) => {
    if (request.headers.authorization !== "TEST") {
      next(new Error("ok"));
      return;
    }
    const posts = getPosts();
    response.send(posts);
  },
};
