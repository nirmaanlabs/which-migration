import { PgPool } from "@which-migration/pgops";
import { NextFunction, Response } from "express";

import { TypedRequestBody } from "../../types/TypedRequestBody";
import { dbInstance } from "../../dbInstances";
import { PG_DB_MSG, STATUS_MSG } from "../constants";

export const isConnectedToDB = async (
  req: TypedRequestBody<object>,
  res: Response,
  next: NextFunction
) => {
  try {
    const connectionId = req.headers["X-WHMG-ConnectionId"] as string;
    const connection = dbInstance.getConnection(connectionId);
    if (connection) {
      const db = connection.db as PgPool;
      await db.query("select 1");
      res.status(200).json({
        status: STATUS_MSG.SUCCESS,
        message: PG_DB_MSG.CONNECTED,
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
