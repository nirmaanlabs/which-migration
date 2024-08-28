import { DatabaseError, Pool, PoolClient, PoolConfig } from "pg";
import { EventEmitter } from "stream";
import { PgDBError } from "./PgDBError";
import { PgError } from "./PgError";

interface CustomPoolClient extends PoolClient {
  lastQuery?: any[];
}

export class PgPool extends EventEmitter {
  #pool: Pool;

  constructor(config: PoolConfig) {
    super();
    this.#pool = new Pool(config);

    this.#pool.on("connect", () => {
      this.emit("connect");
    });
    this.#pool.on("error", () => {
      this.emit("error");
    });
  }

  // Is this type correct ?
  async query(text: string, params?: any[]) {
    try {
      const start = Date.now();
      const res = await this.#pool.query(text, params);
      const duration = Date.now() - start;
      console.log(
        "Executed query: ",
        { rowCount: res.rowCount, text },
        "Executed in: ",
        duration
      );
      return res;
    } catch (error) {
      console.log(error);
      if (error instanceof DatabaseError) {
        throw new PgDBError(error.message, error.code, error.name);
      } else if (error instanceof Error) {
        throw new PgError(error.message, 17, error.name);
      }
    }
  }

  async getClient() {
    try {
      const client: CustomPoolClient = await this.#pool.connect();
      const query = client.query.bind(client);
      const release = client.release.bind(client);
      // set a timeout of 5 seconds, after which we will log this client's last query
      const timeout = setTimeout(() => {
        console.error("A client has been checked out for more than 5 seconds!");
        console.error(
          `The last executed query on this client was: ${client.lastQuery}`
        );
      }, 5000);
      // monkey patch the query method to keep track of the last query executed
      client.query = (...args: any[]) => {
        client.lastQuery = args;
        // @ts-expect-error just ignore this
        return query(...args);
      };

      client.release = () => {
        // clear our timeout
        clearTimeout(timeout);
        // set the methods back to their old un-monkey-patched version
        client.query = query;
        client.release = release;
        return release();
      };
      return client;
    } catch (error) {
      console.log(error);
      if (error instanceof DatabaseError) {
        throw new PgDBError(error.message, error.code, error.name);
      } else if (error instanceof Error) {
        throw new PgError(error.message, 17, error.name);
      }
    }
  }
}
