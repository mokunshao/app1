import express from 'express';
const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log("服务已启动");
});

app.get("/", (req, res) => {
  res.send("hello");
});
