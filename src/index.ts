import "dotenv/config";
import cors from "cors";
import express from "express";
import * as Path from "path";
import * as Exception from "./exception";
import { createRoutes } from "./routes";

const app = express();

export const main = async () => {
  // middleware
  app.use(express.json());
  app.use(cors());

  // route
  const routes = await createRoutes();
  app.use("/api", routes);
  app.use("/public", express.static(Path.join(process.cwd(), "public")));

  // error handler
  app.use(Exception.errorHandler);
  app.use(Exception.notFoundHandler);

  app.listen(process.env.PORT, () => {
    console.log(`Starting app listening on port ${process.env.PORT}`);
  });
};
