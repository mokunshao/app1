import { connection } from "../app/database/mysql";

export const getPosts = async () => {
  const statement = `
    SELECT
      post.id1,
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
