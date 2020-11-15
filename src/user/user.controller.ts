import { Request, Response, NextFunction } from "express";
import { UserModel } from "./user.model";
import { userService } from "./user.service";

export const userController = {
  store: async (request: Request, response: Response, next: NextFunction) => {
    const { name, password } = request.body;
    try {
      const data = await userService.createUser({ name, password });
      response.status(201).send(data);
    } catch (error) {
      next(error);
    }
  },
};
