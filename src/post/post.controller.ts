import { Request, Response, NextFunction } from "express";
import { createPost, getPosts, updatePost } from "./post.service";

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
  update: async (request: Request, response: Response, next: NextFunction) => {
    const { postId } = request.params;
    const { title, content } = request.body;
    try {
      const data = await updatePost(parseInt(postId, 10), { title, content });
      response.send(data);
    } catch (error) {
      next(error);
    }
  },
};
