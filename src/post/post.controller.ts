import { Request, Response, NextFunction } from "express";
import { getPosts } from "./post.service";

export const postController = {
  index: async (request: Request, response: Response, next: NextFunction) => {
    const posts = await getPosts();
    response.send(posts);
  },
};
