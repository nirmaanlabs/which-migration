import { NextFunction, Response } from "express";
import { PgPool } from "@which-migration/pgops";
import { TypedRequestBody } from "../../../../types/TypedRequestBody";
import { ConnectionBody } from "./types";
import { dbInstance } from "../../../../dbInstances";
import { PG_DB_MSG, STATUS_MSG } from "../../../constants";
import { createToken } from "../../../../utils/createToken";
import { getRandomConnectionId } from "../../../../utils/getRandomConnectionId";

export const connect = async (
  req: TypedRequestBody<ConnectionBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    //Todo Before doing this add a middleware called is already connected in
    const {
      dbuser: user,
      database,
      dbpassword: password,
      host,
      port,
    } = req.body;
    const pool = new PgPool({ user, database, password, host, port });
    console.log(user, database, password, host, port);
    await pool.query("select 1");

    const token = createToken({ host, port, database, dbType: "pg" });
    const connectionId = getRandomConnectionId();
    dbInstance.setConnection(connectionId, { db: pool, token });
    res.status(200).json({
      status: STATUS_MSG.SUCCESS,
      message: PG_DB_MSG.CONNECTED,
      database,
      dbuser: user,
      connectionId,
      dbtoken: token,
    });
  } catch (error) {
    console.log("passing error to handler", error instanceof Error);
    next(error);
  }
};

export const selectOne = async (
  req: TypedRequestBody<object>,
  res: Response
) => {
  try {
    const connectionId = req.headers["X-WHMG-ConnectionId"] as string;
    const connection = dbInstance.getConnection(connectionId);
    if (connection) {
      const db = connection.db as PgPool;
      const dbRes = await db.query("select 1");
      res.status(200).json({
        status: STATUS_MSG.SUCCESS,
        message: "selectOne",
        data: dbRes?.rows,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      message: "someerror",
    });
  }
};

export const disconnect = async (
  req: TypedRequestBody<object>,
  res: Response,
  next: NextFunction
) => {
  try {
    const connectionId = req.headers["X-WHMG-ConnectionId"] as string;
    dbInstance.removeConnection(connectionId);
    res.status(200).json({
      status: STATUS_MSG.SUCCESS,
      message: PG_DB_MSG.DISCONNECTED,
    });
  } catch (error) {
    next(error);
  }
};
