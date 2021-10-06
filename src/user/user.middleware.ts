import { NextFunction, Request, Response } from "express";
import * as userService from "../user/user.service";
import bcrypt from "bcrypt";

export const userMiddleware = {
  validateUserData: async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    console.log("验证用户数据");
    const { name, password } = request.body;

    if (!name) {
      next(new Error("NAME_IS_REQUIRED"));
      return;
    } else if (!password) {
      next(new Error("PASSWORD_IS_REQUIRED"));
      return;
    }

    const user = await userService.getUserByName(name);
    if (user) {
      next(new Error("USER_ALREADY_EXIST"));
      return;
    }

    next();
  },
  hashPassword: async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const { password } = request.body;
    request.body.password = await bcrypt.hash(password, 10);
    next();
  },
};
