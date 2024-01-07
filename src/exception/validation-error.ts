type Details = {
  field: string;
  message: string;
};

class ValidationError extends Error {
  details: Details[];

  constructor(error: any) {
    super("message");

    const details: Details[] = [];

    for (const item of error.details) {
      details.push({
        field: item.context.key,
        message: item.message,
      });
    }

    Object.setPrototypeOf(this, new.target.prototype);

    this.details = details;

    Error.captureStackTrace(this);
  }
}

export default ValidationError;
