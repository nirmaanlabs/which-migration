import { NextFunction, Response } from "express";
import { PgPool } from "@which-migration/pgops";
import { TypedRequestBody } from "../../../../types/TypedRequestBody";
import { ConnectionBody } from "./types";
import { setConnection } from "../../../../dbInstances";

export const establishConnection = async (
  req: TypedRequestBody<ConnectionBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    //Todo Before doing this add a middleware called is already connected in

    const { user, database, password, host, port } = req.body;
    const pool = new PgPool({ user, database, password, host, port });
    const dbRes = await pool.query("select 1");
    setConnection("pg", pool);
    res.status(200).json({
      status: "success",
      message: "Connected to database successfully !!!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const selectOne = async (
  req: TypedRequestBody<{}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const db = req.db?.pg;
    const dbRes = await db?.query("select 1");
    res.status(200).json({
      status: "success",
      message: "selectOne",
      dbRes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      message: "someerror",
    });
  }
};
