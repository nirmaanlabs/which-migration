// @ts-ignore

import { describe, it, expect, vi, beforeEach } from "vitest";
import { isConnectedToDB } from "./isConnectedToDB"; // Adjust the path as needed
import { Response, NextFunction } from "express";
import { dbInstance } from "../../dbInstances";
import { PG_DB_MSG, STATUS_MSG } from "../constants";

describe("isConnectedToDB middleware", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Reset mocks before each test
  });

  it("should respond with success if connected to the database", async () => {
    const req = {
      headers: {
        "X-WHMG-ConnectionId": "mocked_connection_id",
      },
    } as any; // Adjust type as needed

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    const mockQuery = {
      query: vi.fn().mockResolvedValue({ rows: [{ id: 1, value: "test" }] }),
    }; // Mock the query method}

    const mockConnection = {
      db: mockQuery,
      token: "mock_token_value",
    };

    vi.spyOn(dbInstance, "getConnection").mockReturnValue(mockConnection);

    const next = vi.fn() as NextFunction;

    await isConnectedToDB(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: STATUS_MSG.SUCCESS,
      message: PG_DB_MSG.CONNECTED,
    });
    expect(mockConnection.db.query).toHaveBeenCalledWith("select 1");
  });

  it("should call next if there is no connection", async () => {
    const req = {
      headers: {
        "X-WHMG-ConnectionId": "mocked_connection_id",
      },
    } as any;

    const res = {} as Response;
    const next = vi.fn() as NextFunction;

    vi.spyOn(dbInstance, "getConnection").mockReturnValue(undefined); // Simulate no connection

    await isConnectedToDB(req, res, next);

    expect(next).toHaveBeenCalled(); // Ensure next is called
  });

  it("should call next with an error if an error occurs", async () => {
    const req = {
      headers: {
        "X-WHMG-ConnectionId": "mocked_connection_id",
      },
    } as any;

    const res = {} as Response;
    const next = vi.fn() as NextFunction;

    const mockError = new Error("Database error");

    vi.spyOn(dbInstance, "getConnection").mockReturnValue({
      db: {
        query: vi.fn().mockRejectedValue(mockError),
        // Simulate query error
      },
      token: "mock_token_value",
    });

    await isConnectedToDB(req, res, next);

    expect(next).toHaveBeenCalledWith(mockError); // Check that next was called with the error
  });
});
