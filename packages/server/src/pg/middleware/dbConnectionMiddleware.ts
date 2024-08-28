import { NextFunction, Request, Response } from "express";
import { DbKey, getConnection } from "../../dbInstances";
import { TypedRequestBody } from "../../types/TypedRequestBody";

export function dbConnectionMiddleware(
  req: TypedRequestBody<{}>,
  res: Response,
  next: NextFunction
) {
  // assuming baseUrl in this type /api/v1/mysql
  const segments = req.baseUrl.split("/");
  const dbType = segments[3] as DbKey;

  // Make this dynamic
  const dbConnection = getConnection(dbType);

  if (!dbConnection) {
    return res.status(400).json({
      status: "fail",
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
