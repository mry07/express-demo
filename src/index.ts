import "dotenv/config";
import cors from "cors";
import Express from "express";
import * as Path from "path";
import * as Exception from "./exception";

const app = Express();

export const main = async () => {
  // middleware
  app.use(Express.json());
  app.use(cors());

  // route
  app.use("/public", Express.static(Path.join(process.cwd(), "public")));

  // error handler
  app.use(Exception.errorHandler);
  app.use(Exception.notFoundHandler);

  app.listen(process.env.PORT, () => {
    console.log(`Starting app listening on port ${process.env.PORT}`);
  });
};
