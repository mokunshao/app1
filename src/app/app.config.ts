import dotenv from "dotenv";

dotenv.config();

export const { APP_PORT = "" } = process.env;

export const {
  MYSQL_HOST = "",
  MYSQL_PORT = "",
  MYSQL_USER = "",
  MYSQL_PASSWORD = "",
  MYSQL_DATABASE = "",
} = process.env;
