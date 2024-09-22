import { Router } from "express";
import {
  disconnect,
  connect,
  selectOne,
} from "../../../controller/dbauth/v1/dbauth";
import { validateRequest } from "../../../middleware/validateRequest";
import { isConnectedToDB } from "../../../middleware/isConnectedToDB";

const pgRouter: Router = Router();

// pgRouter.use((req, res, next) => {
//   if (req.path === "/connect") {
//     return next(); // Skip middleware for /pg/connect
//   }
// });

pgRouter.route("/connect").post(isConnectedToDB, connect);
pgRouter.use(validateRequest);
pgRouter.route("/disconnect").post(disconnect);
pgRouter.route("/selectone").get(selectOne);

export { pgRouter };
