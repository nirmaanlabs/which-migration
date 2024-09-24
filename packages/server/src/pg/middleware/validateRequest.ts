import { NextFunction, Response } from "express";
import { TypedRequestBody } from "../../types/TypedRequestBody";
import { STATUS_MSG } from "../constants";

export const validateRequest = async (
  req: TypedRequestBody<object>,
  res: Response,
  next: NextFunction
) => {
  try {
    const connectionId = req.headers["x-whmg-connectionid"];
    const authHeader = req.headers.authorization;

    if (!connectionId) {
      return res.status(400).json({
        status: STATUS_MSG.FAIL,
        message: "Missing Header X-WHMG-ConnectionId",
      });
    }

    if (!authHeader) {
      return res.status(400).json({
        status: STATUS_MSG.FAIL,
        message: "Missing Header authorization",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};
