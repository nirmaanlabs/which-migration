import { copySync } from "fs-extra";
import packlist from "npm-packlist";
import path from "path";

export async function copyPrismaClient() {
  // that's where we want to copy the local client for client
  const clientCopyPath = path.join(__dirname, "..", "which-migration-client");

  // we resolve where the client is located via our own dependencies
  const clientPath = path.dirname(
    require.resolve("@which-migration/client/package.json")
  );

  // @ts-ignore
  const clientFiles = await packlist({ path: clientPath });

  // we copy each file that we found in pkg to a new destination
  for (const file of clientFiles) {
    if (file.includes("wasm") === false) {
      const from = path.join(clientPath, file);
      const to = path.join(clientCopyPath, file);
      // @ts-ignore
      copySync(from, to, { overwrite: true, recursive: true });
    }
    console.log(file);
  }
}
