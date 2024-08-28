import { PgPool } from "@which-migration/pgops";
import express from "express";

interface DBContextRequest {
  pg?: PgPool;
}

export interface TypedRequestBody<T> extends express.Request {
  body: T;
  db?: DBContextRequest;
}
