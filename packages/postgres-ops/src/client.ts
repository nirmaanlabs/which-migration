import { Client, Pool, PoolClient, PoolConfig } from "pg";
import { EventEmitter } from "stream";

const pool = new Pool();

interface CustomPoolClient extends PoolClient {
  lastQuery?: any[];
}

export class ClientPgOps extends EventEmitter {
  #pool: Pool;

  constructor(config: PoolConfig) {
    super();
    this.#pool = new Pool(config);

    this.#pool.on("connect", () => {
      console.log("----a,");
      this.emit("connect");
    });
    this.#pool.on("error", () => {
      this.emit("error");
    });
  }

  // Is this type correct ?
  async query(text: string, params?: any[]) {
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
  }

  async getClient() {
    console.log("calling connect");
    const client: CustomPoolClient = await pool.connect();
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
  }
}
