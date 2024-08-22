import ExpressConfig from "./app";

import express from "express";
import path from "path";
import cors from "cors";
import { Server } from "http";
import pc from "picocolors";

const app = ExpressConfig();

export class WHServer {
  port: number;
  #server: Server | undefined;
  #pathToClientAppBuildFiles = path.resolve(
    __dirname,
    "../which-migration-client/dist"
  );

  constructor(port: number = 1337) {
    this.port = port;
  }

  pingRoute() {
    app.use("/api/v1/ping", (_, res) => {
      res.json({ status: 200, msg: "Hello Welcome to WHServer!!" });
    });
  }

  preStartServer() {
    // Let front end talk with backend
    app.use(cors());
    app.use(express.static(this.#pathToClientAppBuildFiles));
  }

  start(): void {
    this.preStartServer();
    this.pingRoute();
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
