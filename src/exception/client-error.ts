import { HttpStatus } from "../../types";

class ClientError extends Error {
  status: HttpStatus;

  constructor(status: HttpStatus, message: string) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.status = status;

    Error.captureStackTrace(this);
  }
}

export default ClientError;
