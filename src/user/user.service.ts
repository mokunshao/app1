import { connection } from "../app/database/mysql";
import { UserModel } from "./user.model";

export const userService = {
  createUser: async (user: UserModel) => {
    const statement = `
      INSERT INTO user
      SET ?
    `;
    const [data] = await connection.promise().query(statement, user);
    return data;
  },
  getUserByName: async (name: String) => {
    const statement = `
      SELECT id, name
      FROM user
      WHERE name = ?
    `;
    const [data]: any = await connection.promise().query(statement, name);
    const user = data[0];
    return user;
  },
};
