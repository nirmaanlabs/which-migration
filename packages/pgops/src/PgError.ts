// Code 17 for normal errors
export class PgError extends Error {
  name: string;
  message: string;
  code: number;
  constructor(message: string, code: number, name: string) {
    super(message);
    this.message = message;
    this.code = code;
    this.name = name;
  }
}
