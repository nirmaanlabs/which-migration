import { PgDBError } from "@which-migration/pgops";
import { Request, Response } from "express";
import { STATUS_MSG } from "../pg/constants";

export const errorHandler = (err: unknown, req: Request, res: Response) => {
  if (err instanceof PgDBError) {
    res.status(500).json({
      status: STATUS_MSG.FAIL,
      reason: "Postgres Database Error",
      errorCode: err.eCode,
      message: err.eMessage,
    });
  } else {
    res.status(500).json({
      status: STATUS_MSG.FAIL,
      reason: "Unknow",
      message: "Contact admin someting went wrong",
    });
  }
};
