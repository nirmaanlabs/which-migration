import { PgPool } from "@which-migration/pgops";
import { NextFunction, Response, Request } from "express";

import { TypedRequestBody } from "@/types/TypedRequestBody";
import { dbInstance } from "@/dbInstances";
import { PG_DB_MSG, STATUS_MSG } from "@/pg/constants";
import { ProjectBody } from "./types";

export const createProject = async (
  req: TypedRequestBody<ProjectBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { connectionId, projectName } = req.body;
    const connection = dbInstance.getConnection(connectionId);

    if (!connection) {
      return res.status(400).json({
        status: STATUS_MSG.FAIL,
        message: PG_DB_MSG.FAILED_CONNECTION,
      });
    }

    const db = connection.db as PgPool;
    const sqlText = `CREATE TABLE $1(
          id UUID PRIMARY KEY NOT NULL,
          tag_name VARCHAR(255),
          object_name VARCHAR(255),
          object_type VARCHAR(100),
          object_operation_type VARCHAR(100),
          sql_query TEXT,  -- 'TEXT' can handle large SQL queries
          create_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          dbname VARCHAR(255)
        );`;

    const values = [`${projectName}_whmg_migrations`];
    const queryRes = await db.query(sqlText, values);

    if (queryRes) {
      res.status(200).json({
        status: STATUS_MSG.SUCCESS,
        data: queryRes.rows,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.params, req.query);
  } catch (error) {
    next(error);
  }
};
