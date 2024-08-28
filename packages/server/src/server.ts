import ExpressConfig from "./app";

import express from "express";
import path from "path";
import cors from "cors";
import { Server } from "http";
import pc from "picocolors";
import { pgRouter } from "./pg/routes/connection/v1/pgRouter";
import { errorHandler } from "./utils/errorHandler";

class WHMGMainServer {
  port: number;
  app: express.Application;
  #server: Server | undefined;
  #pathToClientAppBuildFiles = path.resolve(
    __dirname,
    "../which-migration-client/dist"
  );

  constructor(port: number = 1337, app: express.Application) {
    this.port = port;
    this.app = app;
  }

  pgRoutesInit() {
    app.use("/api/v1/pg", pgRouter);
  }

  useErrorHandlerMiddlware() {
    app.use(errorHandler);
  }

  pingRoute() {
    app.use("/api/v1/ping", (_, res) => {
      res.json({ status: 200, msg: "Hello Welcome to WHMGServer!!" });
    });
  }

  preStartServer() {
    // Let front end talk with backend
    app.use(cors());
    app.use(express.static(this.#pathToClientAppBuildFiles));
    app.use(express.json({ limit: "10kb" }));
  }

  start(): void {
    this.preStartServer();
    this.pingRoute();
    this.pgRoutesInit();
    this.useErrorHandlerMiddlware();
    this.#server = app.listen(this.port, () =>
      console.log(
        pc.green(`-> Server Running on Port http://localhost:${this.port}`)
      )
    );
  }

  stop(): void {
    this.#server?.close((err) => {
      if (err) {
        console.log(pc.red(`-> Error Stoping Server`));
      } else {
        console.log(
          pc.yellow("Server http://localhost:1337 has been stopped !")
        );
      }
    });
  }
}

const app = ExpressConfig();
const server = new WHMGMainServer(1337, app);
// server.stop();
server.start();

// const pgClient = new ClientPg({
//   user: "postgres",
//   database: "DEV",
//   password: "postgres",
//   host: "localhost",
//   port: 5432,
// });

// pgClient.on("connect", () => {
//   console.log(pc.green("->Connected to DB"));
// });
// pgClient.on("error", () => {
//   console.log("Error connecting to DB");
// });

// pgClient.query("select * from ddl_log").then((res) => console.log(res.command));
// pgClient.query("select * from ddl_log").then((res) => console.log(res.command));
// pgClient.query("select * from ddl_log").then((res) => console.log(res.command));

// async function abc() {
//   const c = await pgClient.getClient();
//   const queryRes = await c.query("select * from ddl_log");
//   console.log({ rc: queryRes.rowCount });
//   c.release();
// }

// abc();
