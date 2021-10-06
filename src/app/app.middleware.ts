import { Request, Response, NextFunction } from "express";

export const appMiddleware = {
  logRequestURL: (request: Request, response: Response, next: NextFunction) => {
    console.log(request.url);
    next();
  },
  logRequestData: (
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
  },
  defaultErrorHandler: (
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
      case "USER_ALREADY_EXIST":
        statusCode = 409;
        message = "用户名已被占用";
        break;
      case "USER_DOES_NOT_EXIST":
        statusCode = 400;
        message = "用户不存在";
        break;
      case "PASSWORD_DOES_NOT_MATCH":
        statusCode = 400;
        message = "密码不对";
        break;
      default:
        statusCode = 500;
        message = "服务暂时出了点问题 ~~ 🌴";
        break;
    }
    response.status(statusCode).send({ message });
  },
};
