import { Request, Response, NextFunction } from "express";

export const postController = {
  index: (request: Request, response: Response, next: NextFunction) => {
    response.send("内容");
  },
};
