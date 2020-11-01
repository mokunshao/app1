import express, { Request, Response } from "express";
const app = express();

app.use(express.json());

app.get("/", (request: Request, response: Response) => {
  response.send("hello");
});

export default app;