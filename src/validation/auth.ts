import Joi from "joi";
import { LoginRequest } from "../model/web/auth";

export const loginSchema = Joi.object<LoginRequest, true, LoginRequest>({
  email: Joi.string().required().email().messages({
    "any.required": "Email is required",
    "string.empty": "Email cannot be empty",
    "string.email": "Email is invalid",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
    "string.empty": "Password cannot be empty",
  }),
});
