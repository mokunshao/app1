import { Request, Response, NextFunction } from "express";
import { removeObjectUndefined } from "../utils/functions";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  createPostTag,
  postHasTag,
  deletePostTag,
} from "./post.service";
import { TagModel } from "../tag/tag.model";
import { getTagByName, createTag } from "../tag/tag.service";

export const index = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const posts = await getPosts();
    response.send(posts);
  } catch (error) {
    next(error);
  }
};

export const store = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { title, content } = request.body;
  const { id: userId } = request.user;
  try {
    const data = await createPost({ title, content, userId });
    response.status(201).send(data);
  } catch (error) {
    next(error);
  }
};

export const update = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
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
};

export const destroy = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { postId } = request.params;
  const postId2 = parseInt(postId, 10);
  try {
    const data = await deletePost(postId2);
    response.send(data);
  } catch (error) {
    next(error);
  }
};

/**
 * 添加内容标签
 */
export const storePostTag = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // 准备数据
  const { postId } = request.params;
  const { name } = request.body;

  let tag: TagModel;

  // 查找标签
  try {
    tag = await getTagByName(name);
  } catch (error) {
    return next(error);
  }

  // 找到标签，验证内容标签
  if (tag) {
    try {
      const postTag = await postHasTag(parseInt(postId, 10), tag.id);
      if (postTag) return next(new Error("POST_ALREADY_HAS_THIS_TAG"));
    } catch (error) {
      return next(error);
    }
  }

  // 没找到标签，创建这个标签
  if (!tag) {
    try {
      const data = await createTag({ name });
      tag = { id: data.insertId };
    } catch (error) {
      return next(error);
    }
  }

  // 给内容打上标签
  try {
    await createPostTag(parseInt(postId, 10), tag.id);
    response.sendStatus(201);
  } catch (error) {
    return next(error);
  }
};

/**
 * 移除内容标签
 */
export const destroyPostTag = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // 准备数据
  const { postId } = request.params;
  const { tagId } = request.body;

  // 移除内容标签
  try {
    await deletePostTag(parseInt(postId, 10), tagId);
    response.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
