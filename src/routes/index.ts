import express from "express";
import ClientError from "../exception/client-error";
import * as Exception from "../exception";
import { HttpStatus } from "../../types";
import { createAuthRoutes } from "./auth";

const r = express.Router();

export const createRoutes = async () => {
  const auth = await createAuthRoutes();
  r.use("/auth", auth);

  r.route("/test")
    .get((_req, res) => {
      res.json({ message: "test" });
    })
    .post(() => {
      throw new ClientError(HttpStatus.BAD_REQUEST, "test");
    })
    .put(() => {
      throw new Error("test");
    })
    .all(Exception.methodNotAllowedHandler);

  return r;
};
