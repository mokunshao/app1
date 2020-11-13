import app from "./app";
import { APP_PORT } from "./app/app.config";
import { connection } from "./app/database/mysql";

app.listen(APP_PORT, () => {
  console.log("服务已启动");
});

connection.connect((err) => {
  if (err) {
    console.log("连接数据库失败", err.message);
  } else {
    console.log("连接数据库成功");
  }
});
