import { Router } from "express";
import {
  disconnect,
  establishConnection,
  selectOne,
} from "../../../controller/connection/v1/connectionController";
import {
  dbConnectionMiddleware,
  isConnectedToDB,
} from "../../../middleware/dbConnectionMiddleware";

export const pgRouter = Router();

pgRouter.use((req, res, next) => {
  if (req.path === "/connect") {
    return next(); // Skip middleware for /pg/connect
  }
  dbConnectionMiddleware(req, res, next);
});

pgRouter.route("/connect").post(isConnectedToDB, establishConnection);
pgRouter.route("/disconnect").post(disconnect);
pgRouter.route("/selectone").get(selectOne);
