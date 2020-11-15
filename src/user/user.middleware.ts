import { NextFunction, Request, Response } from "express";
export const validateUserData = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log("验证用户数据");
  const { name, password } = request.body;
  if (!name) {
    next(new Error("NAME_IS_REQUIRED"));
  } else if (!password) {
    next(new Error("PASSWORD_IS_REQUIRED"));
  } else {
    next();
  }
};
