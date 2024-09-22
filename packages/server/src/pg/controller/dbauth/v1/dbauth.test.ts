import { describe, it, expect, vi, Mock, beforeEach } from "vitest";
import { connect, disconnect, selectOne } from "./dbauth";
import { Response, NextFunction } from "express";
import { PgPool } from "@which-migration/pgops";
import { dbInstance } from "../../../../dbInstances";
import { createToken } from "../../../../utils/createToken";
import { getRandomConnectionId } from "../../../../utils/getRandomConnectionId";
import { PG_DB_MSG, STATUS_MSG } from "../../../constants";

vi.mock("@which-migration/pgops", () => {
  return {
    PgPool: vi.fn().mockImplementation(() => ({
      query: vi.fn(),
    })),
  };
});

vi.mock("../../../../utils/createToken");
vi.mock("../../../../utils/getRandomConnectionId");

describe("connect function", () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  it("should connect to the database and return a token", async () => {
    const req = {
      body: {
        dbuser: "testuser",
        database: "testdb",
        dbpassword: "testpassword",
        host: "localhost",
        port: 5432,
      },
    } as any; // Adjust type as needed

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    const next = vi.fn() as NextFunction;

    const mockQuery = vi.fn().mockResolvedValue({ rows: [] });
    (PgPool as any).mockImplementation(() => ({
      query: mockQuery,
    }));

    const token = "mocked_token";
    (createToken as Mock).mockReturnValue(token);
    const connectionId = "mocked_connection_id";
    (getRandomConnectionId as Mock).mockReturnValue(connectionId);
    vi.spyOn(dbInstance, "setConnection").mockImplementation(vi.fn());

    await connect(req, res, next);

    expect(mockQuery).toHaveBeenCalledWith("select 1");
    expect(dbInstance.setConnection).toHaveBeenCalledWith(
      connectionId,
      expect.any(Object)
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: expect.any(String),
      message: expect.any(String),
      database: "testdb",
      dbuser: "testuser",
      connectionId,
      dbtoken: token,
    });
  });

  it("should pass error to next if connection fails", async () => {
    const req = {
      body: {
        dbuser: "testuser",
        database: "testdb",
        dbpassword: "testpassword",
        host: "localhost",
        port: 5432,
      },
    } as any;

    const res = {} as Response;
    const next = vi.fn() as NextFunction;

    (PgPool as any).mockImplementation(() => ({
      query: vi.fn().mockRejectedValue(new Error("Connection error")),
    }));

    await connect(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});

describe("selectOne function", () => {
  it("should return data from the database", async () => {
    const req = {
      headers: {
        "X-WHMG-ConnectionId": "mocked_connection_id",
      },
    } as any;

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    const mockDbPool = {
      query: vi.fn().mockResolvedValue({ rows: [{ id: 1, value: "test" }] }),
    };

    const mockGetConnection = {
      db: mockDbPool, // This is the pgPool instance
      token: "mock_dbtoken",
    };

    vi.spyOn(dbInstance, "getConnection").mockReturnValue(mockGetConnection);

    await selectOne(req, res);

    expect(mockGetConnection.db.query).toHaveBeenCalledWith("select 1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: expect.any(String),
      message: "selectOne",
      data: [{ id: 1, value: "test" }],
    });
  });

  it("should handle errors and return 500 status", async () => {
    const req = {
      headers: {
        "X-WHMG-ConnectionId": "mocked_connection_id",
      },
    } as any;

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    vi.spyOn(dbInstance, "getConnection").mockReturnValue({
      db: { query: vi.fn().mockRejectedValue(new Error("Query error")) },
      token: "mock_token_value",
    });

    await selectOne(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: "fail",
      message: "someerror",
    });
  });
});

describe("disconnect function", () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  it("should disconnect from the database and return success message", async () => {
    const req = {
      headers: {
        "X-WHMG-ConnectionId": "mocked_connection_id",
      },
    } as any; // Adjust type as needed

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    const next = vi.fn() as NextFunction;

    // Mock the removeConnection method
    vi.spyOn(dbInstance, "removeConnection").mockImplementation(vi.fn());

    await disconnect(req, res, next);

    expect(dbInstance.removeConnection).toHaveBeenCalledWith(
      "mocked_connection_id"
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: STATUS_MSG.SUCCESS,
      message: PG_DB_MSG.DISCONNECTED,
    });
  });

  it("should pass error to next if disconnect fails", async () => {
    const req = {
      headers: {
        "X-WHMG-ConnectionId": "mocked_connection_id",
      },
    } as any;

    const res = {} as Response;
    const next = vi.fn() as NextFunction;

    // Mock the removeConnection method to throw an error
    vi.spyOn(dbInstance, "removeConnection").mockImplementation(() => {
      throw new Error("Disconnect error");
    });

    await disconnect(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});
