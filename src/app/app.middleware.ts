import { Request, Response, NextFunction } from "express";

export const logRequestURL = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log(request.url);
  next();
};

export const logRequestData = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log({
    url: request.url,
    body: request.body,
    query: request.query,
    params: request.params,
  });
  next();
};

export const defaultErrorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log("defaultErrorHandler");
  if (error.message) {
    console.log("error.message", error.message);
  }

  let statusCode: number, message: string;
  switch (error.message) {
    case "NAME_IS_REQUIRED":
      statusCode = 400;
      message = "请提供用户名";
      break;
    case "PASSWORD_IS_REQUIRED":
      statusCode = 400;
      message = "请提供用户密码";
      break;
    case "USER_ALREADY_REQUIRED":
      statusCode = 409;
      message = "用户名已经被占用";
      break;
    default:
      statusCode = 500;
      message = "服务器暂时出了点问题";
      break;
  }
  response.status(statusCode).send({ message });
};
