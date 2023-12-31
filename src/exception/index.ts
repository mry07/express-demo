import ClientError from "./client-error";
import { ErrorHandler, ErrorHttpHandler, HttpStatus } from "../../types";

export const errorHandler: ErrorHandler = (err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({
      error: "client",
      message: err.message,
    });
    return;
  }

  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    error: "server",
    details: err.message,
  });
};

export const notFoundHandler: ErrorHttpHandler = (req, res, next) => {
  res.status(HttpStatus.NOT_FOUND).json({
    error: "not found",
  });
};

export const methodNotAllowedHandler: ErrorHttpHandler = (req, res, next) => {
  res.status(HttpStatus.METHOD_NOT_ALLOWED).json({
    error: "method not allowed",
  });
};