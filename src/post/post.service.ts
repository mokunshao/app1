import { connection } from "../app/database/mysql";
import { PostModel } from "./post.model";

export const getPosts = async () => {
  const statement = `
    SELECT
      post.id,
      post.title,
      post.content,
      JSON_OBJECT(
        'id', user.id,
        'name', user.name
      ) as user
    FROM post
    LEFT JOIN user
    ON user.id = post.userId
  `;
  const [data] = await connection.promise().query(statement);
  return data;
};

export const createPost = async (post: PostModel) => {
  const statement = `
    INSERT INTO post
    SET ?
  `;

  const [data] = await connection.promise().query(statement, post);
  return data;
};

export const updatePost = async (postId: number, post: PostModel) => {
  const statement = `
    UPDATE post
    SET ?
    WHERE id = ?
  `;

  const [data] = await connection.promise().query(statement, [post, postId]);
  return data;
};

export const deletePost = async (postId: number) => {
  const statement = `
    DELETE FROM post
    WHERE id = ?
  `;

  const [data] = await connection.promise().query(statement, postId);
  return data;
};

/**
 * 保存内容标签
 */
export const createPostTag = async (postId: number, tagId: number) => {
  // 准备查询
  const statement = `
    INSERT INTO post_tag (postId, tagId)
    VALUES(?, ?)
  `;

  // 执行查询
  const [data] = await connection.promise().query(statement, [postId, tagId]);

  // 提供数据
  return data;
};

/**
 * 检查内容标签
 */
export const postHasTag = async (postId: number, tagId: number) => {
  // 准备查询
  const statement = `
    SELECT * FROM post_tag
    WHERE postId=? AND tagId=?
  `;

  // 执行查询
  const [data] = await connection.promise().query(statement, [postId, tagId]);

  // 提供数据
  return data[0] ? true : false;
};

/**
 * 移除内容标签
 */
export const deletePostTag = async (postId: number, tagId: number) => {
  // 准备查询
  const statement = `
    DELETE FROM post_tag
    WHERE postId = ? AND tagId = ?
  `;

  // 执行查询
  const [data] = await connection.promise().query(statement, [postId, tagId]);

  // 提供数据
  return data;
};
