import { Request, Response, NextFunction } from "express";

export const logRequestURL = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log(request.url);
  next();
};
