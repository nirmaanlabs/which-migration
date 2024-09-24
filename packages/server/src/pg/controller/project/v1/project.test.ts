import { describe, it, expect, vi } from "vitest";
import { createProject } from "./project";
import { PG_DB_MSG, STATUS_MSG } from "@/pg/constants";
import { dbInstance } from "@/dbInstances";
import { DatabaseError } from "@which-migration/pgops";

// Mock the required modules and instances
vi.mock("@/dbInstances", () => ({
  dbInstance: {
    getConnection: vi.fn(),
  },
}));

describe("createProject", () => {
  it("should return success response when project is created", async () => {
    // Mock the request and response objects
    const req = {
      body: {
        connectionId: "valid-connection-id",
        projectName: "test_project",
      },
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    const next = vi.fn();

    // Mock the database connection and query response
    const db = {
      query: vi.fn().mockResolvedValue({
        rows: [{ id: "test-id", tag_name: "test_tag" }],
      }),
    };

    const mockGetConnection = {
      db, // This is the pgPool instance
      token: "mock_dbtoken",
    };

    vi.spyOn(dbInstance, "getConnection").mockReturnValue(mockGetConnection);

    // Call the createProject function
    await createProject(req as any, res as any, next);

    // Assert that the correct SQL query was executed
    expect(db.query).toHaveBeenCalledWith(
      expect.stringContaining("CREATE TABLE $1"),
      ["test_project_whmg_migrations"]
    );

    // Assert that the response was called with the correct status and data
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: STATUS_MSG.SUCCESS,
      data: [{ id: "test-id", tag_name: "test_tag" }],
    });
  });

  it("should return failure if connection is not found", async () => {
    // Mock the request and response objects
    const req = {
      body: {
        connectionId: "invalid-connection-id",
        projectName: "test_project",
      },
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    const next = vi.fn();

    vi.spyOn(dbInstance, "getConnection").mockReturnValue(undefined);

    // Call the createProject function
    await createProject(req as any, res as any, next);

    // Assert that the response was called with the failure status and message
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: STATUS_MSG.FAIL,
      message: PG_DB_MSG.FAILED_CONNECTION,
    });
  });

  it("should call next with error on failure", async () => {
    // Mock the request and response objects
    const req = {
      body: {
        connectionId: "valid-connection-id",
        projectName: "test_project",
      },
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    const next = vi.fn();

    // Mock the database connection and throw an error
    const db = {
      query: vi
        .fn()
        .mockRejectedValue(
          new DatabaseError("Database connection failed", 4, "error")
        ),
    };

    const mockGetConnection = {
      db, // This is the pgPool instance
      token: "mock_dbtoken",
    };

    vi.spyOn(dbInstance, "getConnection").mockReturnValue(mockGetConnection);

    // Call the createProject function
    await createProject(req as any, res as any, next);

    // Assert that next was called with the error
    expect(next).toHaveBeenCalledWith(
      new DatabaseError("Database connection failed", 4, "error")
    );
  });
});
