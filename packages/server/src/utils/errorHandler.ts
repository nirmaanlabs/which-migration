import { NextFunction, Request, Response } from "express";
import { PgDBError, PgError } from "@which-migration/pgops";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.debug("Error Handler");

  if (err instanceof PgDBError) {
    res.status(500).json({
      status: "fail",
      reason: "Postgres Database Error",
      errorCode: err.eCode,
      message: err.eMessage,
    });
  } else {
    res.status(500).json({
      status: "fail",
      reason: "Unknow",
      message: "Contact admin someting went wrong",
    });
  }
};
