import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1]; // Bearer <token>

      verify(token, "SECRET_KEY");
      next();
      // do something like attached connection id to req object
    } else {
      res.status(401).json({
        success: false,
        message: "Token is not provided",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
