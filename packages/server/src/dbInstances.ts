import { PgPool } from "@which-migration/pgops"; // Replace with actual PgPool import
class A {} // Placeholder class for A, replace with actual class

// Define types
type ConnectionID = string;
type ConnectionValue = {
  db: PgPool | A;
  token: string;
};

class DBInstance {
  // Private static instance for singleton pattern
  private static instance: DBInstance;

  // Internal storage for DB instances
  private dbConnections: Map<ConnectionID, ConnectionValue> = new Map();

  // Private constructor to prevent direct instantiation
  private constructor() {}

  // Method to get the singleton instance of DBInstance
  public static getInstance(): DBInstance {
    if (!DBInstance.instance) {
      DBInstance.instance = new DBInstance();
    }
    return DBInstance.instance;
  }

  // Method to set a new DB connection
  public setConnection(key: ConnectionID, connection: ConnectionValue): void {
    this.dbConnections.set(key, connection);
  }

  // Method to get a DB connection by key
  public getConnection(key: ConnectionID): ConnectionValue | undefined {
    return this.dbConnections.get(key);
  }

  // Method to remove a DB connection by key
  public removeConnection(key: ConnectionID): boolean {
    return this.dbConnections.delete(key);
  }

  // Optional: Method to get all connections (for debugging or monitoring purposes)
  public getAllConnections(): Map<ConnectionID, ConnectionValue> {
    return this.dbConnections;
  }
}

// Example usage of the singleton class
export const dbInstance = DBInstance.getInstance();
