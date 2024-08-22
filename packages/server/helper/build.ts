import { copyPrismaClient } from "./copyClientFiles";

const build = async () => {
  await copyPrismaClient();
};

void build();
