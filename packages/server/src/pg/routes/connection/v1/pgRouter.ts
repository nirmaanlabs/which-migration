import { Router } from "express";
import {
  establishConnection,
  selectOne,
} from "../../../controller/connection/v1/connectionController";
import { dbConnectionMiddleware } from "../../../middleware/dbConnectionMiddleware";

export const pgRouter = Router();

pgRouter.use((req, res, next) => {
  console.log("ERunnigs");
  if (req.path === "/connect") {
    return next(); // Skip middleware for /pg/connect
  }
  dbConnectionMiddleware(req, res, next);
});

pgRouter.route("/connect").post(establishConnection);

pgRouter.route("/selectone").get(selectOne);
