import { describe, it, expect, vi, beforeEach } from "vitest";
import { validateRequest } from "./validateRequest"; // Adjust the path as needed
import { Response, NextFunction } from "express";
import { STATUS_MSG } from "../constants";

describe("validateRequest middleware", () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  it("should call next if both headers are present", async () => {
    const req = {
      headers: {
        "x-whmg-connectionid": "mocked_connection_id",
        authorization: "Bearer token",
      },
    } as any; // Adjust type as needed

    const res = {} as Response;
    const next = vi.fn() as NextFunction;

    await validateRequest(req, res, next);

    expect(next).toHaveBeenCalled(); // Check that next was called
  });

  it("should return 400 if connectionId header is missing", async () => {
    const req = {
      headers: {
        authorization: "Bearer token",
      },
    } as any;

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    const next = vi.fn() as NextFunction;

    await validateRequest(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400); // Check status
    expect(res.json).toHaveBeenCalledWith({
      status: STATUS_MSG.FAIL,
      message: "Missing Header X-WHMG-ConnectionId",
    }); // Check response message
  });

  it("should return 400 if authorization header is missing", async () => {
    const req = {
      headers: {
        "x-whmg-connectionid": "mocked_connection_id",
      },
    } as any;

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    const next = vi.fn() as NextFunction;

    await validateRequest(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400); // Check status
    expect(res.json).toHaveBeenCalledWith({
      status: STATUS_MSG.FAIL,
      message: "Missing Header authorization",
    }); // Check response message
  });
});
