export type TConnectParam = {
  dbuser: string;
  database: string;
  dbpassword: string;
  host: string;
  port: number;
};

export type TConnectSuccessResponse = {
  status: string;
  message: string;
  database: string;
  dbuser: string;
  dbtoken: string;
  connectionId: string;
};

export type ConnectionIDValue = {
  db: string;
  dbtoken: string;
};
export type ConnectionID = string;
export type DBServers = {
  [x: ConnectionID]: ConnectionIDValue;
};

export type TAuthState = {
  isConnected: boolean;
  dbInstances: DBServers;
  currentConnectionID: ConnectionID;
};
export type TAuthActionType =
  | "DB_CONNECT_SUCCESS"
  | "DB_CONNECT_FAIL"
  | "DB_CONNECT_DISCONNECT";
type AuthActionDBConnectSuccess = Pick<
  TConnectSuccessResponse,
  "connectionId" | "database" | "dbtoken"
> & { type: "DB_CONNECT_SUCCESS" };

type AuthActionDBConnectFail = { type: "DB_CONNECT_FAIL" };
type AuthActionDBDisconnect = Pick<TConnectSuccessResponse, "connectionId"> & {
  type: "DB_CONNECT_DISCONNECT";
};

export type TAuthAction =
  | AuthActionDBConnectSuccess
  | AuthActionDBConnectFail
  | AuthActionDBDisconnect;

export type TConnectReturn = Promise<TConnectSuccessResponse>;

export type TConnectFunc = (params: TConnectParam) => TConnectReturn;
