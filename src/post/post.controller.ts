import { Request, Response, NextFunction } from "express";
import { createPost, getPosts } from "./post.service";

export const postController = {
  index: async (request: Request, response: Response, next: NextFunction) => {
    try {
      const posts = await getPosts();
      response.send(posts);
    } catch (error) {
      next(error);
    }
  },
  store: async (request: Request, response: Response, next: NextFunction) => {
    const { title, content } = request.body;
    try {
      const data = await createPost({ title, content });
      response.status(201).send(data);
    } catch (error) {
      next(error);
    }
  },
};
