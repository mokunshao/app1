import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
export const validateUserData = async (
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
    next(new Error("USER_ALREADY_REQUIRED"));
    return;
  }

  next();
};
