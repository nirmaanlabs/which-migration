import { NextFunction, Response } from "express";
import { TypedRequestBody } from "../../types/TypedRequestBody";
import { STATUS_MSG } from "../constants";

export const validateRequest = async (
  req: TypedRequestBody<object>,
  res: Response,
  next: NextFunction
) => {
  try {
    const connectionId = req.headers["X-WHMG-ConnectionId"];
    const authHeader = req.headers.authorization;

    if (!connectionId) {
      res.status(400).json({
        status: STATUS_MSG.FAIL,
        message: "Missing Header X-WHMG-ConnectionId",
      });
    }

    if (!authHeader) {
      res.status(400).json({
        status: STATUS_MSG.FAIL,
        message: "Missing Header authorization",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};
