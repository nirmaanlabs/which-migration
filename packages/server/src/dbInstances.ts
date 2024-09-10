import { PgPool } from "@which-migration/pgops";
class A {}

interface DBMap {
  pg: PgPool;
  mysql: A;
}

export type DbKey = keyof DBMap;
export type DbValues = DBMap[keyof DBMap];

export const DBInstances = new Map<DbKey, DbValues>();

function setConnection(key: DbKey, connection: DbValues) {
  DBInstances.set(key, connection);
}

function getConnection(key: DbKey) {
  return DBInstances.get(key);
}

function removeConnection(key: DbKey) {
  DBInstances.delete(key);
}

export { setConnection, getConnection, removeConnection };
