import { describe, it, expect, vi } from "vitest";
import { errorHandler } from "./errorHandler";
import { Request, Response, NextFunction } from "express";
import { DatabaseError } from "@which-migration/pgops";
import { STATUS_MSG } from "../pg/constants";

describe("errorHandler middleware", () => {
  it("should handle DatabaseError correctly", () => {
    const req = {} as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    const next = vi.fn() as NextFunction;
    const dbError = new DatabaseError("Database connection failed", 4, "error");

    errorHandler(dbError, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: STATUS_MSG.FAIL,
      reason: "Postgres Database Error",
      errorCode: dbError.code,
      message: dbError.message,
    });
  });

  it("should handle generic Error correctly", () => {
    const req = {} as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    const next = vi.fn() as NextFunction;
    const genericError = new Error("An error occurred");

    errorHandler(genericError, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: STATUS_MSG.FAIL,
      reason: "Error",
      message: genericError.message,
    });
  });

  it("should handle unknown error types correctly", () => {
    const req = {} as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    const next = vi.fn() as NextFunction;
    const unknownError = {} as unknown;

    errorHandler(unknownError, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: STATUS_MSG.FAIL,
      reason: "Unknown",
      message: "Contact admin someting went wrong",
    });
  });
});
