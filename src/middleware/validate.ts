import Joi from "joi";
import ValidationError from "../exception/validation-error";
import { RequestHandler } from "express";

type ValidateMiddleware = (schema: Joi.AnySchema) => RequestHandler;

export const validate: ValidateMiddleware =
  (schema) => async (req, _res, next) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      const validationError = new ValidationError(error);
      next(validationError);
    }
  };
