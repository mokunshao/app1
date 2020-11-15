import { Request, Response, NextFunction } from "express";
import { createPost, deletePost, getPosts, updatePost } from "./post.service";
import { removeObjectUndefined } from "../utils/functions";

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
    const postId2 = parseInt(postId, 10);
    const post = { title, content };
    removeObjectUndefined(post);
    try {
      const data = await updatePost(postId2, post);
      response.send(data);
    } catch (error) {
      next(error);
    }
  },
  destroy: async (request: Request, response: Response, next: NextFunction) => {
    const { postId } = request.params;
    const postId2 = parseInt(postId, 10);
    try {
      const data = await deletePost(postId2);
      response.send(data);
    } catch (error) {
      next(error);
    }
  },
};
