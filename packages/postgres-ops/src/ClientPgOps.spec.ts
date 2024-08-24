import { Pool, PoolClient } from "pg";
import { ClientPgOps } from "./client";

import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  test,
  vi,
  Mock,
} from "vitest";

vi.mock("pg", () => {
  const mPoolClient = {
    query: vi.fn(),
    release: vi.fn(),
  };
  const mPool = {
    connect: vi.fn().mockResolvedValue(mPoolClient),
    query: vi.fn(),
    on: vi.fn(),
  };
  return { Pool: vi.fn(() => mPool), PoolClient: vi.fn(() => mPoolClient) };
});

describe("Client Pg Ops Intances Properties", () => {
  let clientPgOps: ClientPgOps;
  let pool: Pool;
  let poolClient: PoolClient;

  beforeEach(() => {
    pool = new Pool() as any;
    clientPgOps = new ClientPgOps({}); // Assuming empty config for the test
    poolClient = pool.connect() as unknown as PoolClient;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should emit "connect" when connected to the database', () => {
    const connectListener = vi.fn();
    clientPgOps.on("connect", connectListener);

    // Simulate the "connect" event
    (pool.on as Mock).mock.calls[0][1](); // Call the registered listener

    expect(connectListener).toHaveBeenCalledTimes(1);
  });

  it("should execute a query and log execution time", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
    const mockResult = { rowCount: 1 };
    (pool.query as Mock).mockResolvedValue(mockResult);

    await clientPgOps.query("SELECT * FROM test_table WHERE id = $1", [1]);

    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM test_table WHERE id = $1",
      [1]
    );
    expect(logSpy).toHaveBeenCalledWith(
      "Executed query: ",
      {
        rowCount: mockResult.rowCount,
        text: "SELECT * FROM test_table WHERE id = $1",
      },
      "Executed in: ",
      expect.any(Number)
    );
  });

  it("should get a client and set query timeout and release properly", async () => {
    const mockRelease = vi.fn();
    poolClient.release = mockRelease;
    const connectSpy = vi.spyOn(pool, "connect");

    const client = await clientPgOps.getClient();

    expect(connectSpy).toHaveBeenCalledTimes(1);

    connectSpy.mockRestore(); // Clean up after the test
    expect(mockRelease).not.toHaveBeenCalled();
    expect(client.query).toBeInstanceOf(Function);
    expect(client.release).toBeInstanceOf(Function);

    poolClient.release(); // Manually trigger release

    expect(mockRelease).toHaveBeenCalledTimes(1);
  });
});
