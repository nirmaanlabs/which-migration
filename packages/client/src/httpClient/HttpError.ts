// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

class HttpError extends Error {
  constructor(
    public readonly message,
    public readonly status,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public readonly body: any = null
  ) {
    super(message);
    Object.setPrototypeOf(this, HttpError.prototype);
    this.name = this.constructor.name;
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
    this.stack = new Error().stack;
  }
}

export default HttpError;
