import { HttpStatus } from "../../types";

class DevelopmentError extends Error {
  status: HttpStatus;
  details: string;

  constructor(status: HttpStatus, details: string) {
    super("an error for developers");

    Object.setPrototypeOf(this, new.target.prototype);

    this.status = status;
    this.details = details;

    Error.captureStackTrace(this);
  }
}

export default DevelopmentError;
