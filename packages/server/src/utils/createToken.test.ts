import { describe, it, expect } from "vitest";
import jwt from "jsonwebtoken";
import { createToken } from "./createToken";

describe("createToken", () => {
  it("should create a valid JWT token with the given payload", () => {
    const payload = { userId: 1, username: "testuser" };
    const token = createToken(payload);

    // Verify the token
    const secretKey = "SECRET_KEY"; // Should match the one used in the function
    const decoded = jwt.verify(token, secretKey) as jwt.JwtPayload;

    // Check that the payload is correctly encoded in the token
    expect(decoded.userId).toBe(payload.userId);
    expect(decoded.username).toBe(payload.username);
  });

  it("should set token expiration time to 1 hour", () => {
    const payload = { userId: 1 };
    const token = createToken(payload);

    const secretKey = "SECRET_KEY";
    const decoded = jwt.verify(token, secretKey) as jwt.JwtPayload;

    // Check that the token expires in 1 hour
    const currentTime = Math.floor(Date.now() / 1000);
    const expirationTime = decoded.exp as number;
    expect(expirationTime).toBeGreaterThan(currentTime);
    expect(expirationTime).toBeLessThanOrEqual(currentTime + 3600); // Within 1 hour
  });
});
