import * as crypto from "crypto";

export const getRandomConnectionId = () => {
  return crypto.randomBytes(32).toString("hex");
};
