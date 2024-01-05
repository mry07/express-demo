import express from "express";
import * as Exception from "../exception";
import * as Controller from "../controller/auth";
import { validate } from "../middleware/validate";
import { loginSchema } from "../validation/auth";

const r = express.Router();

export const createAuthRoutes = async () => {
  r.route("/login")
    .post(validate(loginSchema), Controller.login)
    .all(Exception.methodNotAllowedHandler);

  return r;
};
