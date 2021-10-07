import { Request, Response, NextFunction } from "express";
import { postService } from "./post.service";
import { removeObjectUndefined } from "../utils/functions";

export const postController = {
  index: async (request: Request, response: Response, next: NextFunction) => {
    try {
      const posts = await postService.getPosts();
      response.send(posts);
    } catch (error) {
      next(error);
    }
  },
  store: async (request: Request, response: Response, next: NextFunction) => {
    const { title, content } = request.body;
    const { id: userId } = request.user;
    try {
      const data = await postService.createPost({ title, content, userId });
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
      const data = await postService.updatePost(postId2, post);
      response.send(data);
    } catch (error) {
      next(error);
    }
  },
  destroy: async (request: Request, response: Response, next: NextFunction) => {
    const { postId } = request.params;
    const postId2 = parseInt(postId, 10);
    try {
      const data = await postService.deletePost(postId2);
      response.send(data);
    } catch (error) {
      next(error);
    }
  },
};
