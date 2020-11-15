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
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error.message) {
    console.log("error.message", error.message);
  }

  let statusCode: number, message: string;
  switch (error.message) {
    default:
      statusCode = 500;
      message = "服务器暂时出了点问题";
      break;
  }
  response.status(statusCode).send({ message });
};