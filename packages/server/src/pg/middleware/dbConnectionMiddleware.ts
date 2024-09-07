import { PgPool } from "@which-migration/pgops";
import { NextFunction, Response } from "express";
import { getConnection } from "../../dbInstances";
import { TypedRequestBody } from "../../types/TypedRequestBody";
import { getDBTypeFromBaseUrl } from "../../utils/getDBTypeFromBaseUrl";
import { PG_DB_MSG, STATUS_MSG } from "../constants";

export function dbConnectionMiddleware(
  req: TypedRequestBody<object>,
  res: Response,
  next: NextFunction
) {
  // assuming baseUrl in this type /api/v1/mysql
  const dbType = getDBTypeFromBaseUrl(req.baseUrl);

  // Make this dynamic
  const dbConnection = getConnection(dbType);

  if (!dbConnection) {
    return res.status(400).json({
      status: STATUS_MSG.FAIL,
      message: "`No ${dbType} connection found. Please connect first.`)",
    });
  }

  if (req.db) {
    // @ts-expect-error ignore this as typescript is shit
    req.db[dbType] = dbConnection;
  } else {
    req.db = {};
    // @ts-expect-error ignore this as typescript is shit
    req.db[dbType] = dbConnection;
  }

  // Attach the connection to the request object
  next(); // Continue to the next middleware/route handler// Continue to the next middleware/route handler
}

export const isConnectedToDB = async (
  req: TypedRequestBody<object>,
  res: Response,
  next: NextFunction
) => {
  try {
    const dbType = getDBTypeFromBaseUrl(req.baseUrl);
    const db = getConnection(dbType);
    if (db instanceof PgPool) {
      console.log("already connected");
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
