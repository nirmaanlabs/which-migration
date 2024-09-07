import { DatabaseError } from "@which-migration/pgops";
import { NextFunction, Request, Response } from "express";
import { STATUS_MSG } from "../pg/constants";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  console.log("--------reached error handler---------");
  if (err instanceof DatabaseError) {
    res.status(500).json({
      status: STATUS_MSG.FAIL,
      reason: "Postgres Database Error",
      errorCode: err.code,
      message: err.message,
    });
  } else if (err instanceof Error) {
    res.status(500).json({
      status: STATUS_MSG.FAIL,
      reason: "Postgres Database Error",
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: STATUS_MSG.FAIL,
      reason: "Unknown",
      message: "Contact admin someting went wrong",
    });
  }
};
