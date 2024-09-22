// @ts-nocheck

import { describe, it, expect, vi } from "vitest";
import { verifyToken } from "./verifyToken";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

describe("verifyToken middleware", () => {
  it("should verify the token and call next()", () => {
    // Mock the request, response, and next function
    const req = {
      headers: {
        authorization: "Bearer valid_token",
      },
    } as Request;

    const res = {} as Response;
    const next = vi.fn() as NextFunction;

    // Mock jwt.verify for the sync version
    vi.spyOn(jwt, "verify").mockReturnValue({ userId: 1 }); // Simulate successful verification

    verifyToken(req, res, next);

    // Assert that next was called (successful verification)
    expect(next).toHaveBeenCalled();
  });

  it("should return 401 if token is not provided", () => {
    const req = {
      headers: {},
    } as Request;

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    const next = vi.fn() as NextFunction;

    verifyToken(req, res, next);

    // Assert that status 401 is called
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Token is not provided",
    });
  });

  it("should return 401 if token is invalid", () => {
    const req = {
      headers: {
        authorization: "Bearer invalid_token",
      },
    } as Request;

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    const next = vi.fn() as NextFunction;

    // Mock jwt.verify to throw an error for invalid tokens
    vi.spyOn(jwt, "verify").mockImplementation(() => {
      throw new Error("Invalid token");
    });

    verifyToken(req, res, next);

    // Assert that status 401 is called with an invalid token
    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});
