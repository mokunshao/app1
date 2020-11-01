import express, { Request, Response } from "express";
const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log("服务已启动");
});

app.get("/", (request: Request, response: Response) => {
  response.send("hello");
});
