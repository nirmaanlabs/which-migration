import { STATUS_MSG } from "@/pg/constants";
import { NextFunction, Request, Response } from "express";
import { ContextRunner } from "express-validator";

export const validator = (validations: ContextRunner[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // sequential processing, stops running validations chain if one fails.
    for (const validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        return res.status(400).json({
          status: STATUS_MSG.FAIL,
          message: "Validation Failed",
          errors: result.array(),
        });
      }
    }

    next();
  };
};
